"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

type LeaveEvent = {
  id: string
  startDate: Date
  endDate: Date
  status: "pending" | "approved" | "rejected"
  reason: string
}

const leaveEvents: LeaveEvent[] = [
  {
    id: "L001",
    startDate: new Date(2024, 2, 15),
    endDate: new Date(2024, 2, 17),
    status: "approved",
    reason: "Medical appointment",
  },
  {
    id: "L002",
    startDate: new Date(2024, 3, 10),
    endDate: new Date(2024, 3, 12),
    status: "approved",
    reason: "Family function",
  },
  {
    id: "L003",
    startDate: new Date(2024, 4, 5),
    endDate: new Date(2024, 4, 7),
    status: "pending",
    reason: "Personal emergency",
  },
]

export function CalendarView() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedEvent, setSelectedEvent] = useState<LeaveEvent | null>(null)

  const isDateInLeave = (date: Date) => {
    return leaveEvents.find((event) => {
      const eventStart = new Date(event.startDate)
      const eventEnd = new Date(event.endDate)
      return date >= eventStart && date <= eventEnd
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500"
      case "rejected":
        return "bg-destructive"
      default:
        return "bg-muted"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leave Calendar</CardTitle>
        <CardDescription>View and manage your leave schedule</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-[1fr_300px]">
          <div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              modifiers={{
                booked: (date) => isDateInLeave(date) !== undefined,
              }}
              modifiersStyles={{
                booked: {
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                  fontWeight: "bold",
                  color: "var(--primary)",
                },
              }}
              components={{
                DayContent: (props) => {
                  const event = isDateInLeave(props.date)
                  return (
                    <div className="relative h-full w-full p-2">
                      <div>{props.date.getDate()}</div>
                      {event && (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute bottom-0 right-0 h-4 w-4 rounded-full p-0"
                              onClick={() => setSelectedEvent(event)}
                            >
                              <div className={`h-3 w-3 rounded-full ${getStatusColor(event.status)}`} />
                              <span className="sr-only">View leave details</span>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-80">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">Leave Details</h4>
                                <Badge className={getStatusColor(event.status)}>
                                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                                </Badge>
                              </div>
                              <div className="text-sm">
                                <p>
                                  <span className="font-medium">Period:</span> {event.startDate.toLocaleDateString()} -{" "}
                                  {event.endDate.toLocaleDateString()}
                                </p>
                                <p>
                                  <span className="font-medium">Reason:</span> {event.reason}
                                </p>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      )}
                    </div>
                  )
                },
              }}
            />
          </div>
          <div className="space-y-6">
            <div className="rounded-lg border p-4">
              <h3 className="mb-4 font-medium">Upcoming Leaves</h3>
              {leaveEvents
                .filter((event) => new Date(event.startDate) >= new Date())
                .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
                .slice(0, 3)
                .map((event) => (
                  <div key={event.id} className="mb-3 flex items-start space-x-2 text-sm">
                    <Badge className={`${getStatusColor(event.status)} shrink-0 mt-0.5`} />
                    <div>
                      <p className="font-medium">
                        {event.startDate.toLocaleDateString()} - {event.endDate.toLocaleDateString()}
                      </p>
                      <p className="text-muted-foreground">{event.reason}</p>
                    </div>
                  </div>
                ))}
            </div>
            <div className="rounded-lg border p-4">
              <h3 className="mb-2 font-medium">Legend</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span>Approved</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-muted" />
                  <span>Pending</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-destructive" />
                  <span>Rejected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

