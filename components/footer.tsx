import Link from "next/link"
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t py-12">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Student Leave Application System</h3>
          <p className="text-sm text-muted-foreground">
            Our automated system makes it easy for students to apply for leave and get instant approvals based on their
            attendance record.
          </p>
          <div className="flex space-x-4">
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="text-muted-foreground hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-muted-foreground hover:text-primary">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/apply" className="text-muted-foreground hover:text-primary">
                Apply for Leave
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="text-muted-foreground hover:text-primary">
                Student Dashboard
              </Link>
            </li>
            <li>
              <Link href="/admin" className="text-muted-foreground hover:text-primary">
                Admin Portal
              </Link>
            </li>
            <li>
              <Link href="/faq" className="text-muted-foreground hover:text-primary">
                FAQs
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/help" className="text-muted-foreground hover:text-primary">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="/guidelines" className="text-muted-foreground hover:text-primary">
                Leave Guidelines
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-muted-foreground hover:text-primary">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start space-x-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <span className="text-muted-foreground">123 Education Street, Academic City, 12345</span>
            </li>
            <li className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <span className="text-muted-foreground">+1 (555) 123-4567</span>
            </li>
            <li className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <span className="text-muted-foreground">support@studentleave.edu</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mt-8 border-t border-border pt-8">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} AKIT Student Leave Application System. All rights reserved.
        </p>
        <p className="text-center text-xs text-muted-foreground mt-1">
          Developed by Kartik Chilkoti | 1st Year Web Developer
        </p>
      </div>
    </footer>
  )
}

