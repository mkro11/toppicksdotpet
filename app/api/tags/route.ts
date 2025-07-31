import { getPayloadHMR } from "@payloadcms/next/utilities"
import configPromise from "@payload-config"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const payload = await getPayloadHMR({ config: configPromise })

    const tags = await payload.find({
      collection: "tags",
      sort: "name",
      limit: 100,
    })

    return NextResponse.json(tags.docs)
  } catch (error) {
    console.error("Error fetching tags:", error)
    return NextResponse.json({ error: "Failed to fetch tags" }, { status: 500 })
  }
}
