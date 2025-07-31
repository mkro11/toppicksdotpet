import { getPayloadHMR } from "@payloadcms/next/utilities"
import configPromise from "@payload-config"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const payload = await getPayloadHMR({ config: configPromise })

    const products = await payload.find({
      collection: "products",
      where: {
        featured: { equals: true },
      },
      sort: "rank",
      limit: 6,
      populate: ["category", "tags", "brand", "images"],
    })

    return NextResponse.json(products.docs)
  } catch (error) {
    console.error("Error fetching featured products:", error)
    return NextResponse.json({ error: "Failed to fetch featured products" }, { status: 500 })
  }
}
