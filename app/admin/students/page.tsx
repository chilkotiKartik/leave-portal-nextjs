import Link from "next/link"
import { Button } from "@/components/ui/button"
import { StudentDirectory } from "@/components/student-directory"
import { Footer } from "@/components/footer"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowLeft } from "lucide-react"

export default function StudentsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <span>Admin Dashboard - Student Management</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/admin">
              <Button variant="ghost" size="sm">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">
          <div className="mb-8">
            <div className="flex items-center gap-2">
              <Link href="/admin">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h1 className="text-3xl font-bold">Student Management</h1>
            </div>
            <p className="text-muted-foreground">View and manage all students in the system</p>
          </div>

          <div className="grid gap-6">
            <StudentDirectory />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

