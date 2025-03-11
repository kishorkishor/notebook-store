import { Metadata } from "next"
import CheckoutBackground from "./background"

export const metadata: Metadata = {
  title: "Checkout | Modern Notebook Store",
  description: "Complete your purchase of premium notebooks",
}

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen">
      <CheckoutBackground />
      {children}
    </div>
  )
}
