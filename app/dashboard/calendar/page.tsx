import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CalendarView } from "@/components/calendar-view"
import { Footer } from "@/components/footer"
import { NotificationBell } from "@/components/notification-bell"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowLeft } from "lucide-react"

export default function CalendarPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <img src="/images/logo.png" alt="Logo" className="h-8 w-8" />
            <span className="hidden sm:inline-block">Student Leave Application System</span>
            <span className="sm:hidden">SLAS</span>
          </div>
          <div className="flex items-center gap-4">
            <NotificationBell />
            <ThemeToggle />
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                Dashboard
              </Button>
            </Link>
            <Link href="/apply">
              <Button size="sm">Apply for Leave</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">
          <div className="mb-8">
            <div className="flex items-center gap-2">
              <Link href="/dashboard">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h1 className="text-3xl font-bold">Leave Calendar</h1>
            </div>
            <p className="text-muted-foreground">View and manage your leave schedule</p>
          </div>

          <div className="grid gap-6">
            <CalendarView />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

