import HeroBanner from "@/components/home/hero-banner"
import FeaturedProducts from "@/components/home/featured-products"
import { products } from "@/lib/data"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, CheckCircle2, Package, Truck } from "lucide-react"

export default function Home() {
  return (
    <div>
      <HeroBanner />
      <FeaturedProducts products={products} />
      
      {/* Features Section */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Why Choose Our Notebooks?</h2>
            <p className="mt-4 text-muted-foreground max-w-[700px]">
              Handcrafted with pride in Dhaka, Bangladesh. We focus on quality materials and thoughtful designs.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Premium Materials</h3>
              <p className="text-muted-foreground">
                High-quality paper that prevents bleed-through and ensures smooth writing.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Tested Quality</h3>
              <p className="text-muted-foreground">
                Each notebook passes our rigorous quality control process.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Locally Made</h3>
              <p className="text-muted-foreground">
                Supporting local artisans and using materials sourced from Bangladesh.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground">
                Quick shipping and secure packaging to ensure your notebooks arrive safely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="bg-primary rounded-lg py-12 px-6 md:py-16 md:px-12 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">Ready to Start Your Journey?</h2>
            <p className="mt-4 text-primary-foreground/90 max-w-[600px]">
              Explore our collection of premium notebooks crafted by Kishor Tarafder in Dhaka, Bangladesh.
            </p>
            <Button size="lg" variant="secondary" className="mt-8" asChild>
              <Link href="/products">Browse Collection</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
