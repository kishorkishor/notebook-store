"use client"

import { useState } from "react"
import ProductCard from "@/components/products/product-card"
import { Button } from "@/components/ui/button"
import { FilterDropdown } from "@/components/products/filter-dropdown"
import { Product } from "@/types"
import { categories } from "@/lib/data"

interface FeaturedProductsProps {
  products: Product[]
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  const [activeCategory, setActiveCategory] = useState("all")
  const [sortOption, setSortOption] = useState("newest")
  
  // Filter products by category
  let filteredProducts = activeCategory === "all"
    ? products
    : products.filter(product => product.category === activeCategory)
  
  // Sort products based on selected option
  switch(sortOption) {
    case "price_asc":
      filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price)
      break
    case "price_desc":
      filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price)
      break
    case "name_asc":
      filteredProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name))
      break
    case "name_desc":
      filteredProducts = [...filteredProducts].sort((a, b) => b.name.localeCompare(a.name))
      break
    default:
      filteredProducts = [...filteredProducts].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  }
  
  // Limit display to just 8 products on homepage
  const displayProducts = filteredProducts.slice(0, 8)

  return (
    <section className="py-16">
      <div className="container">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center">Featured Products</h2>
          <p className="mt-4 text-muted-foreground text-center max-w-2xl">
            Discover our collection of premium notebooks and journals for every need.
            From dotted journals to hardcover sketchbooks, find the perfect companion for your thoughts.
          </p>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center justify-center overflow-x-auto gap-2 scrollbar-hide">
            {categories.slice(0, 6).map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className="whitespace-nowrap"
              >
                {category.name}
              </Button>
            ))}
          </div>
          
          <FilterDropdown onSortChange={setSortOption} currentSort={sortOption} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <div key={product.id} className="animate-fade-in">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button asChild>
            <a href="/products">View All Products</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
