"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { AdminPanel } from "@/components/admin-panel"
import Footer from "@/components/footer"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("/api/auth/check")
      const data = await response.json()
      if (!data.authenticated) {
        router.push("/login")
      } else {
        setIsAuthenticated(true)
      }
    }
    checkAuth()
  }, [router])

  if (!isAuthenticated) {
    return null // or a loading spinner
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
          <AdminPanel />
        </div>
      </main>
      <Footer />
    </div>
  )
}
