"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText } from "lucide-react"

type Application = {
  id: string
  startDate: string
  endDate: string
  reason: string
  status: "pending" | "approved" | "rejected"
  days: number
}

const applications: Application[] = [
  {
    id: "APP-001",
    startDate: "2024-03-15",
    endDate: "2024-03-17",
    reason: "Medical appointment",
    status: "approved",
    days: 3,
  },
  {
    id: "APP-002",
    startDate: "2024-04-10",
    endDate: "2024-04-12",
    reason: "Family function",
    status: "approved",
    days: 2,
  },
  {
    id: "APP-003",
    startDate: "2024-05-05",
    endDate: "2024-05-07",
    reason: "Personal emergency",
    status: "pending",
    days: 2,
  },
  {
    id: "APP-004",
    startDate: "2024-02-20",
    endDate: "2024-02-22",
    reason: "Medical leave",
    status: "rejected",
    days: 3,
  },
]

interface ApplicationTableProps {
  filter?: "pending" | "approved" | "rejected"
}

export function ApplicationTable({ filter }: ApplicationTableProps) {
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

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Period</TableHead>
            <TableHead>Days</TableHead>
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
                  {formatDate(application.startDate)} - {formatDate(application.endDate)}
                </TableCell>
                <TableCell>{application.days}</TableCell>
                <TableCell>{getStatusBadge(application.status)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <FileText className="h-4 w-4" />
                    <span className="sr-only">View details</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No applications found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

