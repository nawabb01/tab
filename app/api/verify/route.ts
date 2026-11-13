import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const rollNumber = request.nextUrl.searchParams.get("rollNumber")
    if (!rollNumber?.trim()) {
      return NextResponse.json({ error: "Roll number is required" }, { status: 400 })
    }

    const student = await db.getStudentByRollNumber(rollNumber.trim())
    if (!student) {
      return NextResponse.json({ error: "No certificate found for this roll number" }, { status: 404 })
    }

    const maskedEmail = student.email.replace(/^(.).+(@.*)$/, "$1••••$2")
    const maskedPhone = student.phoneNumber
      ? `••••••${student.phoneNumber.replace(/\D/g, "").slice(-4)}`
      : ""

    return NextResponse.json(
      { ...student, email: maskedEmail, phoneNumber: maskedPhone },
      { headers: { "Cache-Control": "no-store" } },
    )
  } catch (error) {
    console.error("Verification error:", error)
    return NextResponse.json({ error: "Failed to verify certificate" }, { status: 500 })
  }
}
