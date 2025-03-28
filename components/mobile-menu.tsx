"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <div className="flex flex-col gap-4 mt-8">
          <Link href="/dashboard" onClick={() => setOpen(false)}>
            <Button variant="ghost" className="w-full justify-start">
              Dashboard
            </Button>
          </Link>
          <Link href="/apply" onClick={() => setOpen(false)}>
            <Button variant="ghost" className="w-full justify-start">
              Apply for Leave
            </Button>
          </Link>
          <Link href="/login" onClick={() => setOpen(false)}>
            <Button className="w-full">Login</Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}

