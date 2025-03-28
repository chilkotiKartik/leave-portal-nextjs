import { create } from "zustand"
import { persist } from "zustand/middleware"
import { format, addDays, subDays, startOfMonth, endOfMonth } from "date-fns"

export type LeaveApplication = {
  id: string
  studentId: string
  studentName: string
  startDate: string
  endDate: string
  reason: string
  status: "pending" | "approved" | "rejected"
  days: number
  attendance: number
  department: string
  email: string
  phone?: string
  timestamp?: string
  highlighted?: boolean
}

// Get today's date and yesterday's date
const today = new Date()
const yesterday = subDays(today, 1)
const tomorrow = addDays(today, 1)

// Format dates for comparison
const todayFormatted = format(today, "yyyy-MM-dd")
const yesterdayFormatted = format(yesterday, "yyyy-MM-dd")
const tomorrowFormatted = format(tomorrow, "yyyy-MM-dd")

// Initial leave applications data
const initialLeaveApplications: LeaveApplication[] = [
  {
    id: "APP-001",
    studentId: "241620101056",
    studentName: "PRIYANSHU SINGH MAHAR",
    startDate: todayFormatted,
    endDate: tomorrowFormatted,
    reason: "Medical appointment - Need to visit the doctor for a regular checkup and some tests.",
    status: "approved",
    days: 2,
    attendance: 92.5,
    department: "Computer Science & Engineering",
    email: "priyanshu@uktu.ac.in",
    phone: "9528731865",
    timestamp: new Date(today.setHours(today.getHours() - 2)).toISOString(),
    highlighted: true,
  },
  {
    id: "APP-002",
    studentId: "241620101010",
    studentName: "ANKITA CHAURAKOTI",
    startDate: yesterdayFormatted,
    endDate: todayFormatted,
    reason: "Family function - Sister's wedding ceremony, need to travel to another city.",
    status: "approved",
    days: 2,
    attendance: 92.09,
    department: "Computer Science & Engineering",
    email: "ankita@uktu.ac.in",
    phone: "6395235069",
    timestamp: new Date(today.setHours(today.getHours() - 24)).toISOString(),
    highlighted: true,
  },
  {
    id: "APP-003",
    studentId: "241620122010",
    studentName: "DISHA PANDEY",
    startDate: tomorrowFormatted,
    endDate: format(addDays(tomorrow, 2), "yyyy-MM-dd"),
    reason: "Personal emergency - Family health issue that requires my presence at home.",
    status: "pending",
    days: 3,
    attendance: 93.28,
    department: "Artificial Intelligence and Machine Learning",
    email: "disha@uktu.ac.in",
    phone: "9548640373",
    timestamp: new Date(today.setHours(today.getHours() - 1)).toISOString(),
  },
  {
    id: "APP-004",
    studentId: "241620122017",
    studentName: "PRADEEP SINGH BISHT",
    startDate: yesterdayFormatted,
    endDate: format(addDays(yesterday, 2), "yyyy-MM-dd"),
    reason: "Medical leave - Suffering from high fever and doctor advised rest for 3 days.",
    status: "rejected",
    days: 3,
    attendance: 68.46,
    department: "Artificial Intelligence and Machine Learning",
    email: "pradeep@uktu.ac.in",
    phone: "7417925963",
    timestamp: new Date(today.setHours(today.getHours() - 48)).toISOString(),
  },
  {
    id: "APP-005",
    studentId: "241620122016",
    studentName: "PIYUSH BHATT",
    startDate: format(addDays(today, 3), "yyyy-MM-dd"),
    endDate: format(addDays(today, 4), "yyyy-MM-dd"),
    reason: "Family emergency - Grandmother hospitalized, need to visit her.",
    status: "rejected",
    days: 2,
    attendance: 65.63,
    department: "Artificial Intelligence and Machine Learning",
    email: "piyush@uktu.ac.in",
    phone: "9410100415",
    timestamp: new Date(today.setHours(today.getHours() - 12)).toISOString(),
  },
]

// Define the store type
type LeaveStore = {
  leaveApplications: LeaveApplication[]
  updateLeaveStatus: (id: string, status: "pending" | "approved" | "rejected") => void
  addLeaveApplication: (application: Omit<LeaveApplication, "id" | "timestamp" | "status" | "highlighted">) => {
    success: boolean
    message: string
  }
  getTodaysApprovedLeaves: () => LeaveApplication[]
  getYesterdaysApprovedLeaves: () => LeaveApplication[]
  getApprovedLeavesForDate: (date: Date) => LeaveApplication[]
  getPendingApplications: () => LeaveApplication[]
  getApprovedApplications: () => LeaveApplication[]
  getRejectedApplications: () => LeaveApplication[]
  getApplicationById: (id: string) => LeaveApplication | undefined
  getApplicationsByStudentId: (studentId: string) => LeaveApplication[]
  getRecentlyApprovedLeaves: (limit?: number) => LeaveApplication[]
  getHighlightedLeaves: () => LeaveApplication[]
  getMonthlyLeaveCount: (studentId: string, date: Date) => number
  exportToExcel: () => void
}

// Create the store with persistence
export const useLeaveStore = create<LeaveStore>()(
  persist(
    (set, get) => ({
      leaveApplications: initialLeaveApplications,

      updateLeaveStatus: (id, status) => {
        set((state) => ({
          leaveApplications: state.leaveApplications.map((app) =>
            app.id === id
              ? {
                  ...app,
                  status,
                  timestamp: new Date().toISOString(),
                  highlighted: status === "approved" ? true : app.highlighted,
                }
              : app,
          ),
        }))
      },

      addLeaveApplication: (application) => {
        const newId = `APP-${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`

        // Check if student has already used 3 leaves this month
        const currentDate = new Date()
        const monthlyLeaveCount = get().getMonthlyLeaveCount(application.studentId, currentDate)

        if (monthlyLeaveCount >= 3) {
          return {
            success: false,
            message: "You have already used your 3 leaves for this month. Please try again next month.",
          }
        }

        // Auto-reject if attendance is below 75%, otherwise pending
        const status = application.attendance < 75 ? "rejected" : "pending"
        const highlighted = false // New applications are not highlighted

        set((state) => ({
          leaveApplications: [
            {
              ...application,
              id: newId,
              status,
              highlighted,
              timestamp: new Date().toISOString(),
            },
            ...state.leaveApplications,
          ],
        }))

        if (application.attendance < 75) {
          return {
            success: false,
            message: "Your application was automatically rejected due to low attendance (below 75%).",
          }
        } else {
          return {
            success: true,
            message: "Your leave application has been sent. Please check back later for updates.",
          }
        }
      },

      getTodaysApprovedLeaves: () => {
        const today = new Date().toISOString().split("T")[0]
        return get().leaveApplications.filter((app) => {
          const startDate = new Date(app.startDate)
          const endDate = new Date(app.endDate)
          const todayDate = new Date(today)
          return app.status === "approved" && startDate <= todayDate && endDate >= todayDate
        })
      },

      getYesterdaysApprovedLeaves: () => {
        const yesterday = format(subDays(new Date(), 1), "yyyy-MM-dd")
        return get().leaveApplications.filter((app) => {
          const startDate = new Date(app.startDate)
          const endDate = new Date(app.endDate)
          const yesterdayDate = new Date(yesterday)
          return app.status === "approved" && startDate <= yesterdayDate && endDate >= yesterdayDate
        })
      },

      getApprovedLeavesForDate: (date) => {
        const dateString = format(date, "yyyy-MM-dd")
        return get().leaveApplications.filter((app) => {
          const startDate = new Date(app.startDate)
          const endDate = new Date(app.endDate)
          const targetDate = new Date(dateString)
          return app.status === "approved" && startDate <= targetDate && endDate >= targetDate
        })
      },

      getPendingApplications: () => {
        return get().leaveApplications.filter((app) => app.status === "pending")
      },

      getApprovedApplications: () => {
        return get().leaveApplications.filter((app) => app.status === "approved")
      },

      getRejectedApplications: () => {
        return get().leaveApplications.filter((app) => app.status === "rejected")
      },

      getApplicationById: (id) => {
        return get().leaveApplications.find((app) => app.id === id)
      },

      getApplicationsByStudentId: (studentId) => {
        return get().leaveApplications.filter((app) => app.studentId === studentId)
      },

      getRecentlyApprovedLeaves: (limit = 5) => {
        return get()
          .leaveApplications.filter((app) => app.status === "approved")
          .sort((a, b) => {
            const dateA = a.timestamp ? new Date(a.timestamp).getTime() : 0
            const dateB = b.timestamp ? new Date(b.timestamp).getTime() : 0
            return dateB - dateA
          })
          .slice(0, limit)
      },

      getHighlightedLeaves: () => {
        return get().leaveApplications.filter((app) => app.highlighted)
      },

      getMonthlyLeaveCount: (studentId, date) => {
        const monthStart = startOfMonth(date)
        const monthEnd = endOfMonth(date)

        return get().leaveApplications.filter((app) => {
          const appStartDate = new Date(app.startDate)
          return (
            app.studentId === studentId &&
            (app.status === "approved" || app.status === "pending") &&
            appStartDate >= monthStart &&
            appStartDate <= monthEnd
          )
        }).length
      },

      exportToExcel: () => {
        // This function will be implemented in the teacher-view.tsx component
        // since we need to use the XLSX library there
      },
    }),
    {
      name: "leave-applications-storage",
    },
  ),
)

