"use client"

import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { useCartStore } from "@/lib/store/cart-store"
import { Product } from "@/types"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
import { ShoppingCart, Eye, Star } from "lucide-react"
import { useState } from "react"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast()
  const addToCart = useCartStore((state) => state.addItem)
  const [isHovered, setIsHovered] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, 1)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    })
  }

  // Generate a random rating between 4 and 5
  const rating = (4 + Math.random()).toFixed(1)

  return (
    <div 
      className="product-card group relative rounded-xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.id}`} className="block">
        <div className="aspect-square relative overflow-hidden bg-slate-50 dark:bg-slate-800">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Quick View Button */}
          <div className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <Button 
              variant="secondary" 
              size="sm" 
              className="bg-white/90 hover:bg-white dark:bg-slate-800/90 dark:hover:bg-slate-700 text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 rounded-full p-3"
              aria-label="Quick view"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Category Badge */}
          <div className="absolute top-2 left-2">
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-500/90 text-white">
              {product.category}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-3.5 w-3.5 ${i < Math.floor(Number(rating)) ? 'fill-yellow-400 text-yellow-400' : 'fill-slate-200 text-slate-200 dark:fill-slate-700 dark:text-slate-700'}`} />
              ))}
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">({rating})</span>
          </div>
          
          <h3 className="font-medium text-lg line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{product.name}</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 line-clamp-2">
            {product.description}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <span className="font-bold text-lg text-slate-900 dark:text-white">{formatPrice(product.price)}</span>
          </div>
        </div>
      </Link>
      
      <div className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart} 
          className="w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-sm group overflow-hidden relative"
        >
          <span className="relative z-10 flex items-center gap-2">
            <ShoppingCart className="h-4 w-4 transition-transform group-hover:rotate-[-10deg]" />
            <span className="transition-transform group-hover:translate-x-1">Add to Cart</span>
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-200"></span>
        </Button>
      </div>
    </div>
  )
}
