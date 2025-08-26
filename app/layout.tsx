import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BasePlus - Modern SaaS Platform',
  description: 'A modern, scalable SaaS platform built for solo developers',
  keywords: ['SaaS', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  authors: [{ name: 'BasePlus Team' }],
  creator: 'BasePlus',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://baseplus.com',
    title: 'BasePlus - Modern SaaS Platform',
    description: 'A modern, scalable SaaS platform built for solo developers',
    siteName: 'BasePlus',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BasePlus - Modern SaaS Platform',
    description: 'A modern, scalable SaaS platform built for solo developers',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
