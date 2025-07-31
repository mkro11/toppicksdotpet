"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Dog, Cat, ExternalLink } from "lucide-react"
import Image from "next/image"
import type { Product } from "@/hooks/use-products"

interface ProductModalProps {
  product: Product | null
  onClose: () => void
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  if (!product) return null

  const brandName = typeof product.brand === "string" ? product.brand : product.brand?.name || "Unknown"
  const imageUrl = product.images?.[0]?.url || "/placeholder.svg?height=400&width=400"
  const productTags = product.tags.map((tag) => (typeof tag === "string" ? tag : tag.name))

  return (
    <Dialog open={!!product} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="relative mb-4">
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={product.name}
                width={400}
                height={400}
                className="w-full h-80 object-cover rounded-lg"
              />
              {product.badge && (
                <Badge className="absolute top-4 left-4 bg-green-600 text-lg px-3 py-1">{product.badge}</Badge>
              )}
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                {product.petTypes.map((type: string) => (
                  <div key={type} className="flex items-center mr-3">
                    {type === "dog" ? (
                      <Dog className="h-5 w-5 text-blue-600 mr-1" />
                    ) : (
                      <Cat className="h-5 w-5 text-purple-600 mr-1" />
                    )}
                    <span className="capitalize text-sm">{type}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {productTags.map((tag: string) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">{brandName}</h3>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl font-bold">${product.price}</span>
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-lg">{product.rating}</span>
                  <span className="ml-2 text-muted-foreground">({product.reviewCount} reviews)</span>
                </div>
              </div>
            </div>

            {product.description && (
              <div className="mb-6">
                <p className="text-muted-foreground">{product.description}</p>
              </div>
            )}

            <div className="space-y-4 mb-6">
              <div>
                <h4 className="font-semibold text-green-600 mb-2">Pros</h4>
                <ul className="space-y-1">
                  {product.pros.map((pro: string, i: number) => (
                    <li key={i} className="text-sm">
                      • {pro}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-red-600 mb-2">Cons</h4>
                <ul className="space-y-1">
                  {product.cons.map((con: string, i: number) => (
                    <li key={i} className="text-sm">
                      • {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {product.bestFor && (
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-semibold mb-2">Best For</h4>
                  <p className="text-sm text-muted-foreground">{product.bestFor}</p>
                </div>
              </div>
            )}

            {product.materials && product.materials.length > 0 && (
              <div className="space-y-4 mb-6">
                <div>
                  <h4 className="font-semibold mb-2">Materials & Specs</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {product.materials.map((material, i) => (
                      <li key={i}>• {material}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              {product.affiliateLinks && product.affiliateLinks.length > 0 ? (
                product.affiliateLinks.map((link, i) => (
                  <Button key={i} className="flex-1" asChild>
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Buy on {link.retailer}
                    </a>
                  </Button>
                ))
              ) : (
                <>
                  <Button className="flex-1" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Buy on Amazon
                    </a>
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Buy on Chewy
                    </a>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
