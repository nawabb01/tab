import { Header } from "@/components/header"
import { CertificateVerification } from "@/components/certificate-verification"
import Footer from "@/components/footer"

export default function VerifyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8">Certificate Verification</h1>
          <CertificateVerification />
        </div>
      </main>
      <Footer />
    </div>
  )
}
