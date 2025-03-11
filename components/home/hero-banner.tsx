"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, BookOpen, Pencil, Star } from "lucide-react"
import { motion } from 'framer-motion'
import { useTheme } from "next-themes"

export default function HeroBanner() {
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const bannerRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme, resolvedTheme } = useTheme()
  const isDarkTheme = theme === 'dark' || resolvedTheme === 'dark'
  
  // For the animated notebook canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const { width, height } = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
      return { width, height }
    }
    
    let { width, height } = setCanvasDimensions()
    
    // Notebook settings
    const notebookWidth = 280
    const notebookHeight = 360
    
    // Create notebooks
    const notebooks = [
      {
        x: width / 2,
        y: height / 2,
        width: notebookWidth,
        height: notebookHeight,
        color: isDarkTheme ? '#1e1e1e' : '#f8f8f8',
        borderColor: isDarkTheme ? '#333' : '#ddd',
        shadow: isDarkTheme ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.2)',
        rotation: -5 * Math.PI / 180
      },
      {
        x: width / 2 + 40,
        y: height / 2 - 20,
        width: notebookWidth - 40,
        height: notebookHeight - 40,
        color: isDarkTheme ? '#252525' : '#ffffff',
        borderColor: isDarkTheme ? '#444' : '#e5e5e5',
        shadow: isDarkTheme ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.15)',
        rotation: 5 * Math.PI / 180
      },
      {
        x: width / 2 - 60,
        y: height / 2 + 30,
        width: notebookWidth - 60,
        height: notebookHeight - 60,
        color: isDarkTheme ? '#222222' : '#f0f0f0',
        borderColor: isDarkTheme ? '#363636' : '#e0e0e0',
        shadow: isDarkTheme ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)',
        rotation: 2 * Math.PI / 180
      }
    ]
    
    // Decorative items
    const items = [
      { 
        type: 'pencil', 
        x: width / 2 + 140, 
        y: height / 2 - 20, 
        rotation: 45, 
        size: 120,
        color: isDarkTheme ? '#333' : '#555' 
      },
      { 
        type: 'star', 
        x: width / 2 - 120, 
        y: height / 2 - 130, 
        rotation: 15, 
        size: 30,
        color: isDarkTheme ? 'rgba(255, 215, 0, 0.7)' : 'rgba(255, 180, 0, 0.9)'
      },
      { 
        type: 'pencil', 
        x: width / 2 + 100, 
        y: height / 2 + 120, 
        rotation: -15, 
        size: 100,
        color: isDarkTheme ? '#444' : '#666' 
      }
    ]
    
    // Animation variables
    let animationFrame: number
    let time = 0
    
    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      
      // Calculate mouse influence (normalized to canvas)
      const mouseInfluenceX = (mousePosition.x / window.innerWidth * width - width / 2) * 0.02
      const mouseInfluenceY = (mousePosition.y / window.innerHeight * height - height / 2) * 0.02
      
      // Draw notebooks
      notebooks.forEach((notebook, i) => {
        ctx.save()
        
        // Apply very subtle mouse influence - much more subtle than before
        const offsetX = mouseInfluenceX * (1 - i * 0.3)
        const offsetY = mouseInfluenceY * (1 - i * 0.3)
        
        // Add a very gentle floating motion - no harsh movements
        const floatOffsetY = Math.sin(time / 3000 + i) * 2
        
        ctx.translate(
          notebook.x + offsetX, 
          notebook.y + offsetY + floatOffsetY
        )
        ctx.rotate(notebook.rotation)
        
        // Shadow
        ctx.shadowColor = notebook.shadow
        ctx.shadowBlur = 10
        ctx.shadowOffsetX = 5
        ctx.shadowOffsetY = 5
        
        // Notebook
        ctx.fillStyle = notebook.color
        ctx.fillRect(
          -notebook.width / 2, 
          -notebook.height / 2, 
          notebook.width, 
          notebook.height
        )
        
        // Border
        ctx.shadowColor = 'transparent'
        ctx.strokeStyle = notebook.borderColor
        ctx.lineWidth = 1
        ctx.strokeRect(
          -notebook.width / 2, 
          -notebook.height / 2, 
          notebook.width, 
          notebook.height
        )
        
        // Lines on the notebooks
        if (i === 0) {
          ctx.strokeStyle = isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
          ctx.lineWidth = 1
          
          for (let j = 0; j < 12; j++) {
            const y = -notebook.height / 2 + 40 + j * 24
            ctx.beginPath()
            ctx.moveTo(-notebook.width / 2 + 20, y)
            ctx.lineTo(notebook.width / 2 - 20, y)
            ctx.stroke()
          }
          
          // Binding
          ctx.fillStyle = isDarkTheme ? '#444' : '#ddd'
          ctx.fillRect(
            -notebook.width / 2 - 8, 
            -notebook.height / 2, 
            8, 
            notebook.height
          )
          
          // Binding details
          const bindingColor = isDarkTheme ? 
            ['#555', '#666', '#777'] : 
            ['#ccc', '#bbb', '#aaa']
          
          for (let j = 0; j < 12; j++) {
            const y = -notebook.height / 2 + 20 + j * 30
            ctx.fillStyle = bindingColor[j % 3]
            ctx.fillRect(
              -notebook.width / 2 - 8, 
              y, 
              8, 
              10
            )
          }
        }
        
        ctx.restore()
      })
      
      // Draw items with subtle movements
      items.forEach((item, i) => {
        // Apply very gentle mouse movement to items
        const mouseEffect = 0.01
        const itemOffsetX = mouseInfluenceX * mouseEffect * 10
        const itemOffsetY = mouseInfluenceY * mouseEffect * 10
        
        ctx.save()
        ctx.translate(
          item.x + Math.sin(time / 4000 + i) * 5 + itemOffsetX, 
          item.y + Math.cos(time / 3500 + i) * 4 + itemOffsetY
        )
        ctx.rotate(
          item.rotation * Math.PI / 180 + 
          Math.sin(time / 5000) * 0.05
        )
        
        // Draw different items
        if (item.type === 'pencil') {
          drawPencil(ctx, 0, 0, item.size, item.color)
        } else if (item.type === 'star') {
          drawStar(ctx, 0, 0, item.size, item.color, Math.sin(time / 2000 + i) * 0.1 + 0.8)
        }
        
        ctx.restore()
      })
      
      time += 16.7 // Approximately 60fps
      animationFrame = requestAnimationFrame(draw)
    }
    
    const drawPencil = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
      const width = size / 8
      
      // Pencil body
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.rect(x - width / 2, y - size / 2, width, size * 0.8)
      ctx.fill()
      
      // Pencil tip
      ctx.fillStyle = isDarkTheme ? '#f97316' : '#ea580c'
      ctx.beginPath()
      ctx.moveTo(x - width / 2, y + size * 0.3)
      ctx.lineTo(x + width / 2, y + size * 0.3)
      ctx.lineTo(x, y + size / 2)
      ctx.closePath()
      ctx.fill()
      
      // Eraser
      ctx.fillStyle = isDarkTheme ? '#f43f5e' : '#e11d48'
      ctx.beginPath()
      ctx.rect(x - width / 2 - 1, y - size / 2, width + 2, size * 0.1)
      ctx.fill()
      
      // Glint effect
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
      ctx.beginPath()
      ctx.rect(x - width / 2 + 1, y - size / 2 + size * 0.1, 1, size * 0.7)
      ctx.fill()
    }
    
    const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, opacity: number) => {
      ctx.fillStyle = color
      ctx.globalAlpha = opacity
      ctx.beginPath()
      
      const spikes = 5
      const outerRadius = size / 2
      const innerRadius = outerRadius / 2.5
      
      for (let i = 0; i < spikes * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius
        const angle = (Math.PI / spikes) * i
        ctx.lineTo(
          x + Math.cos(angle) * radius, 
          y + Math.sin(angle) * radius
        )
      }
      
      ctx.closePath()
      ctx.fill()
      ctx.globalAlpha = 1
      
      // Add subtle glow effect
      ctx.shadowColor = isDarkTheme ? 'rgba(255, 215, 0, 0.5)' : 'rgba(255, 180, 0, 0.3)'
      ctx.shadowBlur = 8
    }
    
    const handleResize = () => {
      ({ width, height } = setCanvasDimensions())
    }
    
    window.addEventListener('resize', handleResize)
    animationFrame = requestAnimationFrame(draw)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrame)
    }
  }, [mousePosition, theme, resolvedTheme])
  
  // For the parallax scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      if (!bannerRef.current) return
      setScrollY(window.scrollY)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // For mouse movement tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  
  return (
    <section 
      ref={bannerRef}
      className="relative py-16 md:py-28 overflow-hidden"
    >
      {/* Theme-aware animated background */}
      <div className="absolute inset-0">
        {/* Dark theme background */}
        <div className={`absolute inset-0 bg-black transition-opacity duration-500 ${isDarkTheme ? 'opacity-100' : 'opacity-0'}`}>
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-grid-pattern-dark opacity-20"></div>
          
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-slate-900"></div>
          
          {/* Animated dots */}
          <div className="absolute inset-0">
            {Array.from({ length: 30 }).map((_, i) => (
              <div 
                key={`dark-particle-${i}`}
                className="absolute rounded-full animate-float-slow" 
                style={{
                  width: `${Math.random() * 4 + 1}px`,
                  height: `${Math.random() * 4 + 1}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  animationDuration: `${Math.random() * 15 + 10}s`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              ></div>
            ))}
          </div>
          
          {/* Pulsing gradient orbs */}
          <div 
            className="absolute top-1/4 right-1/3 w-64 h-64 bg-blue-900/10 rounded-full blur-3xl animate-pulse-slower"
            style={{ animationDuration: '10s' }}
          ></div>
          <div 
            className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-indigo-900/10 rounded-full blur-3xl animate-pulse-slow animation-delay-1000"
            style={{ animationDuration: '15s' }}
          ></div>
          <div 
            className="absolute top-2/3 right-1/4 w-56 h-56 bg-purple-900/10 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"
            style={{ animationDuration: '12s' }}
          ></div>
        </div>
        
        {/* Light theme background */}
        <div className={`absolute inset-0 bg-white transition-opacity duration-500 ${isDarkTheme ? 'opacity-0' : 'opacity-100'}`}>
          {/* Light grid pattern */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50"></div>
          
          {/* Animated dots */}
          <div className="absolute inset-0">
            {Array.from({ length: 30 }).map((_, i) => (
              <div 
                key={`light-particle-${i}`}
                className="absolute rounded-full animate-float-slow" 
                style={{
                  width: `${Math.random() * 4 + 1}px`,
                  height: `${Math.random() * 4 + 1}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  animationDuration: `${Math.random() * 15 + 10}s`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              ></div>
            ))}
          </div>
          
          {/* Subtle gradient orbs */}
          <div 
            className="absolute top-1/4 right-1/3 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl animate-pulse-slower"
            style={{ animationDuration: '10s' }}
          ></div>
          <div 
            className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl animate-pulse-slow animation-delay-1000"
            style={{ animationDuration: '15s' }}
          ></div>
          <div 
            className="absolute top-2/3 right-1/4 w-56 h-56 bg-purple-200/20 rounded-full blur-3xl animate-pulse-slow animation-delay-2000"
            style={{ animationDuration: '12s' }}
          ></div>
        </div>
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <motion.div 
              className="inline-flex items-center gap-2 rounded-full bg-white/5 dark:bg-white/5 backdrop-blur-sm px-4 py-2 text-sm font-medium text-gray-800 dark:text-white border border-gray-200 dark:border-white/10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles className="h-4 w-4 text-yellow-500 dark:text-yellow-300" />
              <span>New Premium Collection</span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-gray-900 dark:text-white drop-shadow-md"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="block">Capture Your</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-purple-300 dark:to-indigo-300">
                Ideas in Style
              </span>
            </motion.h1>
            
            <motion.p 
              className="max-w-[600px] text-gray-600 dark:text-gray-300 md:text-xl opacity-90"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Premium handcrafted notebooks from Bangladesh. Designed for creators, thinkers, and dreamers.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button 
                size="lg" 
                className="group bg-blue-600 dark:bg-white text-white dark:text-black hover:bg-blue-700 dark:hover:bg-gray-100 shadow-lg" 
                asChild
              >
                <Link href="/products" className="flex items-center gap-2">
                  Shop Now 
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-gray-800 dark:text-white border-gray-300 dark:border-white/20 hover:bg-gray-100 dark:hover:bg-white/10" 
                asChild
              >
                <Link href="/about">Our Story</Link>
              </Button>
            </motion.div>
          </div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div 
              className="relative h-[400px] md:h-[500px] w-full rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-white/10 backdrop-blur-sm"
            >
              {/* Theme-aware background for canvas container */}
              <div className="absolute inset-0 bg-gray-100/50 dark:bg-gray-900/50 backdrop-blur-sm"></div>
              
              {/* Canvas for animated notebooks */}
              <canvas 
                ref={canvasRef} 
                className="absolute inset-0 w-full h-full"
              ></canvas>
              
              {/* Theme-aware decorative elements */}
              <div className="absolute inset-0 bg-grid-pattern dark:bg-grid-pattern-dark opacity-5 dark:opacity-10"></div>
            </div>
            
            {/* Theme-aware decorative elements */}
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-blue-100 dark:bg-indigo-900/20 rounded-xl blur-sm"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-indigo-100 dark:bg-purple-900/20 rounded-full blur-sm"></div>
          </motion.div>
        </div>
      </div>
      
      {/* Theme-aware bottom wave design */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-white/5 dark:bg-white/5 backdrop-blur-sm" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 75% 50%, 50% 0, 25% 50%, 0 0)' }}></div>
    </section>
  )
}
