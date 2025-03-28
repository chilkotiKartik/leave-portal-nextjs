"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

type Notification = {
  id: string
  title: string
  message: string
  time: string
  read: boolean
}

const notifications: Notification[] = [
  {
    id: "n1",
    title: "Leave Approved",
    message: "Your leave application (APP-001) has been approved.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "n2",
    title: "Attendance Update",
    message: "Your attendance for this month is 82%.",
    time: "1 day ago",
    read: false,
  },
  {
    id: "n3",
    title: "System Maintenance",
    message: "The system will be down for maintenance on Sunday from 2-4 AM.",
    time: "3 days ago",
    read: true,
  },
]

export function NotificationBell() {
  const [open, setOpen] = useState(false)
  const [userNotifications, setUserNotifications] = useState<Notification[]>(notifications)

  const unreadCount = userNotifications.filter((n) => !n.read).length

  const markAllAsRead = () => {
    setUserNotifications(userNotifications.map((n) => ({ ...n, read: true })))
  }

  const markAsRead = (id: string) => {
    setUserNotifications(userNotifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-destructive-foreground">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between border-b p-3">
          <h4 className="font-semibold">Notifications</h4>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
        <div className="max-h-80 overflow-y-auto">
          {userNotifications.length > 0 ? (
            userNotifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "flex flex-col gap-1 border-b p-3 cursor-pointer hover:bg-muted/50",
                  !notification.read && "bg-muted/30",
                )}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-center justify-between">
                  <h5 className="font-medium">{notification.title}</h5>
                  {!notification.read && <span className="h-2 w-2 rounded-full bg-blue-500"></span>}
                </div>
                <p className="text-sm text-muted-foreground">{notification.message}</p>
                <span className="text-xs text-muted-foreground">{notification.time}</span>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">No notifications</div>
          )}
        </div>
        <div className="border-t p-2">
          <Button variant="ghost" size="sm" className="w-full" asChild>
            <a href="/notifications">View all notifications</a>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

