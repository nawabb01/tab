import { Header } from "@/components/header"
import { SignUpForm } from "@/components/signup-form"
import Footer from "@/components/footer"

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Sign Up for Courses</h1>
          <SignUpForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}
