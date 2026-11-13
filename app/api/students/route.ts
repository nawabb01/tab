import { type NextRequest, NextResponse } from "next/server"
import { db, InvalidStudentPhotoError, persistStudentPhoto } from "@/lib/db"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import type { Student } from "@/types/student"

function isStudent(value: unknown): value is Student {
  if (!value || typeof value !== "object") return false
  const student = value as Record<string, unknown>
  const textFields = ["rollNumber", "name", "fatherName", "email", "phoneNumber", "course", "startDate", "issueDate"]
  const hasValidTextFields = textFields.every(
    (field) => typeof student[field] === "string" && (student[field] as string).length <= 500,
  )
  const photoUrl = student.photoUrl
  return (
    hasValidTextFields &&
    (photoUrl === undefined ||
      (typeof photoUrl === "string" && photoUrl.length <= 7_000_000))
  )
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    return NextResponse.json(await db.getStudents(), { headers: { "Cache-Control": "no-store" } })
  } catch (error) {
    console.error("Failed to fetch students:", error)
    return NextResponse.json({ error: "Failed to fetch students" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const student: unknown = await request.json()
    if (!isStudent(student) || !student.rollNumber.trim() || !student.name.trim() || !student.course.trim()) {
      return NextResponse.json({ error: "Invalid student details" }, { status: 400 })
    }

    const studentWithPhoto = await persistStudentPhoto(student)
    const newStudent = await db.addStudent(studentWithPhoto)
    if (!newStudent) return NextResponse.json({ error: "Maximum 50 students limit reached" }, { status: 409 })
    return NextResponse.json(newStudent, { status: 201 })
  } catch (error) {
    if (error instanceof InvalidStudentPhotoError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    console.error("Failed to add student:", error)
    return NextResponse.json({ error: "Failed to add student" }, { status: 500 })
  }
}
