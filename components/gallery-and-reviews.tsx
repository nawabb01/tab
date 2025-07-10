import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const reviews = [
  {
    id: "1",
    studentName: "Priya Sharma",
    content:
      "The computer courses at GNI are excellent! The practical training helped me secure a job right after completion.",
    rating: 5,
    course: "Diploma in Computer Application",
  },
  {
    id: "2",
    studentName: "Rajesh Kumar",
    content: "Great learning environment with modern facilities. The teachers are very supportive and knowledgeable.",
    rating: 5,
    course: "Web Development",
  },
  {
    id: "3",
    studentName: "Anjali Patel",
    content: "The graphic design course was exactly what I needed to start my freelance career. Highly recommended!",
    rating: 4,
    course: "Graphic Designing",
  },
]

const galleryImages = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image1.jpg-VYPAZ2fQLeUqeMwMtQ8NeLu1iS2fBN.jpeg",
    alt: "Computer Lab Training Session",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image2.jpg-oyj03Cx3JSj2Xbv0SDbjWeRaXEmBsq.jpeg",
    alt: "Students Learning Computer Skills",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image5.jpg-iNzX682PTePmCSf7uCaE066KiT5qJI.jpeg",
    alt: "Interactive Learning Environment",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image4.jpg-bYFGeTa9fizni2c5Dwe7aSImKsnZbC.jpeg",
    alt: "Professional Computer Training",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image3.jpg-PGTdJm1BhhwhoAVKBvVnAI8WBM6ZHj.jpeg",
    alt: "Student Events and Celebrations",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image6.jpg-0fWF2asDPPGKiw4qMLerrM2NZWqUQ3.jpeg",
    alt: "Focused Learning Environment",
  },
]

export function GalleryAndReviews() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Campus Gallery & Student Reviews</h2>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {galleryImages.map((image, i) => (
            <div key={i} className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        {/* Reviews */}
        <h3 className="text-2xl font-bold text-center mb-8">Student Reviews</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">{review.content}</p>
                <div className="text-sm text-gray-500">
                  <p className="font-medium">{review.studentName}</p>
                  <p>{review.course}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
