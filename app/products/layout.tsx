import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Browse Our Products | Notebook Store",
  description: "Explore our collection of premium notebooks, journals, and stationery.",
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
