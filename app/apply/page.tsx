"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format, addDays, differenceInDays } from "date-fns"
import { CalendarIcon, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Footer } from "@/components/footer"
import { ImprovedHeader } from "@/components/improved-header"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useAuthStore } from "@/lib/auth"
import { useLeaveStore } from "@/lib/store"
import { sampleUsers } from "@/lib/auth"

export default function ApplyPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { user, isAuthenticated } = useAuthStore()
  const { addLeaveApplication, getMonthlyLeaveCount } = useLeaveStore()

  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(addDays(new Date(), 1))
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [name, setName] = useState(user?.name || "")
  const [studentId, setStudentId] = useState(user?.id || "")
  const [email, setEmail] = useState(user?.email || "")
  const [phone, setPhone] = useState(user?.phone || "")
  const [reason, setReason] = useState("")
  const [department, setDepartment] = useState(user?.department || "")
  const [attendance, setAttendance] = useState<number>(user?.attendance || 75)
  const [validationError, setValidationError] = useState<string | null>(null)
  const [monthlyLeaveCount, setMonthlyLeaveCount] = useState(0)

  // Update form fields when user changes
  useEffect(() => {
    if (user) {
      setName(user.name)
      setStudentId(user.id)
      setEmail(user.email)
      setPhone(user.phone || "")
      setDepartment(user.department)
      setAttendance(user.attendance)

      // Get monthly leave count
      const count = getMonthlyLeaveCount(user.id, new Date())
      setMonthlyLeaveCount(count)
    }
  }, [user, getMonthlyLeaveCount])

  const checkLeaveLimit = (start: Date, end: Date) => {
    // Calculate days in the current request
    const requestedDays = differenceInDays(end, start) + 1

    // Check if total exceeds 3 days
    if (requestedDays > 3) {
      return {
        valid: false,
        message: `You can only take 3 leaves per request. Your request is for ${requestedDays} days.`,
      }
    }

    return { valid: true }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!startDate || !endDate) {
      setValidationError("Please select both start and end dates")
      return
    }

    // Validate leave dates
    if (endDate < startDate) {
      setValidationError("End date cannot be before start date")
      return
    }

    // Check the 3 leaves per request limit
    const leaveCheck = checkLeaveLimit(startDate, endDate)
    if (!leaveCheck.valid) {
      setValidationError(leaveCheck.message)
      return
    }

    // Check monthly leave limit
    if (monthlyLeaveCount >= 3) {
      setValidationError("You have already used your 3 leaves for this month. Please try again next month.")
      return
    }

    if (!name || !studentId || !email || !reason) {
      setValidationError("Please fill in all required fields")
      return
    }

    setValidationError(null)
    setIsSubmitting(true)

    // Find a matching student in our sample data or use default values
    const student = sampleUsers.find((u) => u.id === studentId) || {
      attendance: attendance,
      department: department,
    }

    // Create the leave application
    const application = {
      studentId,
      studentName: name,
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd"),
      reason,
      days: differenceInDays(endDate, startDate) + 1,
      attendance: student.attendance,
      department: student.department,
      email,
      phone,
    }

    // Add the application to the store
    const result = addLeaveApplication(application)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Leave Application Submitted",
      description: result.message,
      variant: "default",
    })

    // Redirect to success page with status
    const status = application.attendance < 75 ? "rejected" : "pending"
    router.push(
      `/apply/success?status=${status}&attendance=${application.attendance}&message=${encodeURIComponent(result.message)}`,
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <ImprovedHeader />
      <div className="container max-w-4xl py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Apply for Leave</h1>
          <p className="text-muted-foreground">Fill out the form below to submit your leave application</p>
          <div className="mt-2 flex items-center">
            <p className="text-sm font-medium">Contact: </p>
            <a href="mailto:support@uktu.ac.in" className="text-sm text-primary ml-1">
              support@uktu.ac.in
            </a>
          </div>
        </div>

        {validationError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{validationError}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Leave Application Form</CardTitle>
              <CardDescription>
                Applications are automatically rejected if your attendance is below 75%
                <br />
                <span className="font-medium text-primary">Note: Maximum 3 leaves per month are allowed</span>
                {user && (
                  <div className="mt-2">
                    <span className="font-medium">Leaves used this month: </span>
                    <span className={monthlyLeaveCount >= 3 ? "text-red-500 font-bold" : "text-green-500 font-bold"}>
                      {monthlyLeaveCount}/3
                    </span>
                  </div>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={!!user}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="student-id">Student ID</Label>
                  <Input
                    id="student-id"
                    placeholder="241620101056"
                    required
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    disabled={!!user}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="student@uktu.ac.in"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!!user}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="9876543210"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={!!user}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    placeholder="Computer Science"
                    required
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    disabled={!!user}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="attendance">Current Attendance (%)</Label>
                  <Input
                    id="attendance"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="75"
                    required
                    value={attendance}
                    onChange={(e) => setAttendance(Number.parseInt(e.target.value))}
                    disabled={!!user}
                  />
                  {attendance < 75 && (
                    <p className="text-xs text-destructive mt-1">
                      Warning: Applications with attendance below 75% are automatically rejected.
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !startDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !endDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Leave</Label>
                <Textarea
                  id="reason"
                  placeholder="Please provide detailed information about your leave request"
                  className="min-h-[120px]"
                  required
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="documents">Supporting Documents (Optional)</Label>
                <Input id="documents" type="file" />
                <p className="text-sm text-muted-foreground">
                  Upload any medical certificates or other relevant documents
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
              <Button variant="outline" type="button" asChild>
                <Link href="/">Cancel</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting || monthlyLeaveCount >= 3}>
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
      <Footer />
    </div>
  )
}

