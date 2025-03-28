"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Clock, FileText, PieChart, User, Calendar, MessageSquare, Bell, RefreshCw } from "lucide-react"
import { ApplicationTable } from "@/components/application-table"
import { EnhancedAttendanceChart } from "@/components/enhanced-attendance-chart"
import { Footer } from "@/components/footer"
import { ImprovedHeader } from "@/components/improved-header"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useLeaveStore } from "@/lib/store"
import { PublicApprovedLeaves } from "@/components/public-approved-leaves"
import { useAuthStore } from "@/lib/auth"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [refreshKey, setRefreshKey] = useState(0)
  const { getTodaysApprovedLeaves } = useLeaveStore()
  const { user, isAuthenticated } = useAuthStore()
  const router = useRouter()

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push("/login")
    }
  }, [isAuthenticated, user, router])

  // Force refresh when component mounts to ensure we have the latest data
  useEffect(() => {
    // This is just to trigger a re-render when the component mounts
  }, [refreshKey])

  if (!user) {
    return null // Don't render anything while checking authentication
  }

  return (
    <div className="flex min-h-screen flex-col">
      <ImprovedHeader />
      <main className="flex-1">
        <div className="container py-6">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Student Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {user.name}</p>
            </div>
            <Button variant="outline" className="gap-1" onClick={() => setRefreshKey((prev) => prev + 1)}>
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Current Attendance</CardTitle>
                <PieChart className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user.attendance}%</div>
                <Progress value={user.attendance} className="h-2 mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  {user.attendance >= 75
                    ? "You are eligible for automatic approval"
                    : "Below threshold for automatic approval"}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
                <Clock className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">Awaiting processing</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-accent/10 to-accent/5">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Approved Applications</CardTitle>
                <FileText className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">In the current semester</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-muted/50 to-muted/30">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Leave Days Used</CardTitle>
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {user.leavesTaken}/{user.maxLeaves}
                </div>
                <Progress value={(user.leavesTaken / user.maxLeaves) * 100} className="h-2 mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  {user.maxLeaves - user.leavesTaken} days remaining this semester
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 lg:w-auto">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
                <TabsTrigger value="attendance">Attendance</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6 mt-6">
                <div className="grid gap-6 md:grid-cols-7">
                  <Card className="md:col-span-4">
                    <CardHeader>
                      <CardTitle>Students on Approved Leave Today</CardTitle>
                      <CardDescription>Students who are on approved leave today</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <PublicApprovedLeaves />
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/dashboard/calendar">View Full Calendar</Link>
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="md:col-span-3">
                    <CardHeader>
                      <CardTitle>Your Profile</CardTitle>
                      <CardDescription>Quick overview of your information</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center text-center">
                      <Avatar className="h-24 w-24 mb-4">
                        <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="text-xl font-bold">{user.name}</h3>
                      <p className="text-muted-foreground">{user.id}</p>
                      <div className="flex gap-2 mt-2">
                        <Badge>{user.department}</Badge>
                        <Badge variant="outline">Semester {user.semester}</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 w-full mt-6">
                        <div className="flex flex-col items-center p-3 rounded-lg bg-muted/50">
                          <span className="text-sm text-muted-foreground">Attendance</span>
                          <span className="text-xl font-bold">{user.attendance}%</span>
                        </div>
                        <div className="flex flex-col items-center p-3 rounded-lg bg-muted/50">
                          <span className="text-sm text-muted-foreground">Leave Balance</span>
                          <span className="text-xl font-bold">{user.maxLeaves - user.leavesTaken}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" asChild>
                        <Link href="/dashboard/profile">View Full Profile</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Announcements</CardTitle>
                      <CardDescription>Latest updates from administration</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="bg-primary/10 p-2 rounded-full mt-0.5">
                            <Bell className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">Exam Schedule Released</h4>
                            <p className="text-sm text-muted-foreground">
                              The final exam schedule for this semester has been published.
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="bg-secondary/10 p-2 rounded-full mt-0.5">
                            <Bell className="h-4 w-4 text-secondary" />
                          </div>
                          <div>
                            <h4 className="font-medium">Campus Maintenance</h4>
                            <p className="text-sm text-muted-foreground">
                              The library will be closed this weekend for maintenance.
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/dashboard/social">View All Announcements</Link>
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Leaves</CardTitle>
                      <CardDescription>Your scheduled leaves</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="bg-accent/10 p-2 rounded-full mt-0.5">
                            <Calendar className="h-4 w-4 text-accent" />
                          </div>
                          <div>
                            <h4 className="font-medium">Medical Appointment</h4>
                            <p className="text-sm text-muted-foreground">Apr 10 - Apr 12, 2024</p>
                            <Badge className="mt-1 bg-green-500">Approved</Badge>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="bg-muted p-2 rounded-full mt-0.5">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div>
                            <h4 className="font-medium">Family Function</h4>
                            <p className="text-sm text-muted-foreground">May 5 - May 7, 2024</p>
                            <Badge variant="outline" className="mt-1">
                              Pending
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" asChild>
                        <Link href="/dashboard/calendar">View Calendar</Link>
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                      <CardDescription>Common tasks and links</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-2">
                        <Button className="w-full justify-start" asChild>
                          <Link href="/apply">
                            <FileText className="mr-2 h-4 w-4" />
                            Apply for Leave
                          </Link>
                        </Button>
                        <Button variant="outline" className="w-full justify-start" asChild>
                          <Link href="/dashboard/profile">
                            <User className="mr-2 h-4 w-4" />
                            Update Profile
                          </Link>
                        </Button>
                        <Button variant="outline" className="w-full justify-start" asChild>
                          <Link href="/dashboard/social">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Community Feed
                          </Link>
                        </Button>
                        <Button variant="outline" className="w-full justify-start" asChild>
                          <Link href="/help">
                            <Bell className="mr-2 h-4 w-4" />
                            Help & Support
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="applications" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Leave Applications</CardTitle>
                    <CardDescription>View and manage your leave applications</CardDescription>
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
                        <ApplicationTable />
                      </TabsContent>
                      <TabsContent value="pending">
                        <ApplicationTable filter="pending" />
                      </TabsContent>
                      <TabsContent value="approved">
                        <ApplicationTable filter="approved" />
                      </TabsContent>
                      <TabsContent value="rejected">
                        <ApplicationTable filter="rejected" />
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                  <CardFooter>
                    <Button asChild>
                      <Link href="/apply">Apply for New Leave</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="attendance" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Attendance Overview</CardTitle>
                    <CardDescription>Your attendance for the current semester</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <EnhancedAttendanceChart />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

