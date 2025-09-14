import clientPromise from "@/lib/mongodb"

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const handle = searchParams.get("handle")

  if (!handle) {
    return Response.json({ success: false, message: "Missing handle" }, { status: 400 })
  }

  const client = await clientPromise
  const db = client.db("bittree")
  const collection = db.collection("links")
  const item = await collection.findOne({ handle })

  if (!item) {
    return Response.json({ success: false, message: "Handle not found" }, { status: 404 })
  }

  return Response.json({ success: true, data: item })
}