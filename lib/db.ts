import type { Student, Application } from "@/types/student"

// Mock database with all students
let students: Student[] = [
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

const applications: Application[] = []

export const db = {
  getStudents: () => students,
  getStudent: (rollNumber: string) => {
    console.log("Searching for roll number:", rollNumber)
    const student = students.find((s) => s.rollNumber.toLowerCase() === rollNumber.toLowerCase())
    console.log("Found student:", student)
    return student
  },
  addStudent: (student: Student) => {
    students.push(student)
    return student
  },
  updateStudent: (updatedStudent: Student) => {
    const index = students.findIndex((s) => s.rollNumber === updatedStudent.rollNumber)
    if (index !== -1) {
      students[index] = updatedStudent
      return updatedStudent
    }
    return null
  },
  deleteStudent: (rollNumber: string) => {
    const index = students.findIndex((s) => s.rollNumber === rollNumber)
    if (index !== -1) {
      students = students.filter((s) => s.rollNumber !== rollNumber)
      return true
    }
    return false
  },
  getApplications: () => applications,
  addApplication: (application: Application) => {
    applications.push(application)
    return application
  },
}
