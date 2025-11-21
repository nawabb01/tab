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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import type { Student, Application } from "@/types/student"
import { Trash2, Pencil } from "lucide-react"

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
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    email: "",
    phoneNumber: "",
    course: "",
    startDate: "",
    issueDate: "",
    rollNumber: "",
  })

  useEffect(() => {
    fetchStudents()
    fetchApplications()
  }, [])

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

  const fetchStudents = async () => {
    try {
      const response = await fetch("/api/students")
      const data = await response.json()
      setStudents(data)
    } catch (error) {
      console.error("Error fetching students:", error)
      toast.error("Failed to load students")
    }
  }

  const fetchApplications = async () => {
    try {
      const response = await fetch("/api/applications")
      const data = await response.json()
      setApplications(data)
    } catch (error) {
      console.error("Error fetching applications:", error)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const payload = {
        ...formData,
        photoUrl: photoPreview || selectedStudent?.photoUrl || "",
      }

      const response = await fetch(
        isEditing && selectedStudent ? `/api/students/${selectedStudent.id}` : "/api/students",
        {
          method: isEditing && selectedStudent ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      )

      if (response.ok) {
        toast.success(isEditing ? "Student updated successfully" : "Student added successfully")
        await fetchStudents()
        setIsDialogOpen(false)
        setIsEditing(false)
        setSelectedStudent(null)
        setPhotoPreview(null)
        setFormData({
          name: "",
          fatherName: "",
          email: "",
          phoneNumber: "",
          course: "",
          startDate: "",
          issueDate: "",
          rollNumber: "",
        })
      } else {
        toast.error("Failed to save student")
      }
    } catch (error) {
      console.error("Error saving student:", error)
      toast.error("Error saving student")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (student: Student) => {
    setSelectedStudent(student)
    setIsEditing(true)
    setFormData({
      name: student.name,
      fatherName: student.fatherName,
      email: student.email,
      phoneNumber: student.phoneNumber,
      course: student.course,
      startDate: student.startDate,
      issueDate: student.issueDate,
      rollNumber: student.rollNumber,
    })
    setPhotoPreview(student.photoUrl || null)
    setIsDialogOpen(true)
  }

  const handleDelete = async () => {
    if (!selectedStudent) return

    try {
      const response = await fetch(`/api/students/${selectedStudent.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast.success("Student deleted successfully")
        await fetchStudents()
        setIsDeleteDialogOpen(false)
        setSelectedStudent(null)
      } else {
        toast.error("Failed to delete student")
      }
    } catch (error) {
      console.error("Error deleting student:", error)
      toast.error("Error deleting student")
    }
  }

  const handleOpenDialog = () => {
    setIsEditing(false)
    setSelectedStudent(null)
    setPhotoPreview(null)
    setFormData({
      name: "",
      fatherName: "",
      email: "",
      phoneNumber: "",
      course: "",
      startDate: "",
      issueDate: "",
      rollNumber: "",
    })
    setIsDialogOpen(true)
  }

  return (
    <div className="w-full h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 p-6">
      <Tabs defaultValue="students" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="website">Website</TabsTrigger>
        </TabsList>

        {/* Students Tab */}
        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle>Student Management</CardTitle>
              <CardDescription>Manage all enrolled students</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleOpenDialog} className="mb-4 bg-emerald-600 hover:bg-emerald-700">
                Add New Student
              </Button>

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Roll Number</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.rollNumber}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>{student.phoneNumber}</TableCell>
                        <TableCell>{student.course}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(student)}
                              className="text-blue-600"
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedStudent(student)
                                setIsDeleteDialogOpen(true)
                              }}
                              className="text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Applications Tab */}
        <TabsContent value="applications">
          <Card>
            <CardHeader>
              <CardTitle>Course Applications</CardTitle>
              <CardDescription>View all course applications</CardDescription>
            </CardHeader>
            <CardContent>
              {applications.length === 0 ? (
                <p className="text-gray-500">No applications yet</p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {applications.map((app) => (
                        <TableRow key={app.id}>
                          <TableCell className="font-medium">{app.name}</TableCell>
                          <TableCell>{app.email}</TableCell>
                          <TableCell>{app.course}</TableCell>
                          <TableCell>{app.phoneNumber}</TableCell>
                          <TableCell>
                            <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded text-sm">Pending</span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Website Tab */}
        <TabsContent value="website">
          <Card>
            <CardHeader>
              <CardTitle>Website Content</CardTitle>
              <CardDescription>Manage website content and settings</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Website content management coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add/Edit Student Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Student" : "Add New Student"}</DialogTitle>
            <DialogDescription>
              {isEditing ? "Update student information" : "Add a new student to the system"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Roll Number</label>
                <Input
                  value={formData.rollNumber}
                  onChange={(e) => handleInputChange("rollNumber", e.target.value)}
                  placeholder="GNI202401"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Student Name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Father's Name</label>
                <Input
                  value={formData.fatherName}
                  onChange={(e) => handleInputChange("fatherName", e.target.value)}
                  placeholder="Father's Name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="email@example.com"
                  type="email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <Input
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  placeholder="9876543210"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Course</label>
                <Select value={formData.course} onValueChange={(value) => handleInputChange("course", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courseOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Start Date</label>
                <Input
                  value={formData.startDate}
                  onChange={(e) => handleInputChange("startDate", e.target.value)}
                  placeholder="DD-MM-YYYY"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Issue Date</label>
                <Input
                  value={formData.issueDate}
                  onChange={(e) => handleInputChange("issueDate", e.target.value)}
                  placeholder="DD-MM-YYYY"
                  required
                />
              </div>
            </div>

            {/* Photo Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Student Photo</label>
              <div className="flex items-center gap-4">
                <Input type="file" accept="image/*" onChange={handlePhotoUpload} className="flex-1" />
                {photoPreview && (
                  <div className="w-24 h-24 rounded border">
                    <img
                      src={photoPreview || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsDialogOpen(false)
                  setIsEditing(false)
                }}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading} className="bg-emerald-600 hover:bg-emerald-700">
                {isLoading ? "Saving..." : isEditing ? "Update Student" : "Add Student"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Student</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedStudent?.name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
