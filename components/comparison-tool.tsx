"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, X } from "lucide-react"
import Image from "next/image"

interface ComparisonToolProps {
  products: any[]
  onClose: () => void
  onRemoveProduct: (productId: number) => void
}

export function ComparisonTool({ products, onClose, onRemoveProduct }: ComparisonToolProps) {
  return (
    <Dialog open={products.length > 0} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Product Comparison</DialogTitle>
        </DialogHeader>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left p-4 border-b font-semibold">Product</th>
                {products.map((product) => (
                  <th key={product.id} className="text-center p-4 border-b min-w-[200px]">
                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6"
                        onClick={() => onRemoveProduct(product.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={100}
                        height={100}
                        className="w-20 h-20 object-cover rounded-lg mx-auto mb-2"
                      />
                      <h4 className="font-semibold text-sm">{product.name}</h4>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 border-b font-medium">Brand</td>
                {products.map((product) => (
                  <td key={product.id} className="p-4 border-b text-center">
                    {product.brand}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 border-b font-medium">Price</td>
                {products.map((product) => (
                  <td key={product.id} className="p-4 border-b text-center font-bold">
                    ${product.price}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 border-b font-medium">Rating</td>
                {products.map((product) => (
                  <td key={product.id} className="p-4 border-b text-center">
                    <div className="flex items-center justify-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      {product.rating}
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 border-b font-medium">Features</td>
                {products.map((product) => (
                  <td key={product.id} className="p-4 border-b">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {product.tags.map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 border-b font-medium">Pros</td>
                {products.map((product) => (
                  <td key={product.id} className="p-4 border-b">
                    <ul className="text-sm space-y-1">
                      {product.pros.slice(0, 3).map((pro: string, i: number) => (
                        <li key={i} className="text-green-600">
                          • {pro}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 border-b font-medium">Cons</td>
                {products.map((product) => (
                  <td key={product.id} className="p-4 border-b">
                    <ul className="text-sm space-y-1">
                      {product.cons.slice(0, 2).map((con: string, i: number) => (
                        <li key={i} className="text-red-600">
                          • {con}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  )
}
