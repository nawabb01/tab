import type { Student } from "@/types/student"

const MAX_STUDENTS = 50
const STORAGE_KEY = "gni_students"

// In-memory store (survives during session)
let studentsStore: Student[] = []
let isInitialized = false

// Default students data
const DEFAULT_STUDENTS: Student[] = [
  {
    rollNumber: "GNI202401",
    name: "PAWAN DEEP KAUR",
    fatherName: "MUKHTAR SINGH",
    email: "NOORDI8322@GMAIL.COM",
    phoneNumber: "8198884908",
    course: "Basic Computer Course",
    startDate: "2024-05-01",
    issueDate: "2024-12-10",
    photoUrl: "/images/pawan.jpeg",
  },
  {
    rollNumber: "GNI202402",
    name: "PARMOD KUMAR",
    fatherName: "VINOD KUMAR",
    email: "PARMODKUMAR4978@GMAIL.COM",
    phoneNumber: "6284909210",
    course: "Basic Computer Course",
    startDate: "2024-06-01",
    issueDate: "2024-12-10",
    photoUrl: "/images/parmod.jpeg",
  },
  {
    rollNumber: "GNI202403",
    name: "GAGANPREET KAUR",
    fatherName: "SATNAM SINGH",
    email: "GAGANPREETSINGH545554@GMAIL.COM",
    phoneNumber: "8968093508",
    course: "Basic Computer Course",
    startDate: "2024-06-01",
    issueDate: "2024-10-10",
    photoUrl: "/images/gagan.jpeg",
  },
  {
    rollNumber: "GNI202404",
    name: "SUKHDEEP KAUR",
    fatherName: "GURBAJ SINGH",
    email: "SEHAJPALS705@GMAIL.COM",
    phoneNumber: "8264707952",
    course: "Basic Computer Course",
    startDate: "2024-05-01",
    issueDate: "2024-12-10",
    photoUrl: "/images/sukhdeep.jpeg",
  },
  {
    rollNumber: "GNI202405",
    name: "RAMANDEEP KAUR",
    fatherName: "RANDHIR SINGH",
    email: "ramandeepkaur36001@gmail.com",
    phoneNumber: "9855671852",
    course: "Advanced Diploma in Computer Application (ADCA)",
    startDate: "2024-05-01",
    issueDate: "2025-05-01",
    photoUrl: "/images/ramandeep.jpeg",
  },
  {
    rollNumber: "GNI202406",
    name: "JOBANPREET KAUR",
    fatherName: "SUKHPAL SINGH",
    email: "uppaljobanpreetkaur@gmail.com",
    phoneNumber: "9592034231",
    course: "ADCA (Advanced Diploma Computer Application)",
    startDate: "2024-06-05",
    issueDate: "2025-06-10",
    photoUrl: "/images/joban.jpeg",
  },
  {
    rollNumber: "GNI202407",
    name: "SHARNJIT KAUR",
    fatherName: "SATISH KUMAR",
    email: "kumarpooja38198@gmail.com",
    phoneNumber: "9781755064",
    course: "ADCA (Advanced Diploma Computer Application)",
    startDate: "2024-07-10",
    issueDate: "2025-07-15",
    photoUrl: "/images/sharn.jpeg",
  },
  {
    rollNumber: "GNI202408",
    name: "MANDEEP KAUR",
    fatherName: "KULWINDER SINGH",
    email: "harmanpreetsinghharmansingh@gmail.com",
    phoneNumber: "7347218421",
    course: "ADCA (Advanced Diploma Computer Application)",
    startDate: "2024-07-15",
    issueDate: "2025-07-20",
    photoUrl: "/images/mandeep.jpeg",
  },
  {
    rollNumber: "GNI202409",
    name: "KAWALJIT KAUR",
    fatherName: "ARJINDER SINGH",
    email: "kawaljetkaur67888@gmail.com",
    phoneNumber: "9501114131",
    course: "ADCA (Advanced Diploma Computer Application)",
    startDate: "2024-07-17",
    issueDate: "2025-07-25",
    photoUrl: "/images/kawal.jpeg",
  },
  {
    rollNumber: "GNI2024010",
    name: "SUMANPREET KAUR",
    fatherName: "BUDH SINGH",
    email: "Sumanpreetsugga@gmail.com",
    phoneNumber: "6284717419",
    course: "ADCA",
    startDate: "2024-08-01",
    issueDate: "2025-08-10",
    photoUrl: "/images/1000375047.jpg",
  },
  {
    rollNumber: "GNI2024011",
    name: "HARMANPREET KAUR",
    fatherName: "DAVINDER SINGH",
    email: "harmanpreetkaursugga@gmail.com",
    phoneNumber: "6280107507",
    course: "ADCA",
    startDate: "2024-08-01",
    issueDate: "2025-08-10",
    photoUrl: "/images/harman-pic.jpg", // Updated to correct Harmanpreet photo
  },
  {
    rollNumber: "GNI2024013",
    name: "ASHMEET KAUR",
    fatherName: "HARJEET SINGH",
    email: "sukhjotgill39@gmail.com",
    phoneNumber: "9188472131889",
    course: "DCA",
    startDate: "2025-06-01",
    issueDate: "2025-11-25",
    photoUrl: "/images/img-20251122-wa0030.jpg",
  },
]

function loadFromStorage(): Student[] {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error("Error loading from localStorage:", error)
  }
  return []
}

function saveToStorage(students: Student[]) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students))
  } catch (error) {
    console.error("Error saving to localStorage:", error)
  }
}

export function initializeStudents() {
  if (!isInitialized) {
    const stored = loadFromStorage()
    if (stored.length > 0) {
      studentsStore = stored
    } else {
      studentsStore = [...DEFAULT_STUDENTS]
    }
    isInitialized = true
  }
  return studentsStore
}

export function getStudents(): Student[] {
  if (!isInitialized) {
    initializeStudents()
  }
  return [...studentsStore]
}

export function addStudent(student: Student): Student | null {
  if (!isInitialized) {
    initializeStudents()
  }
  if (studentsStore.length >= MAX_STUDENTS) {
    console.warn(`Cannot add student. Maximum limit of ${MAX_STUDENTS} students reached.`)
    return null
  }
  studentsStore.push(student)
  saveToStorage(studentsStore)
  return student
}

export function updateStudent(rollNumber: string, updates: Partial<Student>): Student | null {
  if (!isInitialized) {
    initializeStudents()
  }
  const index = studentsStore.findIndex((s) => s.rollNumber === rollNumber)
  if (index === -1) return null
  studentsStore[index] = { ...studentsStore[index], ...updates }
  saveToStorage(studentsStore)
  return studentsStore[index]
}

export function deleteStudent(rollNumber: string): boolean {
  if (!isInitialized) {
    initializeStudents()
  }
  const index = studentsStore.findIndex((s) => s.rollNumber === rollNumber)
  if (index === -1) return false
  studentsStore.splice(index, 1)
  saveToStorage(studentsStore)
  return true
}

export function getStudentByRollNumber(rollNumber: string): Student | null {
  if (!isInitialized) {
    initializeStudents()
  }
  return studentsStore.find((s) => s.rollNumber.replace(/\s+/g, "") === rollNumber.replace(/\s+/g, "")) || null
}

export function getRemainingSlots(): number {
  if (!isInitialized) {
    initializeStudents()
  }
  return MAX_STUDENTS - studentsStore.length
}

export const db = {
  initializeStudents,
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  getStudentByRollNumber,
  getRemainingSlots,
  MAX_STUDENTS,
}
