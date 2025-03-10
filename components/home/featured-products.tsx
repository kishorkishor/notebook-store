"use client"

import { useState } from "react"
import ProductCard from "@/components/products/product-card"
import { Button } from "@/components/ui/button"
import { Product } from "@/types"
import { categories } from "@/lib/data"

interface FeaturedProductsProps {
  products: Product[]
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredProducts = activeCategory === "all"
    ? products
    : products.filter(product => product.category === activeCategory)

  return (
    <section className="py-16">
      <div className="container">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center">Featured Products</h2>
          <p className="mt-4 text-muted-foreground text-center max-w-2xl">
            Discover our collection of premium notebooks and journals for every need.
            From dotted journals to hardcover sketchbooks, find the perfect companion for your thoughts.
          </p>
        </div>

        <div className="flex items-center justify-center mb-8 overflow-x-auto no-scrollbar">
          <div className="flex gap-2 p-1">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
