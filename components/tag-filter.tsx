"use client"

import { Badge } from "@/components/ui/badge"
import { X, Loader2 } from "lucide-react"
import { useTags } from "@/hooks/use-tags"

interface TagFilterProps {
  selectedTags: string[]
  onTagsChange: (tags: string[]) => void
}

export function TagFilter({ selectedTags, onTagsChange }: TagFilterProps) {
  const { tags, loading, error } = useTags()

  const toggleTag = (tagSlug: string) => {
    if (selectedTags.includes(tagSlug)) {
      onTagsChange(selectedTags.filter((t) => t !== tagSlug))
    } else {
      onTagsChange([...selectedTags, tagSlug])
    }
  }

  if (loading) {
    return (
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            <span className="text-sm text-muted-foreground">Loading filters...</span>
          </div>
        </div>
      </section>
    )
  }

  if (error || tags.length === 0) return null

  return (
    <section className="py-8 bg-muted/30">
      <div className="container mx-auto px-4">
        <h3 className="text-lg font-semibold mb-4">Filter by Features</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag.id}
              variant={selectedTags.includes(tag.slug) ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/80"
              onClick={() => toggleTag(tag.slug)}
            >
              {tag.name}
              {selectedTags.includes(tag.slug) && <X className="h-3 w-3 ml-1" />}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  )
}
