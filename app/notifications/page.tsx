"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Footer } from "@/components/footer"
import { ArrowLeft, Bell, CheckCheck } from "lucide-react"

type Notification = {
  id: string
  title: string
  message: string
  time: string
  date: string
  read: boolean
  category: "leave" | "attendance" | "system"
}

const initialNotifications: Notification[] = [
  {
    id: "n1",
    title: "Leave Approved",
    message: "Your leave application (APP-001) has been approved. You can view the details in your dashboard.",
    time: "10:30 AM",
    date: "Mar 24, 2024",
    read: false,
    category: "leave",
  },
  {
    id: "n2",
    title: "Attendance Update",
    message: "Your attendance for this month is 82%. You are eligible for automatic leave approval.",
    time: "2:15 PM",
    date: "Mar 23, 2024",
    read: false,
    category: "attendance",
  },
  {
    id: "n3",
    title: "System Maintenance",
    message: "The system will be down for maintenance on Sunday from 2-4 AM. Please plan accordingly.",
    time: "9:00 AM",
    date: "Mar 21, 2024",
    read: true,
    category: "system",
  },
  {
    id: "n4",
    title: "Leave Reminder",
    message: "Your approved leave starts tomorrow. Don't forget to inform your instructors.",
    time: "4:45 PM",
    date: "Mar 20, 2024",
    read: true,
    category: "leave",
  },
  {
    id: "n5",
    title: "Attendance Warning",
    message:
      "Your attendance has dropped to 78%. While still above the threshold, please be mindful of further absences.",
    time: "11:20 AM",
    date: "Mar 18, 2024",
    read: true,
    category: "attendance",
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const [activeTab, setActiveTab] = useState("all")

  const unreadCount = notifications.filter((n) => !n.read).length

  const filteredNotifications =
    activeTab === "all" ? notifications : notifications.filter((n) => n.category === activeTab)

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <img src="/images/logo.png" alt="Logo" className="h-8 w-8" />
            <span className="hidden sm:inline-block">Student Leave Application System</span>
            <span className="sm:hidden">SLAS</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                Dashboard
              </Button>
            </Link>
            <Link href="/apply">
              <Button size="sm">Apply for Leave</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">
          <div className="mb-8">
            <div className="flex items-center gap-2">
              <Link href="/dashboard">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h1 className="text-3xl font-bold">Notifications</h1>
            </div>
            <p className="text-muted-foreground">Stay updated with important information</p>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>All Notifications</CardTitle>
                <CardDescription>You have {unreadCount} unread notifications</CardDescription>
              </div>
              {unreadCount > 0 && (
                <Button variant="outline" size="sm" onClick={markAllAsRead} className="flex items-center gap-1">
                  <CheckCheck className="h-4 w-4" />
                  Mark all as read
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="leave">Leave</TabsTrigger>
                  <TabsTrigger value="attendance">Attendance</TabsTrigger>
                  <TabsTrigger value="system">System</TabsTrigger>
                </TabsList>
                <TabsContent value={activeTab}>
                  {filteredNotifications.length > 0 ? (
                    <div className="space-y-4">
                      {filteredNotifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`flex items-start gap-4 p-4 rounded-lg border ${!notification.read ? "bg-muted/30" : ""}`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="bg-primary/10 p-2 rounded-full">
                            <Bell className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">{notification.title}</h3>
                              {!notification.read && (
                                <Badge variant="outline" className="bg-primary text-primary-foreground">
                                  New
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{notification.message}</p>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <span>{notification.time}</span>
                              <span className="mx-1">•</span>
                              <span>{notification.date}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center">
                      <Bell className="mx-auto h-12 w-12 text-muted-foreground opacity-20" />
                      <h3 className="mt-4 text-lg font-medium">No notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        You don't have any {activeTab !== "all" ? activeTab : ""} notifications at the moment.
                      </p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

