import { db } from "@/lib/db"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { NextResponse } from "next/server"

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const remaining = await db.getRemainingSlots()
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
