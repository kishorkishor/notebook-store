import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Dashboard | Modern Notebook Store",
  description: "Manage your store",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
