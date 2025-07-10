"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if user is authenticated
    // This is a placeholder. In a real app, you'd check against your authentication system
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check")
        if (response.ok) {
          setIsAuthenticated(true)
        } else {
          router.push("/login") // Redirect to login if not authenticated
        }
      } catch (error) {
        console.error("Auth check failed", error)
        router.push("/login")
      }
    }

    checkAuth()
  }, [router])

  if (!isAuthenticated) {
    return null // or a loading spinner
  }

  return <>{children}</>
}
