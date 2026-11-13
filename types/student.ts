export interface Student {
  id?: string
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
  id?: string
  name: string
  email: string
  phone?: string
  phoneNumber?: string
  course: string
}
