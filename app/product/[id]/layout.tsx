import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Product Details | Modern Notebook Store",
  description: "View detailed information about our premium notebooks",
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
