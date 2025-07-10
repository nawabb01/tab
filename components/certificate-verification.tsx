"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import type { Student } from "@/types/student"

export function CertificateVerification() {
  const [rollNumber, setRollNumber] = useState("")
  const [student, setStudent] = useState<Student | null>(null)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setStudent(null)

    try {
      const response = await fetch(`/api/verify?rollNumber=${rollNumber.trim()}`)
      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Failed to verify certificate")
        setStudent(null)
      } else {
        setStudent(data)
        setError("")
      }
    } catch (err) {
      setError("Failed to verify certificate. Please try again.")
      setStudent(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      {" "}
      {/* Increased max-width */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <Input
            type="text"
            placeholder="Enter Your Roll No "
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Verify"}
          </Button>
        </div>
      </form>
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600">
          <AlertCircle className="h-5 w-5" />
          <p>{error}</p>
        </div>
      )}
      {student && (
        <Card className="mt-6">
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <CardTitle>Certificate Verified Successfully</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Student Photo */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative w-48 h-48 rounded-lg overflow-hidden border-2 border-gray-200">
                  <Image
                    src={student.photoUrl || "/placeholder.svg"}
                    alt={`Photo of ${student.name}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <p className="text-lg font-semibold text-center">{student.name}</p>
              </div>

              {/* Student Details */}
              <div className="md:col-span-2">
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                  {" "}
                  {/* Increased gap */}
                  <div className="space-y-1">
                    <dt className="text-sm font-medium text-gray-500">Roll Number</dt>
                    <dd className="text-base">{student.rollNumber}</dd>
                  </div>
                  <div className="space-y-1">
                    <dt className="text-sm font-medium text-gray-500">Father's Name</dt>
                    <dd className="text-base">{student.fatherName}</dd>
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    {" "}
                    {/* Full width for email */}
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="text-base break-all">{student.email}</dd> {/* Added break-all */}
                  </div>
                  <div className="space-y-1">
                    <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
                    <dd className="text-base">{student.phoneNumber}</dd>
                  </div>
                  <div className="space-y-1">
                    <dt className="text-sm font-medium text-gray-500">Course</dt>
                    <dd className="text-base">{student.course}</dd>
                  </div>
                  <div className="space-y-1">
                    <dt className="text-sm font-medium text-gray-500">Start Date</dt>
                    <dd className="text-base">{student.startDate}</dd>
                  </div>
                  <div className="space-y-1">
                    <dt className="text-sm font-medium text-gray-500">Issue Date</dt>
                    <dd className="text-base">{student.issueDate}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
