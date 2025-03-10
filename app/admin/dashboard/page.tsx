"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { products } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
import { Pencil, Trash2, Plus, Package, Users, ShoppingCart, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("products")
  
  // Redirect if not admin
  if (status === "loading") {
    return (
      <div className="container py-20 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }
  
  if (status === "unauthenticated" || !session?.user?.isAdmin) {
    router.push("/login?callbackUrl=/admin/dashboard")
    return null
  }

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button variant="outline" asChild>
          <Link href="/">View Store</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card rounded-lg border p-6 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Package className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Products</p>
            <h3 className="text-2xl font-bold">{products.length}</h3>
          </div>
        </div>

        <div className="bg-card rounded-lg border p-6 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Users</p>
            <h3 className="text-2xl font-bold">0</h3>
          </div>
        </div>

        <div className="bg-card rounded-lg border p-6 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <ShoppingCart className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Orders</p>
            <h3 className="text-2xl font-bold">0</h3>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border overflow-hidden">
        <div className="flex border-b">
          <button
            className={`px-4 py-3 font-medium text-sm ${
              activeTab === "products"
                ? "border-b-2 border-primary"
                : "text-muted-foreground"
            }`}
            onClick={() => setActiveTab("products")}
          >
            Products
          </button>
          <button
            className={`px-4 py-3 font-medium text-sm ${
              activeTab === "orders"
                ? "border-b-2 border-primary"
                : "text-muted-foreground"
            }`}
            onClick={() => setActiveTab("orders")}
          >
            Orders
          </button>
          <button
            className={`px-4 py-3 font-medium text-sm ${
              activeTab === "users"
                ? "border-b-2 border-primary"
                : "text-muted-foreground"
            }`}
            onClick={() => setActiveTab("users")}
          >
            Users
          </button>
        </div>

        <div className="p-6">
          {activeTab === "products" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Manage Products</h2>
                <Button>
                  <Plus className="h-4 w-4 mr-2" /> Add Product
                </Button>
              </div>

              <div className="border rounded-md overflow-auto">
                <table className="w-full">
                  <thead className="bg-muted/50 text-sm">
                    <tr>
                      <th className="text-left p-3 font-medium">Product</th>
                      <th className="text-left p-3 font-medium">Category</th>
                      <th className="text-left p-3 font-medium">Price</th>
                      <th className="text-left p-3 font-medium">Stock</th>
                      <th className="text-right p-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-t">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 relative rounded overflow-hidden bg-muted">
                              <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="40px"
                              />
                            </div>
                            <span className="font-medium line-clamp-1">
                              {product.name}
                            </span>
                          </div>
                        </td>
                        <td className="p-3">{product.category}</td>
                        <td className="p-3">{formatPrice(product.price)}</td>
                        <td className="p-3">{product.stock}</td>
                        <td className="p-3 text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="ghost">
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="text-center py-10">
              <h2 className="text-xl font-semibold mb-2">No Orders Yet</h2>
              <p className="text-muted-foreground">
                When customers place orders, they will appear here.
              </p>
            </div>
          )}

          {activeTab === "users" && (
            <div className="text-center py-10">
              <h2 className="text-xl font-semibold mb-2">No Users Yet</h2>
              <p className="text-muted-foreground">
                User accounts will be displayed here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
