import "next-auth"
import { JWT } from "next-auth/jwt"
import type { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Extend the built-in session types
   */
  interface Session {
    user: {
      /** User ID. */
      id: string
      /** Determines if the user has admin access. */
      isAdmin: boolean
    } & DefaultSession["user"]
  }

  /**
   * Extend the built-in user types
   */
  interface User {
    /** Determines if the user has admin access. */
    isAdmin: boolean
  }
}

declare module "next-auth/jwt" {
  /** Extend the built-in JWT types */
  interface JWT {
    /** Determines if the user has admin access. */
    isAdmin?: boolean
  }
}
