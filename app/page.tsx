"use client"

import { useState } from "react"
import { Hero } from "@/components/hero"
import { CategorySelector } from "@/components/category-selector"
import { TagFilter } from "@/components/tag-filter"
import { FeaturedPicks } from "@/components/featured-picks"
import { TrendingTools } from "@/components/trending-tools"
import { ProductTable } from "@/components/product-table"
import { ProductModal } from "@/components/product-modal"
import { ComparisonTool } from "@/components/comparison-tool"
import { Header } from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [comparisonProducts, setComparisonProducts] = useState<any[]>([])
  const [showComparison, setShowComparison] = useState(false)

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Header />

        {!selectedCategory ? (
          <>
            <Hero />
            <CategorySelector onCategorySelect={setSelectedCategory} />
            <TagFilter selectedTags={selectedTags} onTagsChange={setSelectedTags} />
            <FeaturedPicks />
            <TrendingTools />
          </>
        ) : (
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold">Browse {selectedCategory}</h1>
                <p className="text-muted-foreground">Compare features and find your perfect pet product match</p>
              </div>
              <button onClick={() => setSelectedCategory(null)} className="text-blue-600 hover:text-blue-800">
                ← Back to Categories
              </button>
            </div>

            <ProductTable
              category={selectedCategory}
              selectedTags={selectedTags}
              onTagsChange={setSelectedTags}
              onProductSelect={setSelectedProduct}
              comparisonProducts={comparisonProducts}
              onComparisonChange={setComparisonProducts}
            />

            {comparisonProducts.length > 0 && (
              <div className="fixed bottom-4 right-4">
                <button
                  onClick={() => setShowComparison(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700"
                >
                  Compare ({comparisonProducts.length})
                </button>
              </div>
            )}
          </div>
        )}

        {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}

        {showComparison && (
          <ComparisonTool
            products={comparisonProducts}
            onClose={() => setShowComparison(false)}
            onRemoveProduct={(productId) => setComparisonProducts((prev) => prev.filter((p) => p.id !== productId))}
          />
        )}
      </div>
    </ThemeProvider>
  )
}
