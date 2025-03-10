import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us | Modern Notebook Store",
  description: "Get in touch with our team for any questions or support needs.",
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
