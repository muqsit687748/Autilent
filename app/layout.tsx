import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AUTILENT - City Dashboard Portal',
  description: 'City analytics and insights portal for stakeholders',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 