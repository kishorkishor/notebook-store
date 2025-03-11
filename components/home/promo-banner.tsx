"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export default function PromoBanner() {
  const [currentBanner, setCurrentBanner] = useState(0)
  
  const collections = [
    {
      name: "Premium Leather Collection",
      description: "Handcrafted genuine leather notebooks that age beautifully with time",
      link: "/products?category=premium",
      color: "bg-amber-100 dark:bg-amber-900/20"
    },
    {
      name: "Traditional Bangladeshi Series",
      description: "Authentic designs featuring local materials and artisanal craftsmanship",
      link: "/products?category=traditional",
      color: "bg-green-100 dark:bg-green-900/20"
    },
    {
      name: "Dot Grid Journals",
      description: "Perfect for bullet journaling and creative planning",
      link: "/products?category=dot-grid",
      color: "bg-blue-100 dark:bg-blue-900/20"
    }
  ]
  
  const current = collections[currentBanner]

  return (
    <section className="py-12">
      <div className="container px-4">
        <motion.div 
          className={`rounded-2xl ${current.color} p-8 md:p-12 relative overflow-hidden animate-fade-in`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between">
            <div className="max-w-lg">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{current.name}</h2>
              <p className="text-muted-foreground mb-6">{current.description}</p>
              <Button asChild>
                <Link href={current.link} className="inline-flex items-center gap-2">
                  Explore Collection <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="hidden md:flex space-x-2 self-end">
              {collections.map((_, index) => (
                <button 
                  key={index} 
                  className={`w-3 h-3 rounded-full ${index === currentBanner ? 'bg-primary' : 'bg-primary/30'}`}
                  onClick={() => setCurrentBanner(index)}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
