"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CalendarIcon, Search, Filter, FileText, Eye } from "lucide-react"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useLeaveStore, type LeaveApplication } from "@/lib/store"

interface LeaveTableProps {
  filter?: "pending" | "approved" | "rejected" | "today"
  showDepartment?: boolean
  showAttendance?: boolean
  showActions?: boolean
  maxItems?: number
}

export function LeaveTable({
  filter,
  showDepartment = true,
  showAttendance = true,
  showActions = true,
  maxItems,
}: LeaveTableProps) {
  const { leaveApplications, getTodaysApprovedLeaves } = useLeaveStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedApplication, setSelectedApplication] = useState<LeaveApplication | null>(null)

  let filteredApplications = [...leaveApplications]

  // Filter by status if provided
  if (filter && filter !== "today") {
    filteredApplications = filteredApplications.filter((app) => app.status === filter)
  }

  // Filter for today's leaves - only show approved leaves
  if (filter === "today") {
    filteredApplications = getTodaysApprovedLeaves()
  }

  // Filter by search term
  if (searchTerm) {
    filteredApplications = filteredApplications.filter(
      (app) =>
        app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.reason.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  // Filter by selected date if date is selected
  if (date) {
    const selectedDate = date.toISOString().split("T")[0]
    filteredApplications = filteredApplications.filter((app) => {
      const startDate = new Date(app.startDate)
      const endDate = new Date(app.endDate)
      const dateToCheck = new Date(selectedDate)
      return startDate <= dateToCheck && endDate >= dateToCheck
    })
  }

  // Limit the number of items if maxItems is provided
  if (maxItems) {
    filteredApplications = filteredApplications.slice(0, maxItems)
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM d, yyyy")
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
    if (attendance >= 85) return <Badge className="bg-green-500">{attendance}%</Badge>
    if (attendance >= 75) return <Badge className="bg-yellow-500">{attendance}%</Badge>
    return <Badge variant="destructive">{attendance}%</Badge>
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name, ID, or reason..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
          <Button variant="outline" className="gap-1">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              {showDepartment && <TableHead className="hidden md:table-cell">Department</TableHead>}
              <TableHead>Period</TableHead>
              <TableHead className="hidden sm:table-cell">Days</TableHead>
              {showAttendance && <TableHead className="hidden lg:table-cell">Attendance</TableHead>}
              <TableHead>Status</TableHead>
              {showActions && <TableHead className="text-right">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApplications.length > 0 ? (
              filteredApplications.map((application) => (
                <TableRow key={application.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{application.studentName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{application.studentName}</div>
                        <div className="text-sm text-muted-foreground">{application.studentId}</div>
                      </div>
                    </div>
                  </TableCell>
                  {showDepartment && <TableCell className="hidden md:table-cell">{application.department}</TableCell>}
                  <TableCell>
                    <div className="font-medium">{formatDate(application.startDate)}</div>
                    <div className="text-sm text-muted-foreground">{formatDate(application.endDate)}</div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{application.days}</TableCell>
                  {showAttendance && (
                    <TableCell className="hidden lg:table-cell">{getAttendanceBadge(application.attendance)}</TableCell>
                  )}
                  <TableCell>{getStatusBadge(application.status)}</TableCell>
                  {showActions && (
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => setSelectedApplication(application)}>
                            <Eye className="h-4 w-4" />
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
                          {selectedApplication && (
                            <div className="grid gap-4 py-4">
                              <div className="flex items-center gap-4">
                                <Avatar className="h-12 w-12">
                                  <AvatarFallback>{selectedApplication.studentName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="font-medium">{selectedApplication.studentName}</h3>
                                  <p className="text-sm text-muted-foreground">
                                    {selectedApplication.studentId} - {selectedApplication.department}
                                  </p>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <div className="text-sm font-medium text-muted-foreground">Period</div>
                                  <div>
                                    {formatDate(selectedApplication.startDate)} -{" "}
                                    {formatDate(selectedApplication.endDate)}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-muted-foreground">Days</div>
                                  <div>{selectedApplication.days}</div>
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-muted-foreground">Status</div>
                                  <div>{getStatusBadge(selectedApplication.status)}</div>
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-muted-foreground">Attendance</div>
                                  <div>{getAttendanceBadge(selectedApplication.attendance)}</div>
                                </div>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-muted-foreground">Reason</div>
                                <div className="mt-1 rounded-md bg-muted p-3 text-sm">{selectedApplication.reason}</div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={showDepartment ? (showAttendance ? (showActions ? 7 : 6) : 5) : 4}
                  className="h-24 text-center"
                >
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <FileText className="h-8 w-8 mb-2 opacity-40" />
                    <p>No leave applications found</p>
                    <p className="text-sm">Try adjusting your search or filters</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

