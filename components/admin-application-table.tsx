"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CheckCircle, FileText, XCircle } from "lucide-react"

type Application = {
  id: string
  studentId: string
  studentName: string
  startDate: string
  endDate: string
  reason: string
  status: "pending" | "approved" | "rejected"
  days: number
  attendance: number
}

const applications: Application[] = [
  {
    id: "APP-001",
    studentId: "S12345",
    studentName: "John Doe",
    startDate: "2024-03-15",
    endDate: "2024-03-17",
    reason: "Medical appointment",
    status: "approved",
    days: 3,
    attendance: 82,
  },
  {
    id: "APP-002",
    studentId: "S12346",
    studentName: "Jane Smith",
    startDate: "2024-04-10",
    endDate: "2024-04-12",
    reason: "Family function",
    status: "approved",
    days: 2,
    attendance: 88,
  },
  {
    id: "APP-003",
    studentId: "S12347",
    studentName: "Michael Johnson",
    startDate: "2024-05-05",
    endDate: "2024-05-07",
    reason: "Personal emergency",
    status: "pending",
    days: 2,
    attendance: 76,
  },
  {
    id: "APP-004",
    studentId: "S12348",
    studentName: "Emily Williams",
    startDate: "2024-02-20",
    endDate: "2024-02-22",
    reason: "Medical leave",
    status: "rejected",
    days: 3,
    attendance: 68,
  },
  {
    id: "APP-005",
    studentId: "S12349",
    studentName: "David Brown",
    startDate: "2024-03-25",
    endDate: "2024-03-26",
    reason: "Family emergency",
    status: "pending",
    days: 2,
    attendance: 72,
  },
]

interface AdminApplicationTableProps {
  filter?: "pending" | "approved" | "rejected"
}

export function AdminApplicationTable({ filter }: AdminApplicationTableProps) {
  const filteredApplications = filter ? applications.filter((app) => app.status === filter) : applications

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="outline">Pending</Badge>
    }
  }

  const getAttendanceBadge = (attendance: number) => {
    if (attendance >= 75) {
      return <Badge className="bg-green-500">{attendance}%</Badge>
    } else {
      return <Badge variant="destructive">{attendance}%</Badge>
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Student</TableHead>
            <TableHead>Period</TableHead>
            <TableHead>Days</TableHead>
            <TableHead>Attendance</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredApplications.length > 0 ? (
            filteredApplications.map((application) => (
              <TableRow key={application.id}>
                <TableCell className="font-medium">{application.id}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{application.studentName}</div>
                    <div className="text-sm text-muted-foreground">{application.studentId}</div>
                  </div>
                </TableCell>
                <TableCell>
                  {formatDate(application.startDate)} - {formatDate(application.endDate)}
                </TableCell>
                <TableCell>{application.days}</TableCell>
                <TableCell>{getAttendanceBadge(application.attendance)}</TableCell>
                <TableCell>{getStatusBadge(application.status)}</TableCell>
                <TableCell className="text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <FileText className="h-4 w-4" />
                        <span className="sr-only">View details</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Leave Application Details</DialogTitle>
                        <DialogDescription>
                          {application.id} - {application.studentName}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <div className="font-medium">Student ID:</div>
                          <div className="col-span-3">{application.studentId}</div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <div className="font-medium">Period:</div>
                          <div className="col-span-3">
                            {formatDate(application.startDate)} - {formatDate(application.endDate)}
                          </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <div className="font-medium">Days:</div>
                          <div className="col-span-3">{application.days}</div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <div className="font-medium">Attendance:</div>
                          <div className="col-span-3">{application.attendance}%</div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <div className="font-medium">Status:</div>
                          <div className="col-span-3">{getStatusBadge(application.status)}</div>
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                          <div className="font-medium">Reason:</div>
                          <div className="col-span-3">{application.reason}</div>
                        </div>
                      </div>
                      <DialogFooter className="sm:justify-between">
                        {application.status === "pending" && (
                          <>
                            <Button variant="destructive" className="gap-1">
                              <XCircle className="h-4 w-4" />
                              Reject
                            </Button>
                            <Button className="gap-1">
                              <CheckCircle className="h-4 w-4" />
                              Approve
                            </Button>
                          </>
                        )}
                        {application.status !== "pending" && <Button variant="outline">Close</Button>}
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No applications found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

