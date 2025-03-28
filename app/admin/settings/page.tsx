"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Footer } from "@/components/footer"
import { ArrowLeft, Save } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { AKITLogo } from "@/components/akit-logo"

export default function SettingsPage() {
  const [attendanceThreshold, setAttendanceThreshold] = useState("75")
  const [maxLeaveDays, setMaxLeaveDays] = useState("15")
  const [maxLeavesPerWeek, setMaxLeavesPerWeek] = useState("3")
  const [autoApproval, setAutoApproval] = useState(true)
  const [notifyTeachers, setNotifyTeachers] = useState(true)
  const [notifyStudents, setNotifyStudents] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { toast } = useToast()

  const handleSaveSettings = () => {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)

      toast({
        title: "Settings Saved",
        description: "System settings have been updated successfully.",
        variant: "default",
      })
    }, 1000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <AKITLogo />
            <span>Admin Dashboard - System Settings</span>
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
              <h1 className="text-3xl font-bold">System Settings</h1>
            </div>
            <p className="text-muted-foreground">Configure the leave application system settings</p>
          </div>

          <Tabs defaultValue="general">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4">
                <TabsList className="flex flex-col h-auto p-0 bg-transparent">
                  <TabsTrigger value="general" className="justify-start px-4 py-2 h-10 data-[state=active]:bg-muted">
                    General Settings
                  </TabsTrigger>
                  <TabsTrigger
                    value="notifications"
                    className="justify-start px-4 py-2 h-10 data-[state=active]:bg-muted"
                  >
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger value="backup" className="justify-start px-4 py-2 h-10 data-[state=active]:bg-muted">
                    Backup & Export
                  </TabsTrigger>
                </TabsList>
              </div>
              <div className="flex-1">
                <TabsContent value="general" className="m-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>General Settings</CardTitle>
                      <CardDescription>Configure the core system parameters</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="attendance-threshold">Attendance Threshold (%)</Label>
                        <Input
                          id="attendance-threshold"
                          type="number"
                          value={attendanceThreshold}
                          onChange={(e) => setAttendanceThreshold(e.target.value)}
                        />
                        <p className="text-sm text-muted-foreground">
                          Applications will be automatically approved if student attendance is above this threshold
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="max-leave-days">Maximum Leave Days Per Semester</Label>
                        <Input
                          id="max-leave-days"
                          type="number"
                          value={maxLeaveDays}
                          onChange={(e) => setMaxLeaveDays(e.target.value)}
                        />
                        <p className="text-sm text-muted-foreground">
                          Maximum number of leave days allowed per student per semester
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="max-leaves-per-week">Maximum Leaves Per Week</Label>
                        <Input
                          id="max-leaves-per-week"
                          type="number"
                          value={maxLeavesPerWeek}
                          onChange={(e) => setMaxLeavesPerWeek(e.target.value)}
                        />
                        <p className="text-sm text-muted-foreground">
                          Maximum number of leave days allowed per student per week
                        </p>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="auto-approval">Automatic Approval</Label>
                          <p className="text-sm text-muted-foreground">
                            Automatically approve applications based on attendance threshold
                          </p>
                        </div>
                        <Switch id="auto-approval" checked={autoApproval} onCheckedChange={setAutoApproval} />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="ml-auto gap-1" onClick={handleSaveSettings} disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>Saving...</>
                        ) : (
                          <>
                            <Save className="h-4 w-4" />
                            Save Settings
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="notifications" className="m-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Settings</CardTitle>
                      <CardDescription>Configure system notifications</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="notify-teachers">Notify Teachers</Label>
                          <p className="text-sm text-muted-foreground">
                            Send notifications to teachers when new leave applications are submitted
                          </p>
                        </div>
                        <Switch id="notify-teachers" checked={notifyTeachers} onCheckedChange={setNotifyTeachers} />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="notify-students">Notify Students</Label>
                          <p className="text-sm text-muted-foreground">
                            Send notifications to students when their leave status changes
                          </p>
                        </div>
                        <Switch id="notify-students" checked={notifyStudents} onCheckedChange={setNotifyStudents} />
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label htmlFor="email-template">Email Template</Label>
                        <textarea
                          id="email-template"
                          className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Dear {name}, Your leave application has been {status}..."
                          defaultValue="Dear {name},

Your leave application (ID: {application_id}) for the period {start_date} to {end_date} has been {status}.

{reason_if_rejected}

Thank you,
Student Leave Application System"
                        />
                        <p className="text-sm text-muted-foreground">
                          Template for emails sent to students when their leave status changes
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="ml-auto gap-1" onClick={handleSaveSettings} disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>Saving...</>
                        ) : (
                          <>
                            <Save className="h-4 w-4" />
                            Save Settings
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="backup" className="m-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Backup & Export</CardTitle>
                      <CardDescription>Manage system data backup and export</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label>Database Backup</Label>
                        <div className="flex gap-2">
                          <Button variant="outline" className="flex-1">
                            Create Backup
                          </Button>
                          <Button variant="outline" className="flex-1">
                            Restore Backup
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Create or restore a backup of the entire system database
                        </p>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label>Export Data</Label>
                        <div className="flex gap-2">
                          <Button variant="outline" className="flex-1">
                            Export All Applications
                          </Button>
                          <Button variant="outline" className="flex-1">
                            Export Student Data
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Export system data to Excel format for reporting and analysis
                        </p>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label>Scheduled Backups</Label>
                        <div className="flex items-center gap-4">
                          <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="never">Never</option>
                          </select>
                          <Button variant="outline">Configure</Button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Set up automatic scheduled backups of the system data
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="ml-auto gap-1" onClick={handleSaveSettings} disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>Saving...</>
                        ) : (
                          <>
                            <Save className="h-4 w-4" />
                            Save Settings
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}

