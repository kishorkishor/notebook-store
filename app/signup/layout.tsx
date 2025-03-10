import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create Account | Modern Notebook Store",
  description: "Sign up for a new account",
}

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
