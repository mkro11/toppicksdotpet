import { getPayloadHMR } from "@payloadcms/next/utilities"
import configPromise from "@payload-config"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const payload = await getPayloadHMR({ config: configPromise })

    const product = await payload.findByID({
      collection: "products",
      id: params.id,
      populate: ["category", "tags", "brand", "images"],
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ error: "Product not found" }, { status: 404 })
  }
}
