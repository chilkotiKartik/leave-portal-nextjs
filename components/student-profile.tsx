"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Edit, Mail, MapPin, Phone, School, User, Users } from "lucide-react"

interface StudentProfileProps {
  student: {
    id: string
    name: string
    email: string
    phone?: string
    department: string
    semester: number
    attendance: number
    leavesTaken: number
    maxLeaves: number
    address?: string
    enrollmentDate?: string
    fatherName?: string
    motherName?: string
    dateOfBirth?: string
    institute?: string
  }
}

export function StudentProfile({ student }: StudentProfileProps) {
  const [isEditing, setIsEditing] = useState(false)

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 85) return "bg-green-500"
    if (attendance >= 75) return "bg-yellow-500"
    if (attendance >= 70) return "bg-orange-500"
    return "bg-red-500"
  }

  const getLeaveProgressColor = (taken: number, max: number) => {
    const percentage = (taken / max) * 100
    if (percentage < 50) return "bg-green-500"
    if (percentage < 75) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20 border-2 border-primary">
              <AvatarFallback className="text-2xl bg-primary/10 text-primary">{student.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{student.name}</CardTitle>
              <CardDescription>Roll No: {student.id}</CardDescription>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge>{student.department}</Badge>
                <Badge variant="outline">Semester {student.semester}</Badge>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsEditing(!isEditing)}>
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit Profile</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4 pt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Attendance Status</div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{student.attendance}%</span>
                  <Badge className={getAttendanceColor(student.attendance)}>
                    {student.attendance >= 75 ? "Good Standing" : student.attendance >= 70 ? "Borderline" : "At Risk"}
                  </Badge>
                </div>
                <Progress value={student.attendance} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Leave Balance</div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">
                    {student.leavesTaken}/{student.maxLeaves}
                  </span>
                  <Badge variant="outline">{student.maxLeaves - student.leavesTaken} Remaining</Badge>
                </div>
                <Progress
                  value={(student.leavesTaken / student.maxLeaves) * 100}
                  className={`h-2 ${getLeaveProgressColor(student.leavesTaken, student.maxLeaves)}`}
                />
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="mb-2 font-medium">Personal Information</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Father's Name:</span>
                  <span className="text-sm">{student.fatherName || "Not provided"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Mother's Name:</span>
                  <span className="text-sm">{student.motherName || "Not provided"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Date of Birth:</span>
                  <span className="text-sm">{student.dateOfBirth || "Not provided"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <School className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Institute:</span>
                  <span className="text-sm">{student.institute || "Not provided"}</span>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="attendance" className="space-y-4 pt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border p-4">
                <h3 className="mb-2 font-medium">Monthly Attendance</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>January</span>
                    <div className="flex items-center">
                      <span className="mr-2">85%</span>
                      <div className="h-2 w-24 rounded-full bg-muted">
                        <div className="h-2 w-[85%] rounded-full bg-green-500"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>February</span>
                    <div className="flex items-center">
                      <span className="mr-2">78%</span>
                      <div className="h-2 w-24 rounded-full bg-muted">
                        <div className="h-2 w-[78%] rounded-full bg-yellow-500"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>March</span>
                    <div className="flex items-center">
                      <span className="mr-2">{student.attendance}%</span>
                      <div className="h-2 w-24 rounded-full bg-muted">
                        <div
                          className={`h-2 rounded-full ${getAttendanceColor(student.attendance)}`}
                          style={{ width: `${student.attendance}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="mb-2 font-medium">Absence Details</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center justify-between">
                    <span>Medical Leave</span>
                    <Badge variant="outline">{Math.floor(student.leavesTaken * 0.6)} days</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Personal Leave</span>
                    <Badge variant="outline">{Math.floor(student.leavesTaken * 0.3)} days</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Unexcused</span>
                    <Badge variant="destructive">{Math.floor(student.leavesTaken * 0.1)} day</Badge>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="contact" className="space-y-4 pt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Email</span>
                </div>
                <p>{student.email}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Phone</span>
                </div>
                <p>{student.phone || "Not provided"}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Address</span>
                </div>
                <p>{student.address || "Not provided"}</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Department</span>
                </div>
                <p>
                  {student.department}, Semester {student.semester}
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <div className="flex items-center justify-between w-full">
          <Button variant="outline" asChild>
            <a href="/dashboard/applications">View Applications</a>
          </Button>
          <Button asChild>
            <a href="/apply">Apply for Leave</a>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

