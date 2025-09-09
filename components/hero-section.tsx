import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-primary/10 to-secondary/10 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              Discover Amazing Products at Unbeatable Prices
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Shop the latest electronics, fashion, and accessories with our exclusive deals. Get flat 20% off on all
              electronics this week!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/shop">
                <Button size="lg" className="text-lg px-8 py-3">
                  Shop Now
                </Button>
              </Link>
              <Link href="/shop?category=electronics">
                <Button variant="outline" size="lg" className="text-lg px-8 py-3 bg-transparent">
                  View Electronics
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src="/modern-electronics-hero-image-with-smartphone-lapt.jpg"
              alt="Featured Products"
              className="w-full h-auto rounded-lg shadow-2xl"
            />
            <div className="absolute top-4 right-4 bg-destructive text-destructive-foreground px-4 py-2 rounded-full font-bold">
              20% OFF
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
