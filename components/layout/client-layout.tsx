"use client"

import { useEffect, useState } from 'react'
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
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div className="relative flex min-h-screen flex-col">
          {/* Animated Background */}
          <div className="fixed inset-0 -z-10 bg-white dark:bg-[#050505] overflow-hidden">
            {/* Dark mode animated elements */}
            <div className="absolute inset-0 opacity-0 dark:opacity-100">
              {/* Nebula effect - multiple overlapping gradients */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(76,29,149,0.1)_0%,rgba(0,0,0,0)_60%)] animate-pulse-slower"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(30,64,175,0.1)_0%,rgba(0,0,0,0)_50%)] animate-pulse-slow animation-delay-2000"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,rgba(79,70,229,0.1)_0%,rgba(0,0,0,0)_60%)] animate-pulse-slow animation-delay-1000"></div>
              
              {/* Digital circuit lines */}
              <div className="absolute inset-0 circuit-background opacity-[0.07]"></div>
              
              {/* Glowing orbs that move around */}
              <div className="absolute h-40 w-40 rounded-full bg-indigo-900/10 blur-3xl left-1/4 top-1/4 animate-float-slow"></div>
              <div className="absolute h-32 w-32 rounded-full bg-blue-900/10 blur-3xl right-1/4 bottom-1/3 animate-float-slow animation-delay-2000"></div>
              <div className="absolute h-36 w-36 rounded-full bg-violet-900/10 blur-3xl left-1/3 bottom-1/4 animate-float-slow animation-delay-4000"></div>
              
              {/* Particle system */}
              <div className="particle-container">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div 
                    key={i}
                    className="particle" 
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      width: `${Math.random() * 2 + 1}px`,
                      height: `${Math.random() * 2 + 1}px`,
                      opacity: Math.random() * 0.5 + 0.3,
                      animationDelay: `${Math.random() * 15}s`,
                      animationDuration: `${Math.random() * 30 + 20}s`
                    }}
                  ></div>
                ))}
              </div>
            </div>
            
            {/* Light mode subtle background */}
            <div className="absolute inset-0 dark:opacity-0">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-white to-indigo-50"></div>
              <div className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 50% 50%, #f5f5f5 1px, transparent 1px)
                  `,
                  backgroundSize: '30px 30px'
                }}>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 transition-all duration-300 ease-in-out">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </div>
      </ThemeProvider>
    </AuthProvider>
  )
}
