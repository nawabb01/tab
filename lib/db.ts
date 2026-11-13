import "server-only"

import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import type { Application, Student } from "@/types/student"

const MAX_STUDENTS = 50
const STUDENT_PHOTOS_BUCKET = "student-photos"
const MAX_STUDENT_PHOTO_BYTES = 5 * 1024 * 1024
const PHOTO_TYPES = new Map([
  ["image/jpeg", (bytes: Buffer) => bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff],
  ["image/png", (bytes: Buffer) => bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))],
  ["image/webp", (bytes: Buffer) => bytes.toString("ascii", 0, 4) === "RIFF" && bytes.toString("ascii", 8, 12) === "WEBP"],
])
let supabaseClient: SupabaseClient | undefined
let applications: Application[] = []

export class InvalidStudentPhotoError extends Error {
  constructor() {
    super("Photo must be a valid JPEG, PNG, or WebP image under 5 MB")
    this.name = "InvalidStudentPhotoError"
  }
}

type StudentRow = {
  roll_number: string
  name: string
  father_name: string
  email: string
  phone_number: string
  course: string
  start_date: string
  issue_date: string
  photo_url: string | null
}

function getSupabase(): SupabaseClient {
  if (!supabaseClient) {
    const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY

    if (!url || !serviceKey) {
      throw new Error("Supabase server credentials are not configured")
    }

    supabaseClient = createClient(url, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    })
  }

  return supabaseClient
}

function fromRow(row: StudentRow): Student {
  return {
    id: row.roll_number,
    rollNumber: row.roll_number,
    name: row.name,
    fatherName: row.father_name,
    email: row.email,
    phoneNumber: row.phone_number,
    course: row.course,
    startDate: row.start_date,
    issueDate: row.issue_date,
    ...(row.photo_url ? { photoUrl: row.photo_url } : {}),
  }
}

export async function persistStudentPhoto(student: Student): Promise<Student> {
  const photoUrl = student.photoUrl?.trim()
  if (!photoUrl || photoUrl.startsWith("/placeholder.svg")) {
    return { ...student, photoUrl: undefined }
  }
  if (!photoUrl.startsWith("data:")) return student

  const match = /^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/]+={0,2})$/.exec(photoUrl)
  if (!match || photoUrl.length > Math.ceil((MAX_STUDENT_PHOTO_BYTES * 4) / 3) + 64) {
    throw new InvalidStudentPhotoError()
  }

  const [, contentType, encodedImage] = match
  const bytes = Buffer.from(encodedImage, "base64")
  const hasValidSignature = PHOTO_TYPES.get(contentType)?.(bytes) ?? false
  if (!bytes.length || bytes.length > MAX_STUDENT_PHOTO_BYTES || !hasValidSignature) {
    throw new InvalidStudentPhotoError()
  }

  const rollNumber = student.rollNumber.trim()
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(rollNumber)) throw new InvalidStudentPhotoError()
  const path = `students/${rollNumber}`
  const { error } = await getSupabase().storage.from(STUDENT_PHOTOS_BUCKET).upload(path, bytes, {
    cacheControl: "31536000",
    contentType,
    upsert: true,
  })
  if (error) throw error

  const { data } = getSupabase().storage.from(STUDENT_PHOTOS_BUCKET).getPublicUrl(path)
  return { ...student, photoUrl: data.publicUrl }
}

function toRow(student: Student) {
  return {
    roll_number: student.rollNumber.trim(),
    name: student.name.trim(),
    father_name: student.fatherName.trim(),
    email: student.email.trim(),
    phone_number: student.phoneNumber.trim(),
    course: student.course.trim(),
    start_date: student.startDate,
    issue_date: student.issueDate,
    photo_url: student.photoUrl || null,
  }
}

export async function getStudents(): Promise<Student[]> {
  const { data, error } = await getSupabase()
    .from("students")
    .select("roll_number,name,father_name,email,phone_number,course,start_date,issue_date,photo_url")
    .order("roll_number", { ascending: true })

  if (error) throw error
  return (data as StudentRow[]).map(fromRow)
}

export async function addStudent(student: Student): Promise<Student | null> {
  const client = getSupabase()
  const { count, error: countError } = await client
    .from("students")
    .select("roll_number", { count: "exact", head: true })

  if (countError) throw countError
  if ((count ?? 0) >= MAX_STUDENTS) return null

  const { data, error } = await client
    .from("students")
    .insert(toRow(student))
    .select("roll_number,name,father_name,email,phone_number,course,start_date,issue_date,photo_url")
    .single()

  if (error) throw error
  return fromRow(data as StudentRow)
}

export async function updateStudent(rollNumber: string, student: Student): Promise<Student | null> {
  const { data, error } = await getSupabase()
    .from("students")
    .update(toRow(student))
    .eq("roll_number", rollNumber)
    .select("roll_number,name,father_name,email,phone_number,course,start_date,issue_date,photo_url")
    .maybeSingle()

  if (error) throw error
  return data ? fromRow(data as StudentRow) : null
}

export async function deleteStudent(rollNumber: string): Promise<boolean> {
  const { data, error } = await getSupabase()
    .from("students")
    .delete()
    .eq("roll_number", rollNumber)
    .select("roll_number")
    .maybeSingle()

  if (error) throw error
  return Boolean(data)
}

export async function getStudentByRollNumber(rollNumber: string): Promise<Student | null> {
  const normalizedRollNumber = rollNumber.replace(/\s+/g, "")
  const { data, error } = await getSupabase()
    .from("students")
    .select("roll_number,name,father_name,email,phone_number,course,start_date,issue_date,photo_url")
    .eq("roll_number", normalizedRollNumber)
    .maybeSingle()

  if (error) throw error
  return data ? fromRow(data as StudentRow) : null
}

export async function getRemainingSlots(): Promise<number> {
  const { count, error } = await getSupabase()
    .from("students")
    .select("roll_number", { count: "exact", head: true })

  if (error) throw error
  return Math.max(0, MAX_STUDENTS - (count ?? 0))
}

export function getApplications(): Application[] {
  return [...applications]
}

export function addApplication(application: Application): Application {
  const savedApplication: Application = {
    ...application,
    id: application.id ?? crypto.randomUUID(),
    phoneNumber: application.phoneNumber ?? application.phone ?? "",
  }
  applications = [...applications, savedApplication]
  return savedApplication
}

export const db = {
  getApplications,
  addApplication,
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  getStudentByRollNumber,
  getRemainingSlots,
  MAX_STUDENTS,
}
