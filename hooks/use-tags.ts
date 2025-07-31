"use client"

import { useState, useEffect } from "react"

export interface Tag {
  id: string
  name: string
  slug: string
  color?: string
}

export function useTags() {
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTags() {
      try {
        const response = await fetch("/api/tags")
        if (!response.ok) throw new Error("Failed to fetch tags")
        const data = await response.json()
        setTags(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error")
      } finally {
        setLoading(false)
      }
    }

    fetchTags()
  }, [])

  return { tags, loading, error }
}
