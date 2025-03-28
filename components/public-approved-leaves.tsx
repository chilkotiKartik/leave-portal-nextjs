"use client"

import { useLeaveStore } from "@/lib/store"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { format } from "date-fns"
import { CalendarDays, Clock } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function PublicApprovedLeaves() {
  const { getTodaysApprovedLeaves, getYesterdaysApprovedLeaves } = useLeaveStore()
  const todayLeaves = getTodaysApprovedLeaves()
  const yesterdayLeaves = getYesterdaysApprovedLeaves()

  const renderLeaves = (leaves: ReturnType<typeof getTodaysApprovedLeaves>) => {
    if (leaves.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Clock className="h-12 w-12 text-muted-foreground/30 mb-4" />
          <h3 className="text-lg font-medium">No approved leaves</h3>
          <p className="text-sm text-muted-foreground">No students are on approved leave for this period.</p>
        </div>
      )
    }

    return (
      <div className="grid gap-4 md:grid-cols-2">
        {leaves.map((leave) => (
          <Card key={leave.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{leave.studentName.charAt(0)}</AvatarFallback>
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
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <Tabs defaultValue="today">
      <TabsList className="mb-4">
        <TabsTrigger value="today">Today</TabsTrigger>
        <TabsTrigger value="yesterday">Yesterday</TabsTrigger>
      </TabsList>
      <TabsContent value="today">{renderLeaves(todayLeaves)}</TabsContent>
      <TabsContent value="yesterday">{renderLeaves(yesterdayLeaves)}</TabsContent>
    </Tabs>
  )
}

