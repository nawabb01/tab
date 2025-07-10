import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import type { Student } from "@/types/student"

export async function PUT(request: NextRequest, { params }: { params: { rollNumber: string } }) {
  try {
    const student: Student = await request.json()
    const updatedStudent = db.updateStudent(student)

    if (!updatedStudent) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 })
    }

    return NextResponse.json(updatedStudent)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update student" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { rollNumber: string } }) {
  try {
    const success = db.deleteStudent(params.rollNumber)

    if (!success) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete student" }, { status: 500 })
  }
}
