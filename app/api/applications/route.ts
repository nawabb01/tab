import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import type { Application } from "@/types/student"

export async function GET(request: NextRequest) {
  const applications = db.getApplications()
  return NextResponse.json(applications)
}

export async function POST(request: NextRequest) {
  try {
    const application: Application = await request.json()
    const newApplication = db.addApplication(application)
    return NextResponse.json(newApplication, { status: 201 })
  } catch (error) {
    console.error("Failed to add application:", error)
    return NextResponse.json({ error: "Failed to add application" }, { status: 500 })
  }
}
