import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shopping Cart | Modern Notebook Store",
  description: "View and manage your shopping cart",
}

export default function CartLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
