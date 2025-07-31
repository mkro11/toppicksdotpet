import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Loader2, Dog, Cat } from "lucide-react"
import Image from "next/image"
import { useFeaturedProducts } from "@/hooks/use-featured-products"

const featuredProducts = [
  {
    id: 1,
    name: "FURminator deShedding Tool",
    brand: "FURminator",
    price: 29.99,
    rating: 4.8,
    image: "/placeholder.svg?height=200&width=200",
    badge: "Editor's Choice",
    petTypes: ["dog", "cat"],
  },
  {
    id: 2,
    name: "Litter-Robot 4",
    brand: "Whisker",
    price: 699.0,
    rating: 4.6,
    image: "/placeholder.svg?height=200&width=200",
    badge: "Best Premium",
    petTypes: ["cat"],
  },
  {
    id: 3,
    name: "Elevated Dog Bowl Set",
    brand: "Neater Feeder",
    price: 39.99,
    rating: 4.7,
    image: "/placeholder.svg?height=200&width=200",
    badge: "Best Value",
    petTypes: ["dog"],
  },
]

export function FeaturedPicks() {
  const { products, loading, error } = useFeaturedProducts()

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Featured Picks</h2>
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
        </div>
      </section>
    )
  }

  if (error || products.length === 0) return null

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Picks</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.slice(0, 3).map((product) => {
            const brandName = typeof product.brand === "string" ? product.brand : product.brand?.name || "Unknown"
            const imageUrl = product.images?.[0]?.url || "/placeholder.svg?height=200&width=200"

            return (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="relative mb-4">
                    <Image
                      src={imageUrl || "/placeholder.svg"}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    {product.badge && <Badge className="absolute top-2 left-2 bg-green-600">{product.badge}</Badge>}
                    <div className="absolute top-2 right-2 flex gap-1">
                      {product.petTypes.map((type) => (
                        <div key={type} className="bg-white/90 rounded-full p-1">
                          {type === "dog" ? (
                            <Dog className="h-4 w-4 text-blue-600" />
                          ) : (
                            <Cat className="h-4 w-4 text-purple-600" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-muted-foreground mb-2">{brandName}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">${product.price}</span>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1 text-sm">{product.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
