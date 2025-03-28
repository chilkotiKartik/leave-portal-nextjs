import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Footer } from "@/components/footer"

export default function FAQPage() {
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
            <Link href="/">
              <Button variant="ghost" size="sm">
                Home
              </Button>
            </Link>
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
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Frequently Asked Questions
                </h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Find answers to common questions about the Student Leave Application System.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl mt-12">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How does the automatic approval system work?</AccordionTrigger>
                  <AccordionContent>
                    Our system automatically approves leave applications if your attendance is above 75%. If your
                    attendance is below this threshold, your application will be flagged for manual review by an
                    administrator.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How many leave days am I allowed per semester?</AccordionTrigger>
                  <AccordionContent>
                    Students are typically allowed up to 15 leave days per semester. This limit may be adjusted by
                    administrators based on institutional policies.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Can I cancel a leave application after submission?</AccordionTrigger>
                  <AccordionContent>
                    Yes, you can cancel a pending leave application from your dashboard. However, once an application
                    has been approved or rejected, you will need to contact an administrator to make changes.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>How do I check my current attendance percentage?</AccordionTrigger>
                  <AccordionContent>
                    Your current attendance percentage is displayed on your dashboard. You can also view a detailed
                    breakdown of your attendance by month in the attendance chart.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>What supporting documents should I upload with my application?</AccordionTrigger>
                  <AccordionContent>
                    For medical leave, please upload a medical certificate. For family emergencies or other personal
                    reasons, any relevant documentation that supports your request is helpful. If you don't have any
                    supporting documents, you can still submit your application, but it may affect the approval
                    decision.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>How long does it take to get a decision on my application?</AccordionTrigger>
                  <AccordionContent>
                    Applications that meet the automatic approval criteria (attendance above 75%) are approved
                    instantly. Applications that require manual review typically receive a decision within 24-48 hours
                    on working days.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-7">
                  <AccordionTrigger>Can I apply for leave retroactively?</AccordionTrigger>
                  <AccordionContent>
                    Yes, you can apply for leave retroactively, but it should be done within 7 days of your absence.
                    Retroactive applications may require additional documentation and are subject to stricter review.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-8">
                  <AccordionTrigger>How do I contact support if I have issues with the system?</AccordionTrigger>
                  <AccordionContent>
                    For technical support, please email support@studentleave.edu or use the help center accessible from
                    the dashboard. For urgent matters, you can contact the administrative office directly at +1 (555)
                    123-4567.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="flex justify-center mt-12">
              <Button asChild>
                <Link href="/apply">Apply for Leave</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

