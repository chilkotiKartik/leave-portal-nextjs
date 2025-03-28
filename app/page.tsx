"use client"

import { ImprovedHeader } from "@/components/improved-header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, CheckCircle, Clock, PieChart, Users } from "lucide-react"
import { Logo } from "@/components/logo"
import { PublicApprovedLeaves } from "@/components/public-approved-leaves"
import { HighlightedLeaves } from "@/components/highlighted-leaves"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <ImprovedHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30 py-20 md:py-32">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl"></div>
            <div className="absolute top-40 -left-40 h-80 w-80 rounded-full bg-secondary/10 blur-3xl"></div>
          </div>
          <div className="container relative z-10">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-6"
              >
                <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm">
                  <Logo size="small" />
                  <span className="ml-2 text-muted-foreground">Streamlined Leave Management</span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                  Student Leave <span className="text-primary">Application</span> System
                </h1>
                <p className="text-lg text-muted-foreground md:text-xl">
                  Apply for leave, track your applications, and get automated approvals based on your attendance
                  criteria. Maximum 3 leaves per week allowed.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="px-8" asChild>
                    <Link href="/apply">Apply for Leave</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/login">Login to Dashboard</Link>
                  </Button>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative mx-auto lg:mr-0"
              >
                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl opacity-70"></div>
                  <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-secondary/10 rounded-full filter blur-3xl opacity-70"></div>
                  <img
                    src="/images/campus.png"
                    alt="Student Leave Application System"
                    className="relative z-10 rounded-lg object-cover shadow-xl border border-border"
                    width={600}
                    height={400}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Recently Approved Leaves Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-2">Recently Approved Leaves</h2>
                <p className="text-muted-foreground">Highlighted leaves show recently approved applications</p>
              </div>
              <Button variant="outline" className="mt-4 md:mt-0" asChild>
                <Link href="/teacher">
                  View Teacher Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <HighlightedLeaves />
          </div>
        </section>

        {/* Students on Leave Section */}
        <section className="py-16">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-2">Students on Approved Leave</h2>
                <p className="text-muted-foreground">
                  View students with approved leave applications for today or yesterday
                </p>
              </div>
            </div>

            <PublicApprovedLeaves />
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-3xl font-bold">10,000+</h3>
                <p className="text-muted-foreground">Students</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10 mb-4">
                  <CheckCircle className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-3xl font-bold">95%</h3>
                <p className="text-muted-foreground">Approval Rate</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 mb-4">
                  <Clock className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-3xl font-bold">2 min</h3>
                <p className="text-muted-foreground">Average Processing Time</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
                  <PieChart className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-3xl font-bold">24/7</h3>
                <p className="text-muted-foreground">Availability</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">How It Works</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Our system automatically processes leave applications based on your attendance criteria. Maximum 3
                leaves per week are allowed.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                      <span className="text-xl font-bold text-primary">1</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Submit Application</h3>
                    <p className="text-muted-foreground">
                      Fill out the leave application form with your details and reason for leave.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-gradient-to-br from-secondary/5 to-transparent border-secondary/20">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 mb-4">
                      <span className="text-xl font-bold text-secondary">2</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Automatic Processing</h3>
                    <p className="text-muted-foreground">
                      Applications are automatically rejected if attendance is below 70%, or sent to teachers for
                      review.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-gradient-to-br from-accent/5 to-transparent border-accent/20">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 mb-4">
                      <span className="text-xl font-bold text-accent">3</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Real-time Updates</h3>
                    <p className="text-muted-foreground">
                      Approved leaves are immediately highlighted and visible to everyone in the system.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-muted/30">
          <div className="container">
            <div className="rounded-xl bg-gradient-primary p-8 md:p-12 text-primary-foreground text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">Ready to Get Started?</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                Apply for leave or log in to manage your existing applications.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="px-8" asChild>
                  <Link href="/apply">Apply for Leave</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 px-8"
                  asChild
                >
                  <Link href="/login">Login</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

