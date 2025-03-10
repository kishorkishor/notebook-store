import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function CheckoutSuccessPage() {
  return (
    <div className="container py-20">
      <div className="max-w-md mx-auto text-center">
        <div className="h-20 w-20 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
          <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Thank you for your order!</h1>
        
        <p className="text-muted-foreground mb-6">
          Your order has been placed successfully. You will receive an email confirmation shortly.
        </p>
        
        <div className="bg-muted p-4 rounded-lg mb-6">
          <p className="text-sm">
            Order Reference: <span className="font-medium">NB-{Math.floor(100000 + Math.random() * 900000)}</span>
          </p>
        </div>
        
        <p className="text-sm text-muted-foreground mb-8">
          If you have any questions about your order, please contact our customer support.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
          
          <Button variant="outline" asChild>
            <Link href="/orders">View Orders</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
