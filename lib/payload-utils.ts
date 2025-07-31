export function getImageUrl(image: any): string {
  if (!image) return "/placeholder.svg?height=400&width=400"

  // Handle different image formats from Payload
  if (typeof image === "string") return image
  if (image.url) return image.url
  if (image.filename) return `/media/${image.filename}`

  return "/placeholder.svg?height=400&width=400"
}

export function getBrandName(brand: any): string {
  if (!brand) return "Unknown"
  if (typeof brand === "string") return brand
  if (brand.name) return brand.name
  return "Unknown"
}

export function getTagNames(tags: any[]): string[] {
  if (!Array.isArray(tags)) return []
  return tags.map((tag) => (typeof tag === "string" ? tag : tag.name || tag.slug || ""))
}
