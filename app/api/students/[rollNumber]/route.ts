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

export async function PUT(request: NextRequest, { params }: { params: { rollNumber: string } }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { rollNumber } = await params
    const student: unknown = await request.json()
    if (!isStudent(student) || !student.name.trim() || !student.course.trim()) {
      return NextResponse.json({ error: "Invalid student details" }, { status: 400 })
    }

    const studentWithPhoto = await persistStudentPhoto(student)
    const updatedStudent = await db.updateStudent(decodeURIComponent(rollNumber), studentWithPhoto)
    if (!updatedStudent) return NextResponse.json({ error: "Student not found" }, { status: 404 })
    return NextResponse.json(updatedStudent)
  } catch (error) {
    if (error instanceof InvalidStudentPhotoError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    console.error("Failed to update student:", error)
    return NextResponse.json({ error: "Failed to update student" }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: { rollNumber: string } }) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { rollNumber } = await params
    const success = await db.deleteStudent(decodeURIComponent(rollNumber))
    if (!success) return NextResponse.json({ error: "Student not found" }, { status: 404 })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to delete student:", error)
    return NextResponse.json({ error: "Failed to delete student" }, { status: 500 })
  }
}
