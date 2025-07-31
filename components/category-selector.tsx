"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Scissors, Package, Utensils, Gamepad2, Heart, Shirt, Loader2 } from "lucide-react"
import { useCategories } from "@/hooks/use-categories"

// Icon mapping for categories
const iconMap: Record<string, any> = {
  "deshedding-tools": Scissors,
  "litter-boxes": Package,
  "food-bowls": Utensils,
  toys: Gamepad2,
  "health-care": Heart,
  accessories: Shirt,
}

interface CategorySelectorProps {
  onCategorySelect: (category: string) => void
}

export function CategorySelector({ onCategorySelect }: CategorySelectorProps) {
  const { categories, loading, error } = useCategories()

  if (loading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="mt-2 text-muted-foreground">Loading categories...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-600">Error loading categories: {error}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = iconMap[category.slug] || Package
            return (
              <Card
                key={category.id}
                className="cursor-pointer hover:shadow-lg transition-shadow group"
                onClick={() => onCategorySelect(category.slug)}
              >
                <CardContent className="p-6 text-center">
                  <Icon className="h-12 w-12 mx-auto mb-4 text-blue-600 group-hover:text-blue-700" />
                  <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                  {category.description && <p className="text-muted-foreground">{category.description}</p>}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
