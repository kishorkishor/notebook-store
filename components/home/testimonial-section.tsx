"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const testimonials = [
  {
    name: "Sarah Rahman",
    role: "Graphic Designer",
    content: "The quality of these notebooks is exceptional. The paper is thick with no bleeding, and the binding is so sturdy. Perfect for my design sketches and client notes!",
    avatar: "/images/testimonials/avatar1.jpg"
  },
  {
    name: "Mohammed Hasan",
    role: "Writer",
    content: "I've tried many journals but Kishor's notebooks are truly special. The traditional Bangladeshi designs coupled with the premium paper quality makes writing a joy.",
    avatar: "/images/testimonials/avatar2.jpg"
  },
  {
    name: "Tania Ahmed",
    role: "Student",
    content: "These dot grid notebooks are perfect for my university notes and bullet journaling. The paper quality is amazing and the price is reasonable for students like me.",
    avatar: "/images/testimonials/avatar3.jpg"
  }
]

export default function TestimonialSection() {
  const [current, setCurrent] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">What Our Customers Say</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Hear from our satisfied customers.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div
            key={current}
            className="bg-background rounded-xl p-8 text-center border shadow-sm transition-opacity duration-300"
          >
            <div className="mx-auto w-16 h-16 relative mb-4">
              <Image
                src={testimonials[current].avatar}
                alt={testimonials[current].name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <p className="text-lg italic mb-6">"{testimonials[current].content}"</p>
            <div>
              <p className="font-medium">{testimonials[current].name}</p>
              <p className="text-sm text-muted-foreground">{testimonials[current].role}</p>
            </div>
          </div>
          
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button 
                key={index} 
                className={`w-2.5 h-2.5 rounded-full ${index === current ? 'bg-primary' : 'bg-primary/30'}`}
                onClick={() => setCurrent(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
