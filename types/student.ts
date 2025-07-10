export interface Student {
  rollNumber: string
  name: string
  fatherName: string
  email: string
  phoneNumber: string
  course: string
  startDate: string
  issueDate: string
  photoUrl?: string
}

export interface Application {
  name: string
  email: string
  phone: string
  course: string
}
