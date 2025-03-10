import { products, categories } from "@/lib/data"
import ProductCard from "@/components/products/product-card"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Notebooks & Journals | Modern Notebook Store",
  description: "Browse our collection of premium notebooks, journals, planners and sketchbooks.",
}

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const categoryParam = searchParams.category as string | undefined
  
  const filteredProducts = categoryParam && categoryParam !== 'all'
    ? products.filter(product => product.category === categoryParam)
    : products
  
  const currentCategory = categoryParam || 'all'
  const categoryName = categories.find(c => c.id === currentCategory)?.name || 'All Notebooks'

  return (
    <div className="container py-10">
      <div className="flex flex-col items-center mb-10">
        <h1 className="text-4xl font-bold">{categoryName}</h1>
        <p className="mt-4 text-muted-foreground text-center max-w-2xl">
          Discover our handpicked collection of high-quality notebooks designed for every writing need
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map((category) => (
          <a
            key={category.id}
            href={category.id === 'all' ? '/products' : `/products?category=${category.id}`}
            className={`px-4 py-2 rounded-md text-sm ${
              currentCategory === category.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary hover:bg-secondary/80'
            }`}
          >
            {category.name}
          </a>
        ))}
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h3 className="text-2xl font-medium">No products found</h3>
          <p className="mt-2 text-muted-foreground">
            Try selecting a different category or check back later for new additions.
          </p>
        </div>
      )}
    </div>
  )
}
