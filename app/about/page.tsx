import { Header } from "@/components/header"
import Footer from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">About Guru Nanak Institute</h1>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-primary">Our Mission</h2>
              <p className="text-gray-600">
                At Guru Nanak Institute, we are committed to providing quality education and practical training in
                computer science and technology. Our mission is to empower students with the skills they need to succeed
                in today's digital world.
              </p>

              <h2 className="text-2xl font-semibold text-primary pt-4">Why Choose Us?</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Experienced and qualified faculty</li>
                <li>Modern computer labs with latest equipment</li>
                <li>Practical, hands-on training</li>
                <li>Industry-relevant curriculum</li>
                <li>Placement assistance</li>
                <li>Affordable fee structure</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-primary">Our Courses</h2>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">Basic Computer Course</h3>
                  <p className="text-gray-600">
                    Perfect for beginners looking to build a strong foundation in computing.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">Diploma in Computer Application</h3>
                  <p className="text-gray-600">Comprehensive program covering essential computer applications.</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">Advanced Diploma in Computer Application</h3>
                  <p className="text-gray-600">Advanced topics for those seeking to enhance their technical skills.</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">Graphic Designing</h3>
                  <p className="text-gray-600">Creative course focusing on digital design and visual communication.</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">Web Development</h3>
                  <p className="text-gray-600">Learn to build modern, responsive websites and web applications.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
