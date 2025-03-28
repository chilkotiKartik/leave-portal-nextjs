"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { ImprovedHeader } from "@/components/improved-header"
import { Footer } from "@/components/footer"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const status = searchParams.get("status") || "pending"
  const attendance = searchParams.get("attendance") || "80"
  const message = searchParams.get("message") || ""

  const [statusMessage, setStatusMessage] = useState("")
  const [statusIcon, setStatusIcon] = useState(<CheckCircle className="h-16 w-16 text-green-500 mb-6" />)

  useEffect(() => {
    if (status === "rejected") {
      setStatusMessage("Your application was automatically rejected due to low attendance (below 75%).")
      setStatusIcon(<AlertCircle className="h-16 w-16 text-red-500 mb-6" />)
    } else {
      setStatusMessage("Your leave application has been sent. Please check back later for updates.")
      setStatusIcon(<CheckCircle className="h-16 w-16 text-green-500 mb-6" />)
    }
  }, [status])

  return (
    <div className="flex min-h-screen flex-col">
      <ImprovedHeader />
      <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-64px-200px)] max-w-md text-center py-10 px-4">
        {statusIcon}
        <h1 className="text-3xl font-bold mb-2">Application Submitted!</h1>
        <p className="text-muted-foreground mb-8">{message || statusMessage}</p>
        <div className="p-6 bg-muted rounded-lg mb-8 w-full">
          <h2 className="font-semibold mb-4">Application Status</h2>
          <p className="mb-4">
            Based on your current attendance of <span className="font-bold">{attendance}%</span>, your application has
            been{" "}
            <span className={status === "rejected" ? "text-red-500 font-bold" : "text-yellow-500 font-bold"}>
              {status === "rejected" ? "REJECTED" : "PENDING REVIEW"}
            </span>
            .
          </p>
          <p className="text-sm text-muted-foreground">
            {status === "rejected"
              ? "Applications are automatically rejected if your attendance is below 75%."
              : "Applications are sent for review if your attendance is above 75%."}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Button asChild className="w-full">
            <Link href="/dashboard">View Dashboard</Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/apply">Submit Another</Link>
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

