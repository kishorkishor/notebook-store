import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function HeroBanner() {
  return (
    <section className="relative bg-muted py-12">
      <div className="container px-4 md:px-6 flex flex-col md:flex-row items-center gap-6 md:gap-12">
        <div className="flex-1 space-y-4">
          <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">
            New Collection Available
          </div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Premium Notebooks for Your Journey
          </h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            Capture your thoughts in style with our carefully crafted notebooks. 
            Perfect for journaling, sketching, planning, and creating.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" asChild>
              <Link href="/products">Shop Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="relative h-[350px] md:h-[450px] w-full max-w-[500px] overflow-hidden rounded-lg">
            <Image
              src="/images/hero/hero-banner.jpg"
              alt="Premium notebooks and journals"
              priority
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-background/60 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
