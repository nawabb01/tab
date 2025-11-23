import type { Student } from "@/types/student"

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
    issueDate: "2025-07-20",
    photoUrl: "/images/kawal.jpeg",
  },
  {
    rollNumber: "GNI2024010",
    name: "SUMANPREET KAUR",
    fatherName: "BUDH SINGH",
    email: "Sumanpreetsugga@gmail.com",
    phoneNumber: "6284717419",
    course: "ADCA (Advanced Diploma Computer Application)",
    startDate: "2024-08-01",
    issueDate: "2025-08-10",
    photoUrl: "/images/sumanpreet.jpg",
  },
  {
    rollNumber: "GNI2024011",
    name: "HARMANPREET KAUR",
    fatherName: "DAVINDER SINGH",
    email: "harmanpreetkaursugga@gmail.com",
    phoneNumber: "6280107507",
    course: "ADCA (Advanced Diploma Computer Application)",
    startDate: "2024-08-01",
    issueDate: "2025-08-10",
    photoUrl: "/images/harmanpreet.jpg",
  },
]

let students: Student[] = [...DEFAULT_STUDENTS]
let applications: any[] = []

if (typeof window !== "undefined") {
  try {
    const savedStudents = localStorage.getItem("gni_students")
    const savedApplications = localStorage.getItem("gni_applications")
    if (savedStudents) {
      students = JSON.parse(savedStudents)
    }
    if (savedApplications) {
      applications = JSON.parse(savedApplications)
    }
  } catch (error) {
    console.error("Error loading from localStorage:", error)
  }
}

function saveToLocalStorage() {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("gni_students", JSON.stringify(students))
      localStorage.setItem("gni_applications", JSON.stringify(applications))
    } catch (error) {
      console.error("Error saving to localStorage:", error)
    }
  }
}

export const db = {
  getStudents: () => students,

  getStudent: (rollNumber: string) => {
    const normalizedRollNumber = rollNumber.trim().replace(/\s+/g, "").toUpperCase()
    return students.find((s) => s.rollNumber.replace(/\s+/g, "").toUpperCase() === normalizedRollNumber)
  },

  addStudent: (student: Student) => {
    if (!student.rollNumber) {
      const nextNumber = String(students.length + 1).padStart(6, "0")
      student.rollNumber = `GNI${nextNumber}`
    }

    const exists = students.find((s) => s.rollNumber === student.rollNumber)
    if (exists) {
      console.error("Student with this roll number already exists")
      return null
    }

    students.push(student)
    saveToLocalStorage()
    return student
  },

  updateStudent: (updatedStudent: Student) => {
    const index = students.findIndex((s) => s.rollNumber === updatedStudent.rollNumber)
    if (index !== -1) {
      students[index] = updatedStudent
      saveToLocalStorage()
      return updatedStudent
    }
    return null
  },

  deleteStudent: (rollNumber: string) => {
    const initialLength = students.length
    students = students.filter((s) => s.rollNumber !== rollNumber)
    if (students.length < initialLength) {
      saveToLocalStorage()
      return true
    }
    return false
  },

  getApplications: () => applications,

  addApplication: (application: any) => {
    applications.push(application)
    saveToLocalStorage()
    return application
  },
}
