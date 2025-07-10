"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function Hero() {
  const router = useRouter()

  return (
    <section className="relative h-[600px] flex items-center justify-center">
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner.jpg-f00fOXXmm4INJZRMiR0e1lRjM0Qw4b.jpeg"
        alt="Modern Computer Setup"
        fill
        className="object-cover brightness-50"
        priority
      />
      <div className="relative z-10 text-center text-white space-y-6 max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold">Welcome to Guru Nanak Institute</h1>
        <p className="text-lg md:text-xl">Empowering minds through quality education and practical learning</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="default" className="bg-primary hover:bg-primary/90">
            Explore Courses
          </Button>
          <Button
            size="lg"
            variant="secondary"
            className="bg-white text-primary hover:bg-gray-100"
            onClick={() => router.push("/about")}
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  )
}
