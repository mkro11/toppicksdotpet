import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp } from "lucide-react"

const trendingProducts = [
  { name: "ChomChom Roller", category: "Hair Removal", trend: "+15%" },
  { name: "Puzzle Feeder Bowl", category: "Feeding", trend: "+22%" },
  { name: "Smart Pet Camera", category: "Monitoring", trend: "+8%" },
  { name: "Orthopedic Pet Bed", category: "Comfort", trend: "+12%" },
]

export function TrendingTools() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Trending Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {trendingProducts.map((product, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <Badge variant="secondary" className="text-green-600">
                    {product.trend}
                  </Badge>
                </div>
                <h4 className="font-semibold">{product.name}</h4>
                <p className="text-sm text-muted-foreground">{product.category}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
