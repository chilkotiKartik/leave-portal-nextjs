"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Footer } from "@/components/footer"
import { ArrowLeft, Download, BarChart3, PieChart, LineChart, Calendar } from "lucide-react"
import { useLeaveStore } from "@/lib/store"
import { AKITLogo } from "@/components/akit-logo"

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("month")
  const { leaveApplications } = useLeaveStore()

  // Calculate statistics
  const totalApplications = leaveApplications.length
  const approvedApplications = leaveApplications.filter((app) => app.status === "approved").length
  const pendingApplications = leaveApplications.filter((app) => app.status === "pending").length
  const rejectedApplications = leaveApplications.filter((app) => app.status === "rejected").length

  const approvalRate = totalApplications > 0 ? Math.round((approvedApplications / totalApplications) * 100) : 0

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <AKITLogo />
            <span>Admin Dashboard - Analytics</span>
          </div>
          <div className="flex items-center gap-4">
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
              <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            </div>
            <p className="text-muted-foreground">View detailed analytics and reports</p>
          </div>

          <div className="grid gap-6 md:grid-cols-4 mb-8">
            <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                <BarChart3 className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalApplications}</div>
                <p className="text-xs text-muted-foreground">All time</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Approved</CardTitle>
                <BarChart3 className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{approvedApplications}</div>
                <p className="text-xs text-muted-foreground">{approvalRate}% approval rate</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <BarChart3 className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingApplications}</div>
                <p className="text-xs text-muted-foreground">Awaiting review</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-red-500/10 to-red-500/5">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Rejected</CardTitle>
                <BarChart3 className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{rejectedApplications}</div>
                <p className="text-xs text-muted-foreground">Not approved</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview">
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="departments">Departments</TabsTrigger>
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-4">
                <select
                  className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="year">This Year</option>
                  <option value="all">All Time</option>
                </select>

                <Button variant="outline" className="gap-1">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Leave Applications Over Time</CardTitle>
                    <CardDescription>Number of applications by status</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center">
                    <div className="flex items-center justify-center h-full w-full bg-muted/20 rounded-md">
                      <LineChart className="h-16 w-16 text-muted-foreground/50" />
                      <span className="ml-2 text-muted-foreground">Line Chart Visualization</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Application Status Distribution</CardTitle>
                    <CardDescription>Breakdown by approval status</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px] flex items-center justify-center">
                    <div className="flex items-center justify-center h-full w-full bg-muted/20 rounded-md">
                      <PieChart className="h-16 w-16 text-muted-foreground/50" />
                      <span className="ml-2 text-muted-foreground">Pie Chart Visualization</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Leave Reasons Analysis</CardTitle>
                  <CardDescription>Most common reasons for leave applications</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <div className="flex items-center justify-center h-full w-full bg-muted/20 rounded-md">
                    <BarChart3 className="h-16 w-16 text-muted-foreground/50" />
                    <span className="ml-2 text-muted-foreground">Bar Chart Visualization</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="departments" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Applications by Department</CardTitle>
                  <CardDescription>Distribution of leave applications across departments</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px] flex items-center justify-center">
                  <div className="flex items-center justify-center h-full w-full bg-muted/20 rounded-md">
                    <BarChart3 className="h-16 w-16 text-muted-foreground/50" />
                    <span className="ml-2 text-muted-foreground">Bar Chart Visualization</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Department Approval Rates</CardTitle>
                  <CardDescription>Approval percentages by department</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <div className="flex items-center justify-center h-full w-full bg-muted/20 rounded-md">
                    <PieChart className="h-16 w-16 text-muted-foreground/50" />
                    <span className="ml-2 text-muted-foreground">Pie Chart Visualization</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="students" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Students by Leave Applications</CardTitle>
                  <CardDescription>Students with the most leave applications</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px] flex items-center justify-center">
                  <div className="flex items-center justify-center h-full w-full bg-muted/20 rounded-md">
                    <BarChart3 className="h-16 w-16 text-muted-foreground/50" />
                    <span className="ml-2 text-muted-foreground">Bar Chart Visualization</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Student Attendance vs. Leave Correlation</CardTitle>
                  <CardDescription>Relationship between attendance and leave applications</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <div className="flex items-center justify-center h-full w-full bg-muted/20 rounded-md">
                    <LineChart className="h-16 w-16 text-muted-foreground/50" />
                    <span className="ml-2 text-muted-foreground">Scatter Plot Visualization</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="calendar" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Leave Calendar Heatmap</CardTitle>
                  <CardDescription>Distribution of leaves across the calendar</CardDescription>
                </CardHeader>
                <CardContent className="h-[500px] flex items-center justify-center">
                  <div className="flex items-center justify-center h-full w-full bg-muted/20 rounded-md">
                    <Calendar className="h-16 w-16 text-muted-foreground/50" />
                    <span className="ml-2 text-muted-foreground">Calendar Heatmap Visualization</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}

