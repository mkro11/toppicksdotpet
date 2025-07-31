import { getPayloadHMR } from "@payloadcms/next/utilities"
import configPromise from "@payload-config"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const tags = searchParams.get("tags")?.split(",").filter(Boolean) || []
    const petTypes = searchParams.get("petTypes")?.split(",").filter(Boolean) || []
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const sortBy = searchParams.get("sortBy") || "rank"
    const limit = Number.parseInt(searchParams.get("limit") || "50")

    const payload = await getPayloadHMR({ config: configPromise })

    // Build the where clause
    const where: any = {}

    if (category) {
      where.category = { equals: category }
    }

    if (tags.length > 0) {
      where.tags = { in: tags }
    }

    if (petTypes.length > 0) {
      where.petTypes = { in: petTypes }
    }

    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) where.price.greater_than_equal = Number.parseFloat(minPrice)
      if (maxPrice) where.price.less_than_equal = Number.parseFloat(maxPrice)
    }

    // Determine sort field
    let sort = "rank"
    switch (sortBy) {
      case "price-low":
        sort = "price"
        break
      case "price-high":
        sort = "-price"
        break
      case "rating":
        sort = "-rating"
        break
      case "reviews":
        sort = "-reviewCount"
        break
    }

    const products = await payload.find({
      collection: "products",
      where,
      sort,
      limit,
      populate: ["category", "tags", "brand"],
    })

    return NextResponse.json(products.docs)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
