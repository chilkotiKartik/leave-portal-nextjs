"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { StudentProfile } from "@/components/student-profile"
import { Footer } from "@/components/footer"
import { ArrowLeft } from "lucide-react"
import { useAuthStore } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { ImprovedHeader } from "@/components/improved-header"

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuthStore()
  const router = useRouter()

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push("/login")
    }
  }, [isAuthenticated, user, router])

  if (!user) {
    return null // Don't render anything while checking authentication
  }

  return (
    <div className="flex min-h-screen flex-col">
      <ImprovedHeader />
      <main className="flex-1">
        <div className="container py-6">
          <div className="mb-8">
            <div className="flex items-center gap-2">
              <Link href="/dashboard">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h1 className="text-3xl font-bold">My Profile</h1>
            </div>
            <p className="text-muted-foreground">View and manage your personal information</p>
          </div>

          <div className="grid gap-6">
            <StudentProfile student={user} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

