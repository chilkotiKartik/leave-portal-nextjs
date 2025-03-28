"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Search, Download, CheckCircle, XCircle, RefreshCw } from "lucide-react"
import { format } from "date-fns"
import { useToast } from "@/components/ui/use-toast"
import * as XLSX from "xlsx"
import { useLeaveStore } from "@/lib/store"
import { PublicApprovedLeaves } from "@/components/public-approved-leaves"
import { HighlightedLeaves } from "@/components/highlighted-leaves"

type Student = {
  id: string
  name: string
  department: string
  semester: number
  attendance: number
  leaveStatus: "on-leave" | "present" | "absent"
}

const students: Student[] = [
  {
    id: "241620101056",
    name: "PRIYANSHU SINGH MAHAR",
    department: "Computer Science & Engineering",
    semester: 2,
    attendance: 92.5,
    leaveStatus: "present",
  },
  {
    id: "241620101010",
    name: "ANKITA CHAURAKOTI",
    department: "Computer Science & Engineering",
    semester: 2,
    attendance: 92.09,
    leaveStatus: "on-leave",
  },
  {
    id: "241620101043",
    name: "MONIKA",
    department: "Computer Science & Engineering",
    semester: 2,
    attendance: 89.6,
    leaveStatus: "present",
  },
  {
    id: "241620122010",
    name: "DISHA PANDEY",
    department: "Artificial Intelligence and Machine Learning",
    semester: 2,
    attendance: 93.28,
    leaveStatus: "present",
  },
  {
    id: "241620122017",
    name: "PRADEEP SINGH BISHT",
    department: "Artificial Intelligence and Machine Learning",
    semester: 2,
    attendance: 68.46,
    leaveStatus: "absent",
  },
]

export function TeacherView() {
  const [searchTerm, setSearchTerm] = useState("")
  const [date, setDate] = useState<Date>(new Date())
  const [refreshKey, setRefreshKey] = useState(0)
  const { toast } = useToast()

  const { leaveApplications, updateLeaveStatus, getTodaysApprovedLeaves, getPendingApplications } = useLeaveStore()
  const pendingApplications = getPendingApplications()
  const approvedLeaves = getTodaysApprovedLeaves()

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Force refresh when a leave is approved/rejected
  useEffect(() => {
    // This is just to trigger a re-render when the component mounts
    const interval = setInterval(() => {
      setRefreshKey((prev) => prev + 1)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "on-leave":
        return <Badge className="bg-blue-500">On Leave</Badge>
      case "present":
        return <Badge className="bg-green-500">Present</Badge>
      case "absent":
        return <Badge variant="destructive">Absent</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getAttendanceBadge = (attendance: number) => {
    if (attendance >= 85) return <Badge className="bg-green-500">{attendance}%</Badge>
    if (attendance >= 75) return <Badge className="bg-yellow-500">{attendance}%</Badge>
    if (attendance >= 70) return <Badge className="bg-orange-500">{attendance}%</Badge>
    return <Badge variant="destructive">{attendance}%</Badge>
  }

  const handleApproveLeave = (applicationId: string) => {
    updateLeaveStatus(applicationId, "approved")

    // Force refresh to update the UI
    setRefreshKey((prev) => prev + 1)

    toast({
      title: "Leave Approved",
      description: "The leave application has been approved successfully and highlighted across the system.",
      variant: "default",
    })
  }

  const handleRejectLeave = (applicationId: string) => {
    updateLeaveStatus(applicationId, "rejected")

    // Force refresh to update the UI
    setRefreshKey((prev) => prev + 1)

    toast({
      title: "Leave Rejected",
      description: "The leave application has been rejected.",
      variant: "default",
    })
  }

  const exportToExcel = () => {
    // Prepare data for export
    const data = leaveApplications.map((app) => ({
      "Application ID": app.id,
      "Student ID": app.studentId,
      "Student Name": app.studentName,
      Department: app.department,
      Email: app.email,
      Phone: app.phone || "N/A",
      "Start Date": app.startDate,
      "End Date": app.endDate,
      Days: app.days,
      Reason: app.reason,
      Status: app.status.charAt(0).toUpperCase() + app.status.slice(1),
      Attendance: `${app.attendance}%`,
      "Submission Date": app.timestamp ? format(new Date(app.timestamp), "yyyy-MM-dd HH:mm:ss") : "N/A",
    }))

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(data)

    // Create workbook
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leave Applications")

    // Generate Excel file
    const fileName = `Leave_Applications_${format(new Date(), "yyyy-MM-dd")}.xlsx`
    XLSX.writeFile(workbook, fileName)

    toast({
      title: "Export Successful",
      description: `Leave applications have been exported to ${fileName}`,
      variant: "default",
    })
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="pending">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pending">Pending Applications</TabsTrigger>
          <TabsTrigger value="approved">Approved Leaves</TabsTrigger>
          <TabsTrigger value="highlighted">Highlighted Leaves</TabsTrigger>
          <TabsTrigger value="attendance">Today's Attendance</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Pending Leave Applications</CardTitle>
                <CardDescription>Review and approve/reject student leave requests</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="gap-1" onClick={() => setRefreshKey((prev) => prev + 1)}>
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </Button>
                <Button variant="outline" className="gap-1" onClick={exportToExcel}>
                  <Download className="h-4 w-4" />
                  Export to Excel
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {pendingApplications.length > 0 ? (
                <div className="space-y-4">
                  {pendingApplications.map((application) => (
                    <Card key={application.id} className="overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <Avatar className="h-12 w-12 border-2 border-muted">
                              <AvatarFallback>{application.studentName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">{application.studentName}</h3>
                              <p className="text-sm text-muted-foreground">
                                {application.studentId} • {application.department}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                {getAttendanceBadge(application.attendance)}
                                <span className="text-sm">
                                  {format(new Date(application.startDate), "MMM d")} -{" "}
                                  {format(new Date(application.endDate), "MMM d, yyyy")}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 self-end md:self-center">
                            <Button
                              variant="destructive"
                              size="sm"
                              className="gap-1"
                              onClick={() => handleRejectLeave(application.id)}
                            >
                              <XCircle className="h-4 w-4" />
                              Reject
                            </Button>
                            <Button
                              variant="default"
                              size="sm"
                              className="gap-1"
                              onClick={() => handleApproveLeave(application.id)}
                            >
                              <CheckCircle className="h-4 w-4" />
                              Approve
                            </Button>
                          </div>
                        </div>
                        <div className="mt-4 rounded-md bg-muted/50 p-3">
                          <p className="text-sm font-medium">Reason:</p>
                          <p className="text-sm">{application.reason}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CheckCircle className="h-12 w-12 text-muted-foreground/30 mb-4" />
                  <h3 className="text-lg font-medium">No pending applications</h3>
                  <p className="text-sm text-muted-foreground">All leave applications have been processed.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approved" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Students on Approved Leave Today</CardTitle>
                <CardDescription>Students who are on approved leave for today</CardDescription>
              </div>
              <Button variant="outline" className="gap-1" onClick={exportToExcel}>
                <Download className="h-4 w-4" />
                Export to Excel
              </Button>
            </CardHeader>
            <CardContent>
              <PublicApprovedLeaves />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="highlighted" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recently Highlighted Leaves</CardTitle>
                <CardDescription>
                  These leaves have been recently approved and are highlighted across the system
                </CardDescription>
              </div>
              <Button variant="outline" className="gap-1" onClick={exportToExcel}>
                <Download className="h-4 w-4" />
                Export to Excel
              </Button>
            </CardHeader>
            <CardContent>
              <HighlightedLeaves />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Student Attendance</CardTitle>
                <CardDescription>View which students are present, absent, or on approved leave</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search by name, ID, or department..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="gap-1" onClick={exportToExcel}>
                  <Download className="h-4 w-4" />
                  Export to Excel
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-[1fr_1fr_auto_auto] gap-4 p-4 font-medium border-b">
                  <div>Student</div>
                  <div>Department</div>
                  <div>Attendance</div>
                  <div>Status</div>
                </div>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <div
                      key={student.id}
                      className="grid grid-cols-[1fr_1fr_auto_auto] gap-4 p-4 items-center border-b last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-muted-foreground">{student.id}</div>
                        </div>
                      </div>
                      <div>
                        {student.department} (Sem {student.semester})
                      </div>
                      <div>{getAttendanceBadge(student.attendance)}</div>
                      <div>{getStatusBadge(student.leaveStatus)}</div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-muted-foreground">No students found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

