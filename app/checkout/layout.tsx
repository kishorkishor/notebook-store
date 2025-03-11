import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Checkout | Modern Notebook Store",
  description: "Complete your purchase of premium notebooks",
}

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
