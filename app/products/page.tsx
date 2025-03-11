"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { products, categories } from "@/lib/data"
import ProductCard from "@/components/products/product-card"
import { FilterDropdown } from "@/components/products/filter-dropdown"
import { Product } from "@/types"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const categoryParam = searchParams.get("category") || 'all'
  const sortParam = searchParams.get("sort") || "newest"
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  
  // Get the category name for display
  const categoryName = categories.find(c => c.id === categoryParam)?.name || 'All Notebooks'

  // Handle sort change
  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("sort", value)
    router.push(`/products?${params.toString()}`)
  }

  // Filter and sort products whenever params change
  useEffect(() => {
    // Filter by category
    let result = categoryParam === 'all' 
      ? [...products] 
      : products.filter(product => product.category === categoryParam)
    
    // Sort products
    switch(sortParam) {
      case "price_asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price_desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "name_asc":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "name_desc":
        result.sort((a, b) => b.name.localeCompare(a.name))
        break
      case "newest":
      default:
        result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        break
    }
    
    setFilteredProducts(result)
  }, [categoryParam, sortParam])

  return (
    <div className="container py-10">
      <div className="flex flex-col items-center mb-10">
        <h1 className="text-4xl font-bold">{categoryName}</h1>
        <p className="mt-4 text-muted-foreground text-center max-w-2xl">
          Discover our handpicked collection of high-quality notebooks designed for every writing need
        </p>
      </div>

      {/* Filter and Sort UI */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <a
              key={category.id}
              href={category.id === 'all' ? '/products' : `/products?category=${category.id}`}
              className={`px-4 py-2 rounded-md text-sm ${
                categoryParam === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              {category.name}
            </a>
          ))}
        </div>
        
        <FilterDropdown 
          onSortChange={handleSortChange} 
          currentSort={sortParam}
        />
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h3 className="text-2xl font-medium">No products found</h3>
          <p className="mt-2 text-muted-foreground">
            Try selecting a different category or check back later for new additions.
          </p>
        </div>
      )}
    </div>
  )
}
