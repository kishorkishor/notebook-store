"use client"

import { ThemeProvider } from '@/components/theme-provider'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/footer' // Ensure this matches the actual filename case
import { Toaster } from '@/components/ui/toaster'
import AuthProvider from '@/components/auth-provider'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  )
}
