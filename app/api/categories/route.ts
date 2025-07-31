import { getPayloadHMR } from "@payloadcms/next/utilities"
import configPromise from "@payload-config"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const payload = await getPayloadHMR({ config: configPromise })

    const categories = await payload.find({
      collection: "categories",
      sort: "order",
      limit: 100,
    })

    return NextResponse.json(categories.docs)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}
