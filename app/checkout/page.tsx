"use client"

import { useState, useEffect } from "react"
import { useCartStore } from "@/lib/store/cart-store"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formatPrice } from "@/lib/utils"
import Link from "next/link"
import { Loader2 } from "lucide-react"

export default function CheckoutPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Bangladesh",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvc: ""
  })

  const router = useRouter()
  const { toast } = useToast()
  const { items, getTotalPrice, clearCart } = useCartStore()
  
  const subtotal = getTotalPrice()
  const shipping = subtotal > 2000 ? 0 : 120
  const total = subtotal + shipping

  // Ensure this code only runs on the client side
  useEffect(() => {
    setIsClient(true)
    if (items.length === 0) {
      router.push("/cart")
    }
  }, [items.length, router])

  // If not client-side yet or cart is empty, don't render
  if (!isClient) {
    return null
  }

  if (items.length === 0) {
    return null
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate payment processing
    setTimeout(() => {
      clearCart()
      setIsLoading(false)
      
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase. We'll send you an email with your order details.",
      })
      
      router.push("/checkout/success")
    }, 1500)
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <div className="rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Street Address</Label>
                <Input 
                  id="address"
                  name="address"
                  placeholder="123 Main St"
                  required
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input 
                    id="city"
                    name="city"
                    placeholder="Dhaka"
                    required
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input 
                    id="postalCode"
                    name="postalCode"
                    placeholder="1212"
                    required
                    value={formData.postalCode}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input 
                    id="country"
                    name="country"
                    value="Bangladesh"
                    disabled
                  />
                </div>
              </div>
              
              <div className="border-t pt-6 mt-6">
                <h2 className="text-xl font-semibold mb-6">Payment Information</h2>
                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Payment Method</Label>
                  <select 
                    id="paymentMethod" 
                    name="paymentMethod"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    required
                  >
                    <option value="">Select payment method</option>
                    <option value="card">Credit/Debit Card</option>
                    <option value="bkash">bKash</option>
                    <option value="nagad">Nagad</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="cod">Cash on Delivery</option>
                  </select>
                </div>
                
                <div className="space-y-2 mt-4">
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input 
                    id="cardName"
                    name="cardName"
                    placeholder="John Doe"
                    required
                    value={formData.cardName}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2 mt-4">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input 
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    required
                    value={formData.cardNumber}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiration Date</Label>
                    <Input 
                      id="expiry"
                      name="expiry"
                      placeholder="MM/YY"
                      required
                      value={formData.expiry}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input 
                      id="cvc"
                      name="cvc"
                      placeholder="123"
                      required
                      value={formData.cvc}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-8 pt-4 border-t">
                <Button type="button" variant="outline" asChild>
                  <Link href="/cart">Back to Cart</Link>
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                    </>
                  ) : (
                    <>Place Order</>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Order Summary */}
        <div>
          <div className="rounded-lg border overflow-hidden sticky top-24">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-4">
                {items.map(item => (
                  <div key={item.product.id} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-sm font-medium">{item.quantity} × {item.product.name}</span>
                    </div>
                    <span>{formatPrice(item.quantity * item.product.price)}</span>
                  </div>
                ))}
                
                <div className="border-t mt-4 pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                  </div>
                </div>
                
                <div className="border-t mt-2 pt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-sm text-muted-foreground space-y-4">
            <p>
              By placing your order, you agree to our <Link href="/terms" className="underline">Terms and Conditions</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>.
            </p>
            
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <p>All transactions are secure and encrypted.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
