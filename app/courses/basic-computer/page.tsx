import { Header } from "@/components/header"
import Footer from "@/components/footer"

export default function BasicComputerCoursePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Basic Computer Course</h1>
          <p className="mb-4">
            Our Basic Computer Course is designed for beginners who want to build a strong foundation in computing. This
            course covers essential skills and knowledge to help you become comfortable with using computers in everyday
            life and work situations.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-4">Course Content:</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Introduction to Computer Hardware and Software</li>
            <li>Operating System Basics (Windows/Mac)</li>
            <li>File Management and Organization</li>
            <li>Internet Browsing and Online Safety</li>
            <li>Introduction to Microsoft Office (Word, Excel, PowerPoint)</li>
            <li>Email Communication</li>
            <li>Basic Troubleshooting</li>
          </ul>
          <p className="mt-6">Duration: 4 weeks (20 hours of instruction)</p>
          <p className="mt-2">For more information or to enroll, please contact our admissions office.</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
