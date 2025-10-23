"use client"

import Link from "next/link"
import { Phone, Mail, MapPin } from "lucide-react"
import { useSiteSettings } from "@/contexts/site-settings-context"

export function Footer() {
  const { settings, loading } = useSiteSettings()

  if (loading) {
    return (
      <footer className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          Loading...
        </div>
      </footer>
    )
  }

  if (!settings || !settings.footer) {
    return null
  }

  const { footer } = settings

  // Helper to get icon component
  const getIconForType = (type: string) => {
    switch (type) {
      case 'phone':
        return Phone
      case 'email':
        return Mail
      case 'location':
        return MapPin
      default:
        return Phone
    }
  }

  // Separate footer links into practice areas and quick links
  const practiceAreaLinks = footer.FooterLinks.filter(link => 
    link.url.includes('/practice-areas')
  )
  const otherLinks = footer.FooterLinks.filter(link => 
    !link.url.includes('/practice-areas')
  )

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="shadow-[2px_2px_7px_#ccc] rounded-lg">
                <img 
                  src={footer.logo?.url || "/goldonly-removebg-preview.png"}
                  alt={footer.logoAlt || footer.companyName} 
                  className="h-16 w-16 rounded-lg object-cover" 
                />
              </div>
              <div className="text-2xl font-serif font-bold">{footer.companyName}</div>
            </div>
            <p className="text-primary-foreground/80 mb-6 text-pretty">
              {footer.companyTagline}
            </p>
            <div className="space-y-2">
              {footer.ContactDetails.map((contact) => {
                const Icon = getIconForType(contact.type)
                return (
                  <div key={contact.id} className="flex items-center space-x-2">
                    <Icon className="h-4 w-4 text-accent" />
                    {contact.href ? (
                      <a href={contact.href} className="text-sm hover:text-accent transition-colors">
                        {contact.value}
                      </a>
                    ) : (
                      <span className="text-sm">{contact.value}</span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Practice Areas */}
          {practiceAreaLinks.length > 0 && (
            <div>
              <h3 className="text-lg font-serif font-bold mb-4">Practice Areas</h3>
              <ul className="space-y-2">
                {practiceAreaLinks.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.url}
                      className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quick Links */}
          {otherLinks.length > 0 && (
            <div>
              <h3 className="text-lg font-serif font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {otherLinks.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.url}
                      className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm text-primary-foreground/60">
            {footer.FooterCopyright}
          </p>
        </div>
      </div>
    </footer>
  )
}