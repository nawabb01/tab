"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "sonner"
import type { Student, Application } from "@/types/student"
import { Trash2, Pencil, Upload } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  fatherName: z.string().min(2, "Father's name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  course: z.string().min(1, "Please select a course"),
  startDate: z.string().min(1, "Start date is required"),
  issueDate: z.string().min(1, "Issue date is required"),
  rollNumber: z.string().min(1, "Roll number is required"),
})

const courseOptions = [
  { value: "Basic Computer Course", label: "Basic Computer Course" },
  { value: "Diploma in Computer Application (DCA)", label: "Diploma in Computer Application (DCA)" },
  {
    value: "Advanced Diploma in Computer Application (ADCA)",
    label: "Advanced Diploma in Computer Application (ADCA)",
  },
  { value: "Graphic Designing", label: "Graphic Designing" },
  { value: "Web Development", label: "Web Development" },
]

export function AdminPanel() {
  const [students, setStudents] = useState<Student[]>([])
  const [applications, setApplications] = useState<Application[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      fatherName: "",
      email: "",
      phoneNumber: "",
      course: "",
      startDate: "",
      issueDate: "",
      rollNumber: "",
    },
  })

  useEffect(() => {
    fetchStudents()
    fetchApplications()
  }, [])

  useEffect(() => {
    if (selectedStudent && isEditing) {
      form.reset(selectedStudent)
      if (selectedStudent.photoUrl) {
        setPhotoPreview(selectedStudent.photoUrl)
      }
    }
  }, [selectedStudent, isEditing, form])

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    try {
      const studentData = {
        ...values,
        photoUrl: photoPreview || "",
      }

      let response
      if (isEditing) {
        response = await fetch(`/api/students/${values.rollNumber}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(studentData),
        })
      } else {
        response = await fetch("/api/students", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(studentData),
        })
      }

      if (!response.ok) {
        throw new Error("Failed to submit")
      }

      toast.success(isEditing ? "Student updated successfully!" : "Student added successfully!")
      form.reset()
      setPhotoPreview(null)
      setIsDialogOpen(false)
      setIsEditing(false)
      setSelectedStudent(null)
      fetchStudents()
    } catch (error) {
      toast.error(isEditing ? "Failed to update student" : "Failed to add student")
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDelete(rollNumber: string) {
    try {
      const response = await fetch(`/api/students/${rollNumber}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete")
      }

      toast.success("Student deleted successfully!")
      fetchStudents()
    } catch (error) {
      toast.error("Failed to delete student")
    } finally {
      setIsDeleteDialogOpen(false)
      setSelectedStudent(null)
    }
  }

  async function fetchStudents() {
    try {
      const response = await fetch("/api/students")
      if (!response.ok) throw new Error("Failed to fetch students")
      const data = await response.json()
      setStudents(data)
    } catch (error) {
      toast.error("Failed to fetch students")
    }
  }

  async function fetchApplications() {
    try {
      const response = await fetch("/api/applications")
      if (!response.ok) throw new Error("Failed to fetch applications")
      const data = await response.json()
      setApplications(data)
    } catch (error) {
      toast.error("Failed to fetch applications")
    }
  }

  function handleEdit(student: Student) {
    setSelectedStudent(student)
    setIsEditing(true)
    setIsDialogOpen(true)
  }

  function handleAdd() {
    form.reset()
    setPhotoPreview(null)
    setIsEditing(false)
    setSelectedStudent(null)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="students" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-white border">
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="website">Website</TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Student Management</h2>
            <Button onClick={handleAdd} className="bg-primary hover:bg-primary/90">
              Add New Student
            </Button>
          </div>

          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
              setIsDialogOpen(open)
              if (!open) {
                setIsEditing(false)
                setSelectedStudent(null)
                setPhotoPreview(null)
                form.reset()
              }
            }}
          >
            <DialogContent className="sm:max-w-[600px] max-h-[95vh] overflow-hidden flex flex-col">
              <div className="overflow-y-auto max-h-[calc(95vh-120px)]">
                <DialogHeader className="sticky top-0 bg-white pb-4 border-b">
                  <DialogTitle>{isEditing ? "Edit Student" : "Add New Student"}</DialogTitle>
                  <DialogDescription>
                    {isEditing ? "Edit student details" : "Enter student details to add them to the system"}
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4">
                    <FormItem>
                      <FormLabel>Student Photo</FormLabel>
                      <div className="flex gap-4">
                        {photoPreview && (
                          <div className="relative">
                            <img
                              src={photoPreview || "/placeholder.svg"}
                              alt="Preview"
                              className="w-24 h-32 object-cover rounded border"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <FormControl>
                            <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed rounded cursor-pointer hover:bg-gray-50">
                              <Upload className="h-4 w-4" />
                              <span>Upload Photo</span>
                              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                            </label>
                          </FormControl>
                          <p className="text-xs text-gray-500 mt-2">JPG, PNG (Max 5MB)</p>
                        </div>
                      </div>
                    </FormItem>

                    <FormField
                      control={form.control}
                      name="rollNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Roll Number</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., GNI202401" {...field} disabled={isEditing} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="fatherName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Father's Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter father's name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="Enter phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="course"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Course</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a course" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {courseOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="issueDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Issue Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2"
                      disabled={isLoading}
                    >
                      {isLoading
                        ? isEditing
                          ? "Updating..."
                          : "Adding..."
                        : isEditing
                          ? "✓ Update Student"
                          : "✓ Add Student"}
                    </Button>
                  </form>
                </Form>
              </div>
            </DialogContent>
          </Dialog>

          <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the student's record.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() => selectedStudent && handleDelete(selectedStudent.rollNumber)}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <div className="rounded-lg border bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Roll Number</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Father's Name</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.rollNumber}>
                    <TableCell className="font-medium">{student.rollNumber}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.fatherName}</TableCell>
                    <TableCell className="max-w-xs truncate text-sm">{student.course}</TableCell>
                    <TableCell>{student.startDate}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" onClick={() => handleEdit(student)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                          onClick={() => {
                            setSelectedStudent(student)
                            setIsDeleteDialogOpen(true)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="applications" className="space-y-6">
          <h2 className="text-2xl font-semibold">Course Applications</h2>
          <div className="rounded-lg border bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Course</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.length > 0 ? (
                  applications.map((application, index) => (
                    <TableRow key={index}>
                      <TableCell>{application.name}</TableCell>
                      <TableCell>{application.email}</TableCell>
                      <TableCell>{application.phone}</TableCell>
                      <TableCell>{application.course}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                      No applications yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="website" className="space-y-6">
          <h2 className="text-2xl font-semibold">Website Content Management</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Add New Course</CardTitle>
                <CardDescription>Add courses to the available options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Course Name" />
                <Input placeholder="Course Description" />
                <Input type="number" placeholder="Course Duration (months)" />
                <Button className="w-full">Add Course</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Manage Gallery</CardTitle>
                <CardDescription>Upload images to the website gallery</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed rounded cursor-pointer hover:bg-gray-50">
                  <Upload className="h-4 w-4" />
                  <span>Upload Gallery Image</span>
                  <input type="file" accept="image/*" className="hidden" />
                </label>
                <Button variant="outline" className="w-full bg-transparent">
                  View Gallery
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Manage Reviews</CardTitle>
                <CardDescription>Add student reviews and testimonials</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Student Name" />
                <Input placeholder="Review Text" />
                <Input type="number" placeholder="Rating (1-5)" max="5" min="1" />
                <Button className="w-full">Add Review</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Website Settings</CardTitle>
                <CardDescription>Manage basic website information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Institute Name" defaultValue="Guru Nanak Institute" />
                <Input placeholder="Contact Email" />
                <Input placeholder="Contact Phone" />
                <Button className="w-full">Save Settings</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
