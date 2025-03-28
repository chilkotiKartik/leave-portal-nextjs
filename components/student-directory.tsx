"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Search, MoreHorizontal, Filter, UserPlus } from "lucide-react"

type Student = {
  id: string
  name: string
  email: string
  department: string
  semester: number
  attendance: number
  profileImage?: string
}

const students: Student[] = [
  {
    id: "S12345",
    name: "John Doe",
    email: "john.doe@example.com",
    department: "Computer Science",
    semester: 5,
    attendance: 82,
    profileImage: "/images/avatar-1.png",
  },
  {
    id: "S12346",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    department: "Electrical Engineering",
    semester: 3,
    attendance: 88,
    profileImage: "/images/avatar-2.png",
  },
  {
    id: "S12347",
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    department: "Mechanical Engineering",
    semester: 7,
    attendance: 76,
    profileImage: "/images/avatar-3.png",
  },
  {
    id: "S12348",
    name: "Emily Williams",
    email: "emily.williams@example.com",
    department: "Business Administration",
    semester: 4,
    attendance: 68,
    profileImage: "/images/avatar-4.png",
  },
  {
    id: "S12349",
    name: "David Brown",
    email: "david.brown@example.com",
    department: "Computer Science",
    semester: 6,
    attendance: 92,
    profileImage: "/images/avatar-5.png",
  },
]

export function StudentDirectory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [showDialog, setShowDialog] = useState(false)

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getAttendanceBadge = (attendance: number) => {
    if (attendance >= 85) return <Badge className="bg-green-500">{attendance}%</Badge>
    if (attendance >= 75) return <Badge className="bg-yellow-500">{attendance}%</Badge>
    return <Badge variant="destructive">{attendance}%</Badge>
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Student Directory</CardTitle>
            <CardDescription>Manage and view all students in the system</CardDescription>
          </div>
          <Button className="gap-1">
            <UserPlus className="h-4 w-4" />
            Add Student
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-1">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Filter By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Department</DropdownMenuItem>
              <DropdownMenuItem>Semester</DropdownMenuItem>
              <DropdownMenuItem>Attendance</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="rounded-md border">
          <div className="grid grid-cols-[1fr_1fr_auto_auto_auto] gap-4 p-4 font-medium border-b">
            <div>Student</div>
            <div>Department</div>
            <div>Semester</div>
            <div>Attendance</div>
            <div className="text-right">Actions</div>
          </div>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <div
                key={student.id}
                className="grid grid-cols-[1fr_1fr_auto_auto_auto] gap-4 p-4 items-center border-b last:border-0"
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={student.profileImage || "/images/avatar-placeholder.png"} alt={student.name} />
                    <AvatarFallback>
                      {student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{student.name}</div>
                    <div className="text-sm text-muted-foreground">{student.id}</div>
                  </div>
                </div>
                <div>{student.department}</div>
                <div>Semester {student.semester}</div>
                <div>{getAttendanceBadge(student.attendance)}</div>
                <div className="text-right">
                  <Dialog
                    open={showDialog && selectedStudent?.id === student.id}
                    onOpenChange={(open) => {
                      setShowDialog(open)
                      if (!open) setSelectedStudent(null)
                    }}
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedStudent(student)
                            setShowDialog(true)
                          }}
                        >
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit Details</DropdownMenuItem>
                        <DropdownMenuItem>View Applications</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Student Profile</DialogTitle>
                        <DialogDescription>Detailed information about {selectedStudent?.name}</DialogDescription>
                      </DialogHeader>
                      {selectedStudent && (
                        <div className="space-y-4">
                          <div className="flex flex-col items-center gap-2">
                            <Avatar className="h-20 w-20">
                              <AvatarImage
                                src={selectedStudent.profileImage || "/images/avatar-placeholder.png"}
                                alt={selectedStudent.name}
                              />
                              <AvatarFallback>
                                {selectedStudent.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="text-center">
                              <h3 className="font-medium">{selectedStudent.name}</h3>
                              <p className="text-sm text-muted-foreground">{selectedStudent.id}</p>
                            </div>
                          </div>
                          <div className="grid gap-2">
                            <div className="grid grid-cols-2 gap-1">
                              <div className="text-sm font-medium">Email:</div>
                              <div className="text-sm">{selectedStudent.email}</div>
                            </div>
                            <div className="grid grid-cols-2 gap-1">
                              <div className="text-sm font-medium">Department:</div>
                              <div className="text-sm">{selectedStudent.department}</div>
                            </div>
                            <div className="grid grid-cols-2 gap-1">
                              <div className="text-sm font-medium">Semester:</div>
                              <div className="text-sm">{selectedStudent.semester}</div>
                            </div>
                            <div className="grid grid-cols-2 gap-1">
                              <div className="text-sm font-medium">Attendance:</div>
                              <div className="text-sm">{selectedStudent.attendance}%</div>
                            </div>
                          </div>
                        </div>
                      )}
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setShowDialog(false)}>
                          Close
                        </Button>
                        <Button asChild>
                          <a href={`/admin/students/${selectedStudent?.id}`}>Full Profile</a>
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
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
  )
}

