"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2 items-center">
          <motion.div
            className="flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Student Leave <span className="text-primary">Application</span> System
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-xl/relaxed xl:text-xl/relaxed">
                Apply for leave, track your applications, and get automated approvals based on your attendance.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="px-8" asChild>
                <Link href="/apply">Apply for Leave</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/dashboard">View Dashboard</Link>
              </Button>
            </div>
          </motion.div>
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-full max-w-[500px]">
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-primary/20 rounded-full filter blur-3xl opacity-70"></div>
              <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-secondary/20 rounded-full filter blur-3xl opacity-70"></div>
              <img
                src="/images/campus.png"
                alt="Student Leave Application System"
                className="relative z-10 rounded-lg object-cover shadow-xl border border-border"
                width={500}
                height={500}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

