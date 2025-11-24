import { db } from "@/lib/db"

export async function GET() {
  try {
    const remaining = db.getRemainingSlots()
    return Response.json({
      remaining,
      total: db.MAX_STUDENTS,
      used: db.MAX_STUDENTS - remaining,
    })
  } catch (error) {
    console.error("Error getting slots:", error)
    return Response.json({ error: "Failed to get slots" }, { status: 500 })
  }
}
