"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"
import toast from "react-hot-toast"

interface Product {
  id: number
  name: string
  price: number
  originalPrice: number
  category: string
  image: string
  rating: number
  reviews: number
  inStock: boolean
}

interface ProductGridProps {
  products: Product[]
  viewMode: "grid" | "list"
}

export function ProductGrid({ products, viewMode }: ProductGridProps) {
  const { dispatch } = useCart()

  const handleAddToCart = (product: Product) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        maxStock: 10, // Default stock limit
      },
    })
    toast.success(`${product.name} added to cart!`)
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
        <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters or search terms.</p>
      </div>
    )
  }

  if (viewMode === "list") {
    return (
      <div className="space-y-4">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-48 h-48 sm:h-32 relative overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {!product.inStock && (
                    <Badge className="absolute top-2 left-2" variant="destructive">
                      Out of Stock
                    </Badge>
                  )}
                </div>
                <div className="flex-1 p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <Link href={`/product/${product.id}`}>
                        <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors mb-2">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground ml-2">({product.reviews} reviews)</span>
                      </div>
                      <Badge variant="outline" className="mb-2">
                        {product.category}
                      </Badge>
                    </div>
                    <div className="flex flex-col sm:items-end gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-primary">${product.price}</span>
                        <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
                      </div>
                      <Button
                        disabled={!product.inStock}
                        className="w-full sm:w-auto"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        {product.inStock ? "Add to Cart" : "Out of Stock"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden">
          <CardContent className="p-0">
            <div className="relative overflow-hidden">
              <Link href={`/product/${product.id}`}>
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
              {!product.inStock && (
                <Badge className="absolute top-3 left-3" variant="destructive">
                  Out of Stock
                </Badge>
              )}
              <Badge className="absolute top-3 right-3" variant="secondary">
                {product.category}
              </Badge>
            </div>
            <div className="p-4">
              <Link href={`/product/${product.id}`}>
                <h3 className="text-lg font-semibold text-foreground hover:text-primary transition-colors mb-2 text-balance">
                  {product.name}
                </h3>
              </Link>
              <div className="flex items-center mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground ml-2">({product.reviews})</span>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl font-bold text-primary">${product.price}</span>
                <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button disabled={!product.inStock} className="w-full" onClick={() => handleAddToCart(product)}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
