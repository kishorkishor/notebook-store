import "next-auth"
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
