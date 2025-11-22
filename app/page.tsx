import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { GalleryAndReviews } from "@/components/gallery-and-reviews"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <GalleryAndReviews />
      <Footer />
    </div>
  )
}
