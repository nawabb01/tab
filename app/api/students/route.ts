import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import type { Student } from "@/types/student"

export async function GET(request: NextRequest) {
  const students = db.getStudents()
  return NextResponse.json(students)
}

export async function POST(request: NextRequest) {
  try {
    const student: Student = await request.json()
    const newStudent = db.addStudent(student)
    return NextResponse.json(newStudent, { status: 201 })
  } catch (error) {
    console.error("Failed to add student:", error)
    return NextResponse.json({ error: "Failed to add student" }, { status: 500 })
  }
}
