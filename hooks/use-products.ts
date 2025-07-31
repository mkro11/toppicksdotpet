"use client"

import { useState, useEffect } from "react"

export interface Product {
  id: string
  name: string
  brand: string | { name: string }
  price: number
  rating: number
  reviewCount: number
  images?: Array<{ url: string; alt?: string }>
  petTypes: string[]
  tags: Array<string | { name: string }>
  pros: string[]
  cons: string[]
  badge?: string
  category: string | { name: string }
  description?: string
  specifications?: Record<string, any>
  bestFor?: string
  materials?: string[]
  sizes?: string[]
  affiliateLinks?: Array<{ retailer: string; url: string }>
  featured?: boolean
  rank: number
}

interface UseProductsParams {
  category?: string
  tags?: string[]
  petTypes?: string[]
  minPrice?: number
  maxPrice?: number
  sortBy?: string
  limit?: number
}

export function useProducts(params: UseProductsParams = {}) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!params.category) {
      setProducts([])
      return
    }

    async function fetchProducts() {
      setLoading(true)
      setError(null)

      try {
        const searchParams = new URLSearchParams()

        if (params.category) searchParams.set("category", params.category)
        if (params.tags?.length) searchParams.set("tags", params.tags.join(","))
        if (params.petTypes?.length) searchParams.set("petTypes", params.petTypes.join(","))
        if (params.minPrice !== undefined) searchParams.set("minPrice", params.minPrice.toString())
        if (params.maxPrice !== undefined) searchParams.set("maxPrice", params.maxPrice.toString())
        if (params.sortBy) searchParams.set("sortBy", params.sortBy)
        if (params.limit) searchParams.set("limit", params.limit.toString())

        const response = await fetch(`/api/products?${searchParams}`)
        if (!response.ok) throw new Error("Failed to fetch products")

        const data = await response.json()
        setProducts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [params.category, params.tags, params.petTypes, params.minPrice, params.maxPrice, params.sortBy, params.limit])

  return { products, loading, error }
}
