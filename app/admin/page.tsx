import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminApplicationTable } from "@/components/admin-application-table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, Settings, Users, BarChart3 } from "lucide-react"
import { Footer } from "@/components/footer"
import { ThemeToggle } from "@/components/theme-toggle"
import { AKITLogo } from "@/components/akit-logo"

export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <AKITLogo />
            <span>Admin Dashboard</span>
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
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage student leave applications</p>
            <img
              src="/images/admin-dashboard.png"
              alt="Admin Dashboard"
              className="mt-4 rounded-lg w-full max-w-3xl object-cover"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">124</div>
                <p className="text-xs text-muted-foreground">This semester</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">Requires manual review</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Auto-Approved</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87</div>
                <p className="text-xs text-muted-foreground">Based on 75% criteria</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Auto-Rejected</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">19</div>
                <p className="text-xs text-muted-foreground">Below 75% attendance</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Leave Applications</CardTitle>
              <CardDescription>Review and manage student leave applications</CardDescription>
              <div className="flex items-center gap-4 pt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search by student name or ID..." className="pl-8" />
                </div>
                <Button>Export</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="approved">Approved</TabsTrigger>
                  <TabsTrigger value="rejected">Rejected</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                  <AdminApplicationTable />
                </TabsContent>
                <TabsContent value="pending">
                  <AdminApplicationTable filter="pending" />
                </TabsContent>
                <TabsContent value="approved">
                  <AdminApplicationTable filter="approved" />
                </TabsContent>
                <TabsContent value="rejected">
                  <AdminApplicationTable filter="rejected" />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Student Management</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 rounded-lg border p-4 w-full">
                    <h3 className="mb-2 font-medium">Student Directory</h3>
                    <p className="text-sm text-muted-foreground">
                      Manage all students in the system, view profiles, and control access.
                    </p>
                  </div>
                  <Button className="w-full" asChild>
                    <Link href="/admin/students">Manage Students</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Analytics Dashboard</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 rounded-lg border p-4 w-full">
                    <h3 className="mb-2 font-medium">System Analytics</h3>
                    <p className="text-sm text-muted-foreground">
                      View detailed analytics on leave applications, attendance trends, and system usage.
                    </p>
                  </div>
                  <Button className="w-full" asChild>
                    <Link href="/admin/analytics">View Analytics</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">System Settings</CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 rounded-lg border p-4 w-full">
                    <h3 className="mb-2 font-medium">Configuration</h3>
                    <p className="text-sm text-muted-foreground">
                      Configure attendance thresholds, leave limits, and other system parameters.
                    </p>
                  </div>
                  <Button className="w-full" asChild>
                    <Link href="/admin/settings">Configure System</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Configure the automatic approval system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="attendance-threshold">Attendance Threshold (%)</Label>
                  <Input id="attendance-threshold" type="number" defaultValue="75" />
                  <p className="text-sm text-muted-foreground">
                    Applications will be automatically approved if student attendance is above this threshold
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-leave-days">Maximum Leave Days Per Semester</Label>
                  <Input id="max-leave-days" type="number" defaultValue="15" />
                  <p className="text-sm text-muted-foreground">
                    Maximum number of leave days allowed per student per semester
                  </p>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button>Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

