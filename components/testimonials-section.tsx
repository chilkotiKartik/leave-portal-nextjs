"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion } from "framer-motion"

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "The automated approval system has saved me so much time. I no longer have to wait days for my leave applications to be processed.",
      name: "Sarah Johnson",
      role: "Computer Science Student",
      avatar: "/images/avatar-1.png",
    },
    {
      quote:
        "As an administrator, this system has streamlined our entire leave management process. The dashboard provides all the information I need at a glance.",
      name: "Michael Chen",
      role: "Department Administrator",
      avatar: "/images/avatar-2.png",
    },
    {
      quote:
        "The attendance tracking feature helps me stay on top of my academic requirements. I always know exactly where I stand.",
      name: "Emily Rodriguez",
      role: "Engineering Student",
      avatar: "/images/avatar-3.png",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 max-w-[800px]">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Users Say</h2>
            <p className="text-muted-foreground md:text-xl/relaxed">
              Hear from students and administrators who use our system every day.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardContent className="p-6 space-y-4">
                  <div className="relative">
                    <div className="absolute -top-2 -left-2 text-6xl text-primary opacity-20">"</div>
                    <p className="relative z-10 italic text-muted-foreground">{testimonial.quote}</p>
                  </div>
                  <div className="flex items-center gap-4 pt-4">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

