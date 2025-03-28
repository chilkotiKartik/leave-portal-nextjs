import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminUserManagement } from "@/components/admin-user-management"
import { Footer } from "@/components/footer"
import { ArrowLeft } from "lucide-react"
import { AKITLogo } from "@/components/akit-logo"

export default function UsersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <AKITLogo />
            <span>Admin Dashboard - User Management</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="ghost" size="sm">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6">
          <div className="mb-8">
            <div className="flex items-center gap-2">
              <Link href="/admin">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h1 className="text-3xl font-bold">User Management</h1>
            </div>
            <p className="text-muted-foreground">Manage all users in the system</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>View and manage all users in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All Users</TabsTrigger>
                  <TabsTrigger value="students">Students</TabsTrigger>
                  <TabsTrigger value="teachers">Teachers</TabsTrigger>
                  <TabsTrigger value="admins">Admins</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                  <AdminUserManagement />
                </TabsContent>
                <TabsContent value="students">
                  <AdminUserManagement />
                </TabsContent>
                <TabsContent value="teachers">
                  <AdminUserManagement />
                </TabsContent>
                <TabsContent value="admins">
                  <AdminUserManagement />
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

