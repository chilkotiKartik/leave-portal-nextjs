"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Clock, PieChart } from "lucide-react"
import { motion } from "framer-motion"

export function FeaturesSection() {
  const features = [
    {
      icon: <CheckCircle className="h-10 w-10 text-primary" />,
      title: "Automated Approvals",
      description: "Get instant approvals for leave applications if your attendance is above 75%.",
    },
    {
      icon: <PieChart className="h-10 w-10 text-primary" />,
      title: "Attendance Tracking",
      description: "Monitor your attendance percentage and stay on top of your academic requirements.",
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: "Real-time Updates",
      description: "Receive instant notifications about your application status and important announcements.",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 max-w-[800px]">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Streamlined Leave Management
            </h2>
            <p className="text-muted-foreground md:text-xl/relaxed">
              Our system makes it easy for students to apply for leave and for administrators to manage applications.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="flex flex-col items-center text-center p-6 space-y-4">
                  <div className="p-3 rounded-full bg-primary/10">{feature.icon}</div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

