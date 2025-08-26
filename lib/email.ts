import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  throw new Error('Missing RESEND_API_KEY')
}

export const resend = new Resend(process.env.RESEND_API_KEY)

export interface EmailTemplate {
  to: string
  subject: string
  html: string
  from?: string
}

export const emailService = {
  async sendEmail(template: EmailTemplate) {
    try {
      const result = await resend.emails.send({
        from: template.from || 'BasePlus <noreply@baseplus.com>',
        to: template.to,
        subject: template.subject,
        html: template.html,
      })
      return { success: true, data: result }
    } catch (error) {
      console.error('Email send error:', error)
      return { success: false, error }
    }
  },

  async sendWelcomeEmail(email: string, name: string) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>Welcome to BasePlus, ${name}!</h1>
        <p>Thank you for joining our platform. We're excited to have you on board.</p>
        <p>If you have any questions, feel free to reach out to our support team.</p>
        <br>
        <p>Best regards,<br>The BasePlus Team</p>
      </div>
    `
    
    return this.sendEmail({
      to: email,
      subject: 'Welcome to BasePlus!',
      html,
    })
  },

  async sendPasswordResetEmail(email: string, resetToken: string) {
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>Password Reset Request</h1>
        <p>You requested a password reset for your BasePlus account.</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 4px;">Reset Password</a>
        <p>If you didn't request this, please ignore this email.</p>
        <p>This link will expire in 1 hour.</p>
      </div>
    `
    
    return this.sendEmail({
      to: email,
      subject: 'Reset Your BasePlus Password',
      html,
    })
  },
}
