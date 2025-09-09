"use client"

import { useState, useMemo } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid, List } from "lucide-react"

// Mock product data
const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 59.99,
    originalPrice: 79.99,
    category: "Electronics",
    image: "/wireless-bluetooth-headphones-black-modern.jpg",
    rating: 4.5,
    reviews: 128,
    inStock: true,
  },
  {
    id: 2,
    name: "Smartwatch Pro X",
    price: 129.99,
    originalPrice: 159.99,
    category: "Electronics",
    image: "/smartwatch-black-modern-fitness-tracking.jpg",
    rating: 4.8,
    reviews: 89,
    inStock: true,
  },
  {
    id: 3,
    name: "Laptop Stand Adjustable",
    price: 34.99,
    originalPrice: 49.99,
    category: "Accessories",
    image: "/laptop-stand-aluminum-adjustable-modern.jpg",
    rating: 4.3,
    reviews: 67,
    inStock: true,
  },
  {
    id: 4,
    name: "Premium Cotton T-Shirt",
    price: 24.99,
    originalPrice: 34.99,
    category: "Clothing",
    image: "/premium-cotton-t-shirt-navy-blue.jpg",
    rating: 4.2,
    reviews: 156,
    inStock: true,
  },
  {
    id: 5,
    name: "Wireless Mouse Ergonomic",
    price: 19.99,
    originalPrice: 29.99,
    category: "Electronics",
    image: "/wireless-mouse-ergonomic-black.jpg",
    rating: 4.4,
    reviews: 203,
    inStock: true,
  },
  {
    id: 6,
    name: "Leather Wallet Brown",
    price: 39.99,
    originalPrice: 59.99,
    category: "Accessories",
    image: "/leather-wallet-brown-premium.jpg",
    rating: 4.6,
    reviews: 94,
    inStock: true,
  },
  {
    id: 7,
    name: "Denim Jeans Classic",
    price: 49.99,
    originalPrice: 69.99,
    category: "Clothing",
    image: "/denim-jeans-classic-blue.jpg",
    rating: 4.1,
    reviews: 178,
    inStock: true,
  },
  {
    id: 8,
    name: "USB-C Hub 7-in-1",
    price: 44.99,
    originalPrice: 64.99,
    category: "Electronics",
    image: "/usb-c-hub-7-in-1-aluminum.jpg",
    rating: 4.7,
    reviews: 112,
    inStock: true,
  },
  {
    id: 9,
    name: "Sunglasses Aviator",
    price: 79.99,
    originalPrice: 99.99,
    category: "Accessories",
    image: "/sunglasses-aviator-gold-frame.jpg",
    rating: 4.3,
    reviews: 87,
    inStock: false,
  },
  {
    id: 10,
    name: "Hoodie Pullover Gray",
    price: 54.99,
    originalPrice: 74.99,
    category: "Clothing",
    image: "/hoodie-pullover-gray-cotton.jpg",
    rating: 4.5,
    reviews: 134,
    inStock: true,
  },
  {
    id: 11,
    name: "Bluetooth Speaker Portable",
    price: 89.99,
    originalPrice: 119.99,
    category: "Electronics",
    image: "/bluetooth-speaker-portable-waterproof.jpg",
    rating: 4.6,
    reviews: 167,
    inStock: true,
  },
  {
    id: 12,
    name: "Backpack Travel 30L",
    price: 69.99,
    originalPrice: 89.99,
    category: "Accessories",
    image: "/backpack-travel-30l-black.jpg",
    rating: 4.4,
    reviews: 145,
    inStock: true,
  },
]

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [sortBy, setSortBy] = useState<string>("featured")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const categoryMatch = selectedCategory === "All" || product.category === selectedCategory
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1]
      return categoryMatch && priceMatch
    })

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        // Keep original order for "featured"
        break
    }

    return filtered
  }, [selectedCategory, sortBy, priceRange])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Shop All Products</h1>
          <p className="text-lg text-muted-foreground">Discover our complete collection of quality products</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <ProductFilters
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
            />
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <p className="text-muted-foreground">
                Showing {filteredAndSortedProducts.length} of {products.length} products
              </p>

              <div className="flex items-center gap-4">
                {/* View Mode Toggle */}
                <div className="flex items-center border border-border rounded-lg p-1">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="h-8 w-8 p-0"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="h-8 w-8 p-0"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>

                {/* Sort Dropdown */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="name">Name: A to Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Product Grid */}
            <ProductGrid products={filteredAndSortedProducts} viewMode={viewMode} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
