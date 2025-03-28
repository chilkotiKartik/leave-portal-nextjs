"use client"

import { motion } from "framer-motion"

export function StatsSection() {
  const stats = [
    { value: "10,000+", label: "Students" },
    { value: "95%", label: "Approval Rate" },
    { value: "24/7", label: "Availability" },
    { value: "2 min", label: "Average Processing Time" },
  ]

  return (
    <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center justify-center space-y-2 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold md:text-5xl">{stat.value}</div>
              <div className="text-sm font-medium md:text-base">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

