import { Metadata } from "next"
import SuccessBackground from "./background"

export const metadata: Metadata = {
  title: "Order Success | Modern Notebook Store",
  description: "Your order has been successfully placed. Thank you for shopping with us!",
}

export default function CheckoutSuccessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen">
      <SuccessBackground />
      {children}
    </div>
  )
} 