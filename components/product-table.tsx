"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Dog, Cat, Loader2 } from "lucide-react"
import Image from "next/image"
import { useProducts, type Product } from "@/hooks/use-products"

interface ProductTableProps {
  category: string
  selectedTags: string[]
  onTagsChange: (tags: string[]) => void
  onProductSelect: (product: Product) => void
  comparisonProducts: Product[]
  onComparisonChange: (products: Product[]) => void
}

export function ProductTable({
  category,
  selectedTags,
  onTagsChange,
  onProductSelect,
  comparisonProducts,
  onComparisonChange,
}: ProductTableProps) {
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedPetTypes, setSelectedPetTypes] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("rating")

  const { products, loading, error } = useProducts({
    category,
    tags: selectedTags,
    petTypes: selectedPetTypes,
    minPrice: priceRange[0],
    maxPrice: priceRange[1],
    sortBy,
  })

  const togglePetType = (petType: string) => {
    setSelectedPetTypes((prev) => (prev.includes(petType) ? prev.filter((t) => t !== petType) : [...prev, petType]))
  }

  const toggleComparison = (product: Product) => {
    const isSelected = comparisonProducts.some((p) => p.id === product.id)
    if (isSelected) {
      onComparisonChange(comparisonProducts.filter((p) => p.id !== product.id))
    } else if (comparisonProducts.length < 3) {
      onComparisonChange([...comparisonProducts, product])
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin mr-2" />
        <span>Loading products...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Error loading products: {error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Price Range */}
            <div>
              <label className="text-sm font-medium mb-2 block">Price Range</label>
              <Slider value={priceRange} onValueChange={setPriceRange} max={1000} step={10} className="mb-2" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            {/* Pet Type */}
            <div>
              <label className="text-sm font-medium mb-2 block">Pet Type</label>
              <div className="flex gap-2">
                <Button
                  variant={selectedPetTypes.includes("dog") ? "default" : "outline"}
                  size="sm"
                  onClick={() => togglePetType("dog")}
                >
                  <Dog className="h-4 w-4 mr-1" />
                  Dog
                </Button>
                <Button
                  variant={selectedPetTypes.includes("cat") ? "default" : "outline"}
                  size="sm"
                  onClick={() => togglePetType("cat")}
                >
                  <Cat className="h-4 w-4 mr-1" />
                  Cat
                </Button>
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="text-sm font-medium mb-2 block">Sort By</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="reviews">Most Reviews</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rank">Best Match</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Results Count */}
            <div className="flex items-end">
              <p className="text-sm text-muted-foreground">{products.length} products found</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => {
          const brandName = typeof product.brand === "string" ? product.brand : product.brand?.name || "Unknown"
          const imageUrl = product.images?.[0]?.url || "/placeholder.svg?height=150&width=150"
          const productTags = product.tags.map((tag) => (typeof tag === "string" ? tag : tag.name))

          return (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="relative mb-4">
                  <Image
                    src={imageUrl || "/placeholder.svg"}
                    alt={product.name}
                    width={150}
                    height={150}
                    className="w-full h-40 object-cover rounded-lg"
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

                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                <p className="text-muted-foreground text-sm mb-2">{brandName}</p>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold">${product.price}</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm">{product.rating}</span>
                    <span className="ml-1 text-xs text-muted-foreground">({product.reviewCount})</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {productTags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="space-y-2 mb-4">
                  <div>
                    <p className="text-xs font-medium text-green-600 mb-1">Pros:</p>
                    <ul className="text-xs text-muted-foreground">
                      {product.pros.slice(0, 2).map((pro, i) => (
                        <li key={i}>• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-red-600 mb-1">Cons:</p>
                    <ul className="text-xs text-muted-foreground">
                      {product.cons.slice(0, 1).map((con, i) => (
                        <li key={i}>• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1" onClick={() => onProductSelect(product)}>
                    View Details
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => toggleComparison(product)}
                    disabled={!comparisonProducts.some((p) => p.id === product.id) && comparisonProducts.length >= 3}
                  >
                    <Checkbox checked={comparisonProducts.some((p) => p.id === product.id)} readOnly />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
