"use client"

import { useState } from "react"
import Image from "next/image"
import { notFound } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { useCartStore } from "@/lib/store/cart-store" // Fixed import path
import { Button } from "@/components/ui/button"
import { ShoppingCart, Check, Package, ArrowLeft } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import { products } from "@/lib/data"
import Link from "next/link"

export default function ProductPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const { toast } = useToast()
  const addToCart = useCartStore((state) => state.addItem)

  const product = products.find((p) => p.id === params.id)

  if (!product) {
    notFound()
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    toast({
      title: "Added to cart",
      description: `${product.name} (${quantity}) has been added to your cart`,
    })
  }

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <div className="container py-10">
      <Link href="/products" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square relative rounded-lg overflow-hidden border">
            <Image
              src={product.images[activeImageIndex]}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          
          {/* Thumbnail images */}
          {product.images.length > 1 && (
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative w-20 h-20 border rounded overflow-hidden ${
                    index === activeImageIndex ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-6">
            <span className="text-sm text-muted-foreground uppercase tracking-wider">
              {product.category}
            </span>
            <h1 className="text-3xl font-bold mt-1">{product.name}</h1>
            <div className="mt-4 text-2xl font-semibold">
              {formatPrice(product.price)}
            </div>
            <div className="mt-2 flex items-center space-x-2">
              <span className={product.stock > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
              {product.stock > 0 && (
                <span className="text-sm text-muted-foreground">
                  ({product.stock} available)
                </span>
              )}
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none mb-6">
            <p>{product.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-2">Features:</h3>
            <ul className="space-y-1">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center mb-6">
              <div className="flex items-center border rounded-md">
                <button
                  onClick={decrementQuantity}
                  className="px-3 py-1 hover:bg-muted"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  className="px-3 py-1 hover:bg-muted"
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
              <Button 
                onClick={handleAddToCart} 
                className="ml-4 flex-1 flex items-center justify-center gap-2"
                disabled={product.stock === 0}
              >
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </Button>
            </div>

            <div className="flex items-start space-x-2 text-sm text-muted-foreground">
              <Package className="h-5 w-5 flex-shrink-0" />
              <p>Free shipping on orders over Tk 2,000. 30-day return policy.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
