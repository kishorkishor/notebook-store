"use client"

import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { useCartStore } from "@/lib/store/cart-store"
import { Product } from "@/types"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
import { ShoppingCart } from "lucide-react"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast()
  const addToCart = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    addToCart(product, 1)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    })
  }

  return (
    <div className="product-card group rounded-lg border overflow-hidden">
      <Link href={`/product/${product.id}`} className="block">
        <div className="aspect-square relative overflow-hidden bg-muted">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <h3 className="font-medium text-lg line-clamp-1">{product.name}</h3>
          <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
            {product.description}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <span className="font-semibold">{formatPrice(product.price)}</span>
            <span className="text-xs text-muted-foreground uppercase tracking-wide bg-secondary py-1 px-2 rounded">
              {product.category}
            </span>
          </div>
        </div>
      </Link>
      <div className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart} 
          className="w-full gap-2"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  )
}
