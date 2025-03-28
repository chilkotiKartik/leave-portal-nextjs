"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthStore } from "@/lib/auth"
import { ImprovedHeader } from "@/components/improved-header"
import { Footer } from "@/components/footer"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, GraduationCap } from "lucide-react"

export default function LoginPage() {
  const [userId, setUserId] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuthStore()
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const result = login(userId, password)

    if (result.success) {
      toast({
        title: "Login successful",
        description: "You have been logged in successfully.",
        variant: "default",
      })

      // Redirect based on user role
      const user = useAuthStore.getState().user
      if (user?.role === "student") {
        router.push("/dashboard")
      } else if (user?.role === "teacher") {
        router.push("/teacher")
      } else if (user?.role === "admin") {
        router.push("/admin")
      }
    } else {
      toast({
        title: "Login failed",
        description: result.message,
        variant: "destructive",
      })
    }

    setIsLoading(false)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <ImprovedHeader />
      <main className="flex-1 flex items-center justify-center p-4 bg-gradient-to-b from-background to-muted/30">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <div className="bg-primary/10 p-3 rounded-full">
                <GraduationCap className="h-10 w-10 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl">Login to UKTU Portal</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="userId">Roll Number / User ID</Label>
                <Input
                  id="userId"
                  placeholder="e.g., 241620104005"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-sm text-primary underline-offset-4 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-sm font-medium">Sample Login Credentials:</p>
                <ul className="text-xs space-y-1 mt-1">
                  <li>
                    <strong>Student:</strong> 241620104005 / 12345
                  </li>
                  <li>
                    <strong>Teacher:</strong> T67890 / 12345
                  </li>
                  <li>
                    <strong>Admin:</strong> A11111 / 12345
                  </li>
                </ul>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>For any technical issues, please contact:</p>
                <a href="mailto:support@uktu.ac.in" className="text-primary">
                  support@uktu.ac.in
                </a>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
              <div className="text-center text-sm">
                Need to apply for leave?{" "}
                <Link href="/apply" className="text-primary underline-offset-4 hover:underline">
                  Apply Now
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </main>
      <Footer />
    </div>
  )
}

