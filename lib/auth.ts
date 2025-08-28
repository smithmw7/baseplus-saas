import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import EmailProvider from 'next-auth/providers/email'
import { prisma } from '@/lib/prisma'
import { compare, hash } from 'bcryptjs'
import { resend } from '@/lib/email'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // Email/Password provider
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user || !user.password) {
          return null
        }

        const isValidPassword = await compare(credentials.password, user.password)

        if (!isValidPassword) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        }
      }
    }),
    // Magic link email provider
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        try {
          await resend.emails.send({
            from: provider.from!,
            to: identifier,
            subject: 'Sign in to BasePlus',
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                <h1 style="color: #333;">Sign in to BasePlus</h1>
                <p>Click the link below to sign in to your account:</p>
                <a href="${url}" style="display: inline-block; background: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 16px 0;">
                  Sign in to BasePlus
                </a>
                <p style="color: #666; font-size: 14px;">
                  If you didn't request this email, you can safely ignore it.
                </p>
              </div>
            `,
          })
        } catch (error) {
          console.error('Failed to send verification email:', error)
          throw new Error('Failed to send verification email')
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
    verifyRequest: '/auth/verify-request',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  events: {
    async createUser({ user }) {
      // Send welcome email
      try {
        await resend.emails.send({
          from: process.env.EMAIL_FROM!,
          to: user.email!,
          subject: 'Welcome to BasePlus!',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #333;">Welcome to BasePlus! 🎉</h1>
              <p>Hi ${user.name || 'there'},</p>
              <p>Welcome to BasePlus! Your account has been successfully created.</p>
              <p>You can now:</p>
              <ul>
                <li>Access your dashboard</li>
                <li>Manage your subscription</li>
                <li>Invite team members</li>
                <li>View analytics</li>
              </ul>
              <a href="${process.env.NEXTAUTH_URL}/dashboard" style="display: inline-block; background: #0070f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 16px 0;">
                Go to Dashboard
              </a>
              <p style="color: #666; font-size: 14px;">
                If you have any questions, feel free to reach out to our support team.
              </p>
            </div>
          `,
        })
      } catch (error) {
        console.error('Failed to send welcome email:', error)
      }
    },
  },
}
