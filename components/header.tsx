"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCoursesOpen, setIsCoursesOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const toggleCourses = () => setIsCoursesOpen(!isCoursesOpen)

  const courses = [
    { name: "Basic Computer Course", href: "/courses/basic-computer" },
    { name: "Diploma in Computer Application", href: "/courses/dca" },
    { name: "Advance Diploma in Computer Application", href: "/courses/adca" },
    { name: "Graphic Designing", href: "/courses/graphic-design" },
    { name: "Web Development", href: "/courses/web-dev" },
  ]

  return (
    <header className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/guru-J3AHbJnONahkgNkexW9Bpel7LHKygV.png"
              alt="Guru Nanak Institute Logo"
              width={48}
              height={48}
              className="rounded-full"
            />
            <span className="font-bold text-xl">Gurunanak Institute</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-white/80">
              Home
            </Link>
            <Link href="/about" className="hover:text-white/80">
              About
            </Link>
            <div className="relative group">
              <button className="hover:text-white/80 flex items-center">
                Courses <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300 ease-in-out bg-white shadow-lg rounded-md overflow-hidden">
                {courses.map((course) => (
                  <Link
                    key={course.href}
                    href={course.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {course.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/verify" className="hover:text-white/80">
              Certificate Verification
            </Link>
            <Link href="/signup">
              <Button variant="secondary">Sign Up</Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <Button variant="ghost" className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-4">
            <Link href="/" className="block hover:text-white/80">
              Home
            </Link>
            <Link href="/about" className="block hover:text-white/80">
              About
            </Link>
            <div>
              <button onClick={toggleCourses} className="flex items-center justify-between w-full hover:text-white/80">
                Courses
                {isCoursesOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
              {isCoursesOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  {courses.map((course) => (
                    <Link key={course.href} href={course.href} className="block hover:text-white/80">
                      {course.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/verify" className="block hover:text-white/80">
              Certificate Verification
            </Link>
            <Link href="/signup" className="block">
              <Button variant="secondary" className="w-full">
                Sign Up
              </Button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
