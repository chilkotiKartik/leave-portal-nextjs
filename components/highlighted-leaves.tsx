"use client"

import { useLeaveStore } from "@/lib/store"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { format } from "date-fns"
import { CalendarDays, Clock } from "lucide-react"

export function HighlightedLeaves() {
  const { getHighlightedLeaves } = useLeaveStore()
  const highlightedLeaves = getHighlightedLeaves()

  if (highlightedLeaves.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Clock className="h-12 w-12 text-muted-foreground/30 mb-4" />
        <h3 className="text-lg font-medium">No highlighted leaves</h3>
        <p className="text-sm text-muted-foreground">Recently approved leaves will appear here.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {highlightedLeaves.map((leave) => (
        <Card key={leave.id} className="overflow-hidden border-l-4 border-l-green-500 animate-pulse">
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10 border-2 border-green-500">
                <AvatarFallback className="bg-green-100 text-green-700">{leave.studentName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{leave.studentName}</h3>
                  <Badge className="bg-green-500">Approved</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {leave.studentId} • {leave.department}
                </p>
                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <CalendarDays className="h-3 w-3" />
                    <span>
                      {format(new Date(leave.startDate), "MMM d")} - {format(new Date(leave.endDate), "MMM d, yyyy")}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>
                      {leave.timestamp
                        ? `Approved ${format(new Date(leave.timestamp), "MMM d, h:mm a")}`
                        : "Recently approved"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

