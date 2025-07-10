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
    photoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pawan.jpg-U5ScI3MWBUajlofqPvtI2yImm14jD9.jpeg",
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
    photoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Parmod.jpg-JcK0Hn8U8V7wif2t0HSOgNmT1IFwLy.jpeg",
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
    photoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gagan.jpg-7yUWIDuEPNchJKwDS23Af7HNO7VPWg.jpeg",
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
    photoUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sukhdeep.jpg-5leEGmXJ0efvkH2rq6iwlKCnsppamH.jpeg",
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
    photoUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ramandeep.jpg-7EGZZHUkW3GgJ5w0jOHQHA2mwV2TX6.jpeg",
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
    photoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/joban.jpg-PKpvGy5IXSk1hSzwLA37QdA9qzJ9wF.jpeg",
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
    photoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sharn.jpg-iRzGTXW3zOjWQLViFvCMU5ahjsLlyJ.jpeg",
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
    photoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mandeep.jpg-C65Gd4wpx9FtCw9ct99sOpvTktb9Oz.jpeg",
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
    photoUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kawal.jpg-XRRdc4CG5dNdNSAg6jpaWnZOKjmVcT.jpeg",
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
