import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const rollNumber = request.nextUrl.searchParams.get("rollNumber")

    if (!rollNumber) {
      return NextResponse.json({ error: "Roll number is required" }, { status: 400 })
    }

    const student = db.getStudent(rollNumber)

    if (!student) {
      return NextResponse.json({ error: "No certificate found for this roll number" }, { status: 404 })
    }

    return NextResponse.json(student)
  } catch (error) {
    console.error("Verification error:", error)
    return NextResponse.json({ error: "Failed to verify certificate" }, { status: 500 })
  }
}
