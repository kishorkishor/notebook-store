"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function CheckoutBackground() {
  const { resolvedTheme } = useTheme();
  const isDarkTheme = resolvedTheme === 'dark';
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="absolute inset-0 bg-black/40 z-0" />
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Stars container */}
      <div className="stars-container absolute inset-0">
        {[...Array(100)].map((_, index) => {
          const size = Math.random() * 2 + 1;
          const animationDuration = Math.random() * 50 + 50;
          const left = `${Math.random() * 100}%`;
          const top = `${Math.random() * 100}%`;
          const animationDelay = `${Math.random() * 50}s`;
          
          return (
            <div
              key={index}
              className={`absolute rounded-full ${
                isDarkTheme ? 'bg-white' : 'bg-gray-800'
              }`}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left,
                top,
                opacity: isDarkTheme ? 0.7 : 0.5,
                boxShadow: isDarkTheme 
                  ? `0 0 ${size * 2}px ${size / 2}px rgba(255, 255, 255, 0.3)` 
                  : `0 0 ${size * 2}px ${size / 2}px rgba(0, 0, 0, 0.1)`,
                animation: `twinkle ${animationDuration}s infinite linear`,
                animationDelay,
              }}
            />
          );
        })}
      </div>
      
      {/* Pulsing gradient orbs */}
      <div 
        className="absolute w-[800px] h-[800px] rounded-full blur-3xl opacity-30"
        style={{
          background: isDarkTheme 
            ? 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 70%)' 
            : 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0) 70%)',
          top: '10%',
          right: '5%',
          animation: 'pulse 15s infinite alternate ease-in-out',
        }}
      />
      
      <div 
        className="absolute w-[600px] h-[600px] rounded-full blur-3xl opacity-20"
        style={{
          background: isDarkTheme 
            ? 'radial-gradient(circle, rgba(124, 58, 237, 0.3) 0%, rgba(124, 58, 237, 0) 70%)' 
            : 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, rgba(124, 58, 237, 0) 70%)',
          bottom: '5%',
          left: '15%',
          animation: 'pulse 20s infinite alternate-reverse ease-in-out',
        }}
      />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 bg-grid-pattern opacity-5"
        style={{
          backgroundSize: '30px 30px',
          backgroundImage: isDarkTheme 
            ? 'linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)'
            : 'linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)',
        }}
      />
      
      {/* Background overlay */}
      <div 
        className="absolute inset-0" 
        style={{
          background: isDarkTheme 
            ? 'radial-gradient(circle at center, rgba(2, 6, 23, 0.8) 0%, rgba(2, 6, 23, 0.95) 100%)' 
            : 'radial-gradient(circle at center, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.98) 100%)',
        }}
      />
    </div>
  );
} 