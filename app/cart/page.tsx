"use client"

import { useCartStore } from "@/lib/store/cart-store" 
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { Trash2, MinusCircle, PlusCircle, ShoppingBag, ArrowRight } from "lucide-react"

// Remove metadata from client component
export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, getTotalItems, getTotalPrice } = useCartStore()
  const { toast } = useToast()
  
  const totalItems = getTotalItems()
  const subtotal = getTotalPrice()
  const shipping = subtotal > 2000 ? 0 : 120
  const total = subtotal + shipping

  const handleRemoveItem = (productId: string, productName: string) => {
    removeItem(productId)
    toast({
      title: "Item removed",
      description: `${productName} has been removed from your cart`,
    })
  }

  const handleClearCart = () => {
    clearCart()
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    })
  }

  const handleUpdateQuantity = (productId: string, newQuantity: number, stock: number) => {
    if (newQuantity > 0 && newQuantity <= stock) {
      updateQuantity(productId, newQuantity)
    }
  }

  if (items.length === 0) {
    return (
      <div className="container py-20">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center mb-6">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">
            Looks like you haven't added any notebooks to your cart yet.
          </p>
          <Button asChild>
            <Link href="/products">Browse Notebooks</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Your Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2">
          <div className="rounded-lg border overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-medium">Product</th>
                  <th className="text-center p-4 font-medium">Quantity</th>
                  <th className="text-right p-4 font-medium">Price</th>
                  <th className="text-right p-4 font-medium">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.product.id} className="border-t">
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="h-16 w-16 relative rounded overflow-hidden bg-muted mr-4 flex-shrink-0">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">
                            <Link href={`/product/${item.product.id}`} className="hover:underline">
                              {item.product.name}
                            </Link>
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {formatPrice(item.product.price)} each
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button 
                          onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1, item.product.stock)}
                          disabled={item.quantity <= 1}
                          className="text-muted-foreground hover:text-foreground disabled:opacity-50"
                        >
                          <MinusCircle className="h-5 w-5" />
                          <span className="sr-only">Decrease quantity</span>
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1, item.product.stock)}
                          disabled={item.quantity >= item.product.stock}
                          className="text-muted-foreground hover:text-foreground disabled:opacity-50"
                        >
                          <PlusCircle className="h-5 w-5" />
                          <span className="sr-only">Increase quantity</span>
                        </button>
                      </div>
                    </td>
                    <td className="p-4 text-right font-medium">
                      {formatPrice(item.product.price * item.quantity)}
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => handleRemoveItem(item.product.id, item.product.name)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-5 w-5" />
                        <span className="sr-only">Remove item</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-end">
            <Button variant="outline" onClick={handleClearCart} className="text-sm">
              Clear Cart
            </Button>
          </div>
        </div>

        <div>
          <div className="rounded-lg border overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                </div>
                
                {shipping > 0 && (
                  <div className="text-xs text-muted-foreground">
                    Free shipping on orders over Tk 2,000
                  </div>
                )}
                
                <div className="border-t pt-3 mt-3 flex justify-between font-medium">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
              
              <Button className="w-full mt-6 flex items-center gap-2" asChild>
                <Link href="/checkout">
                  Proceed to Checkout <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="mt-6 text-sm text-muted-foreground">
            <p>Need help? Contact our customer support.</p>
            <p className="mt-2">
              <strong>30-day return policy</strong>: We accept returns within 30 days of delivery.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
