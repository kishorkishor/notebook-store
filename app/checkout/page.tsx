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
import { Loader2, ArrowLeft, CreditCard, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export default function CheckoutPage() {
  const [isLoading, setIsLoading] = useState(false)
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
  const [mounted, setMounted] = useState(false)

  const router = useRouter()
  const { toast } = useToast()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const { resolvedTheme } = useTheme()
  const isDarkTheme = resolvedTheme === 'dark'
  
  // Set mounted state to true when component mounts in browser
  useEffect(() => {
    setMounted(true)
  }, [])

  // Only calculate values on the client side
  const subtotal = mounted ? getTotalPrice() : 0
  const shipping = subtotal > 2000 ? 0 : 120
  const total = subtotal + shipping

  // Check if cart is empty only after component is mounted
  useEffect(() => {
    if (mounted && items.length === 0) {
      router.push("/cart")
    }
  }, [mounted, items.length, router])

  // If not mounted yet, return a simple loading state
  if (!mounted) {
    return (
      <div className="container py-10">
        <div className="h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    )
  }

  // If cart is empty, don't render the page
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
    
    // Simulate API call
    setTimeout(() => {
      clearCart()
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase.",
      })
      router.push("/checkout/success")
    }, 1500)
  }

  return (
    <div className="container py-10">
      <Link 
        href="/cart" 
        className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to cart
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold mb-4 flex items-center">
                    <span className="bg-blue-600 dark:bg-blue-500 text-white w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">1</span>
                    Contact Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-white/90 dark:bg-slate-800/90"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-white/90 dark:bg-slate-800/90"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg font-semibold mb-4 flex items-center">
                    <span className="bg-blue-600 dark:bg-blue-500 text-white w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">2</span>
                    Shipping Address
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="bg-white/90 dark:bg-slate-800/90"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          className="bg-white/90 dark:bg-slate-800/90"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          required
                          className="bg-white/90 dark:bg-slate-800/90"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          required
                          className="bg-white/90 dark:bg-slate-800/90"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg font-semibold mb-4 flex items-center">
                    <span className="bg-blue-600 dark:bg-blue-500 text-white w-6 h-6 rounded-full inline-flex items-center justify-center mr-2">3</span>
                    Payment Information
                  </h2>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleChange}
                        required
                        className="bg-white/90 dark:bg-slate-800/90"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <div className="relative">
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          required
                          placeholder="1234 5678 9012 3456"
                          className="pl-10 bg-white/90 dark:bg-slate-800/90"
                        />
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          name="expiry"
                          value={formData.expiry}
                          onChange={handleChange}
                          required
                          placeholder="MM/YY"
                          className="bg-white/90 dark:bg-slate-800/90"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input
                          id="cvc"
                          name="cvc"
                          value={formData.cvc}
                          onChange={handleChange}
                          required
                          placeholder="123"
                          className="bg-white/90 dark:bg-slate-800/90"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Complete Order"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
        
        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800 sticky top-20">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {items.map((item) => (
                <div key={item.product.id} className="py-3 flex justify-between">
                  <div className="flex items-center">
                    <span className="font-medium">{item.product.name}</span>
                    <span className="text-sm text-muted-foreground ml-2">×{item.quantity}</span>
                  </div>
                  <span>{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              ))}
              
              <div className="py-3 flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              
              <div className="py-3 flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              
              <div className="py-3 flex justify-between font-bold">
                <span>Total</span>
                <span className="text-lg">{formatPrice(total)}</span>
              </div>
            </div>
            
            {shipping === 0 && (
              <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-green-800 dark:text-green-400">
                  You've qualified for free shipping on this order!
                </span>
              </div>
            )}
            
            <div className="mt-6 text-sm text-muted-foreground">
              <p>By placing your order, you agree to our Terms of Service and Privacy Policy.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
