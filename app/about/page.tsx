import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import { AKITLogo } from "@/components/akit-logo"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold">
            <AKITLogo />
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
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Our System</h1>
                <p className="text-muted-foreground md:text-xl/relaxed">
                  The Student Leave Application System is designed to streamline the process of applying for and
                  managing student leave requests. Our automated system makes it easy for students to apply for leave
                  and get instant approvals based on their attendance record.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild>
                    <Link href="/apply">Apply for Leave</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/dashboard">View Dashboard</Link>
                  </Button>
                </div>
              </div>
              <img
                src="/images/students.png"
                alt="Students on campus"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
              />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Mission</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We aim to simplify administrative processes and enhance the student experience through innovative
                  technology solutions.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  1
                </div>
                <h3 className="text-xl font-bold">Efficiency</h3>
                <p className="text-muted-foreground">
                  Automating the leave application process saves time for both students and administrators.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  2
                </div>
                <h3 className="text-xl font-bold">Transparency</h3>
                <p className="text-muted-foreground">
                  Clear criteria for approval ensures fairness and transparency in the process.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  3
                </div>
                <h3 className="text-xl font-bold">Accessibility</h3>
                <p className="text-muted-foreground">Access the system from any device, anywhere, at any time.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our system automatically processes leave applications based on your attendance criteria.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Automated Approval Process</h3>
                <p className="text-muted-foreground">
                  Our system uses a 75% attendance threshold to automatically approve or reject leave applications. This
                  ensures that students with good attendance records can get instant approvals, while those with
                  attendance concerns receive appropriate attention.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Applications are automatically approved if attendance is above 75%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Applications are flagged for manual review if attendance is below 75%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Administrators can override the automatic decision if necessary</span>
                  </li>
                </ul>
              </div>
              <img
                src="/images/leave-form.png"
                alt="Leave Application Process"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-8 bg-muted/30">
          <div className="container">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Developer Information</h2>
              <p className="text-muted-foreground">
                Developed by <span className="font-semibold">Kartik Chilkoti</span>
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                1st Year Web Developer, Computer Science & Engineering
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                © {new Date().getFullYear()} AKIT Leave Application System
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

