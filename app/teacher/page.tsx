import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Footer } from "@/components/footer"
import { LeaveTable } from "@/components/leave-table"
import { TeacherView } from "@/components/teacher-view"
import { AKITLogo } from "@/components/akit-logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"
import Link from "next/link"

export default function TeacherDashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <AKITLogo />
            <span>Teacher Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/">
              <Button variant="ghost" size="sm">
                Home
              </Button>
            </Link>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
              <span className="sr-only">Settings</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
            <p className="text-muted-foreground">View student attendance and manage leave applications</p>
            <img
              src="/images/teacher-dashboard.png"
              alt="Teacher Dashboard"
              className="mt-4 rounded-lg w-full max-w-3xl object-cover shadow-md"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">125</div>
                <p className="text-xs text-muted-foreground">Across all classes</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">On Leave Today</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">Approved absences</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-accent/10 to-accent/5">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">84%</div>
                <p className="text-xs text-muted-foreground">This semester</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Students on Leave Today</CardTitle>
              <CardDescription>Students who are on approved leave for today</CardDescription>
            </CardHeader>
            <CardContent>
              <LeaveTable filter="today" />
            </CardContent>
          </Card>

          <TeacherView />
        </div>
      </main>
      <Footer />
    </div>
  )
}

