"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function HeroBanner() {
  return (
    <section className="relative bg-gradient-to-b from-muted to-background py-16 md:py-24 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              New Collection Available
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Capture Your Ideas in Style
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Premium handcrafted notebooks from Bangladesh. Designed for creators, thinkers, and dreamers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group" asChild>
                <Link href="/products" className="flex items-center gap-2">
                  Shop Now 
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/about">Our Story</Link>
              </Button>
            </div>
          </div>
          
          <div className="relative animate-fade-in delay-200">
            <div className="relative h-[400px] md:h-[500px] w-full rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="/images/hero/hero-banner.jpg"
                alt="Premium notebooks and journals"
                priority
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-background/60 via-transparent to-transparent" />
            </div>
            
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-primary/10 rounded-xl animate-pulse"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-secondary/20 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
