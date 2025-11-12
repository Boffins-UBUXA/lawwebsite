"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown, ChevronUp, Phone, Mail, Facebook, Twitter, Linkedin } from "lucide-react"
import { useSiteSettings } from "@/contexts/site-settings-context"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null)
  const { settings, loading } = useSiteSettings()
  const pathname = usePathname()
  const navRef = useRef<HTMLDivElement>(null)

  // Icon mapping helper
  const getIconComponent = (iconName: string) => {
    const icons: Record<string, any> = {
      Phone,
      Mail,
      Facebook,
      Twitter,
      Linkedin,
    }
    return icons[iconName] || Phone
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdownId(null)
      }
    }

    if (openDropdownId !== null) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }
  }, [openDropdownId])

  // Close dropdown when route changes
  useEffect(() => {
    setOpenDropdownId(null)
  }, [pathname])

  if (loading) {
    return (
      <div className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-center">
          {/* <div className="text-primary">Loading...</div> */}
        </div>
      </div>
    )
  }

  if (!settings) {
    return null
  }

  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-secondary text-secondary-foreground py-2 text-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-6 sm:space-y-0">
              {/* Top Contacts */}
              {settings.topContacts.map((contact) => {
                const Icon = getIconComponent(contact.icon)
                return (
                  <div key={contact.id} className="flex items-center space-x-2">
                    <Icon className="h-4 w-4" />
                    <a href={contact.href} className="hover:text-primary transition-colors">
                      {contact.value}
                    </a>
                  </div>
                )
              })}
              
              {/* Social Links */}
              <div className="flex items-center space-x-3 mt-3 sm:mt-0 sm:ml-6">
                {settings.socialLinks.map((social) => {
                  const Icon = getIconComponent(social.icon)
                  return (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary cursor-pointer transition-colors"
                      aria-label={social.platform}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white/95 backdrop-blur-sm text-primary sticky top-0 z-50 shadow-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="shadow-[2px_2px_7px_var(--primary)] rounded-lg">
                <img
                  src={settings.logo?.url || "/goldonly-removebg-preview.png"}
                  alt={settings.brandName}
                  className="h-16 w-16 rounded-lg object-cover"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 relative" ref={navRef}>
              {settings.navigation.map((item) => (
                <div key={item.id} className="relative">
                  {!item.dropdown || item.dropdown.length === 0 ? (
                    <Link
                      href={item.url}
                      className={`text-sm font-medium transition-colors duration-200 tracking-wide ${
                        pathname === item.url
                          ? "text-secondary border-b-2 border-secondary pb-1"
                          : "text-primary hover:text-secondary"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <div className="flex items-center gap-1">
                      {/* Main Link - Clickable */}
                      <Link
                        href={item.url}
                        className={`text-sm font-medium transition-colors duration-200 tracking-wide ${
                          pathname === item.url || pathname.startsWith(item.url)
                            ? "text-secondary border-b-2 border-secondary pb-1"
                            : "text-primary hover:text-secondary"
                        }`}
                      >
                        {item.label}
                      </Link>

                      {/* Dropdown Toggle Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setOpenDropdownId(openDropdownId === item.id ? null : item.id)
                        }}
                        className="text-primary hover:text-secondary transition-colors p-1"
                        aria-label="Toggle dropdown"
                      >
                        {openDropdownId === item.id ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </button>

                      {/* Dropdown Menu */}
                      {openDropdownId === item.id && (
                        <div className="absolute left-0 top-full mt-2 w-56 bg-white border rounded-lg shadow-lg z-50">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.id}
                              href={subItem.url}
                              className={`block px-4 py-2 text-sm transition-colors ${
                                pathname === subItem.url
                                  ? "bg-secondary/10 text-secondary font-medium"
                                  : "text-primary hover:bg-secondary/10 hover:text-secondary"
                              }`}
                              onClick={() => setOpenDropdownId(null)}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile Menu Button */}
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
                {settings.navigation.map((item) => (
                  <div key={item.id}>
                    {!item.dropdown || item.dropdown.length === 0 ? (
                      <Link
                        href={item.url}
                        className={`text-sm font-medium transition-colors duration-200 ${
                          pathname === item.url
                            ? "text-secondary font-semibold"
                            : "text-primary hover:text-secondary"
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <div>
                        {/* Mobile: Parent link is also clickable */}
                        <div className="flex items-center justify-between">
                          <Link
                            href={item.url}
                            className={`text-sm font-medium transition-colors duration-200 flex-1 ${
                              pathname === item.url || pathname.startsWith(item.url)
                                ? "text-secondary font-semibold"
                                : "text-primary hover:text-secondary"
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {item.label}
                          </Link>
                          <details>
                            <summary className="cursor-pointer text-primary hover:text-secondary list-none">
                              <ChevronDown className="h-4 w-4" />
                            </summary>
                            <div className="ml-4 mt-2 space-y-2">
                              {item.dropdown.map((subItem) => (
                                <Link
                                  key={subItem.id}
                                  href={subItem.url}
                                  className={`block text-sm transition-colors ${
                                    pathname === subItem.url
                                      ? "text-secondary font-medium"
                                      : "text-muted-foreground hover:text-secondary"
                                  }`}
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {subItem.label}
                                </Link>
                              ))}
                            </div>
                          </details>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  )
}