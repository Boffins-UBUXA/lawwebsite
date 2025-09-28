"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Building2, Phone, Mail, Facebook, Twitter, Linkedin } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: "HOME", href: "/" },
    { name: "ABOUT", href: "/about" },
    { name: "AREAS OF PRACTICE", href: "/practice-areas" },
    { name: "BLOG", href: "/blog" },
    { name: "NOTARY SERVICE", href: "/notary" },
    { name: "CONTACT US", href: "/contact" },
  ]

  return (
    <>
      <div className="bg-secondary text-secondary-foreground py-2 text-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (289) 838-2982</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@bekwynlaw.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (289) 838-2982</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Facebook className="h-4 w-4 hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="h-4 w-4 hover:text-primary cursor-pointer transition-colors" />
              <Linkedin className="h-4 w-4 hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </div>

      <header className="bg-white/95 backdrop-blur-sm text-primary sticky top-0 z-50 shadow-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center space-x-3">
              <div className=" ">
                <img src="/bluelogo.png"
                  alt="logo" className="h-16 w-16 rounded-lg" />
              </div>
              <div>
                <div className="text-2xl font-serif font-bold text-primary">BL</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Law Office</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors duration-200 tracking-wide ${
                    pathname === item.href
                      ? "text-secondary border-b-2 border-secondary pb-1"
                      : "text-primary hover:text-secondary"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-primary hover:text-secondary"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-border">
              <nav className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-sm font-medium transition-colors duration-200 ${
                      pathname === item.href ? "text-secondary font-semibold" : "text-primary hover:text-secondary"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  )
}
