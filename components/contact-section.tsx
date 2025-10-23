"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, Clock, MapPin, LucideIcon } from "lucide-react"
import Link from "next/link"
import type { ContactCTA } from "@/lib/api/law-home-page"
import { stripHtml } from "@/lib/api/law-home-page"

interface ContactSectionProps {
  data: ContactCTA;
}

// Map icon names to Lucide components
const iconMap: Record<string, LucideIcon> = {
  Phone,
  Mail,
  Clock,
  MapPin,
};

export function ContactSection({ data }: ContactSectionProps) {
  const cleanDescription = stripHtml(data.description);

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-foreground">
            {data.heading}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            {cleanDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* LEFT: Contact Info */}
          <Card className="h-full flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-foreground">Get In Touch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 flex-1">
              {data.contactPoints.map((contact) => {
                const IconComponent = iconMap[contact.icon] || Phone;
                
                return (
                  <div key={contact.id} className="flex items-center space-x-4">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <IconComponent className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      {contact.href ? (
                        <a href={contact.href} className="font-medium text-foreground hover:underline">
                          {contact.value}
                        </a>
                      ) : (
                        <p className="font-medium text-foreground">{contact.value}</p>
                      )}
                      <p className="text-sm text-muted-foreground">{contact.label}</p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* RIGHT: Free Consultation */}
          <Card className="h-full bg-primary text-primary-foreground flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-2xl font-serif">Free Consultation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-primary-foreground/90 mb-6 leading-relaxed">
                  {cleanDescription}
                </p>

                {data.whatToExpect.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">What to expect:</h4>
                    <ul className="space-y-2 text-primary-foreground/90">
                      {data.whatToExpect.map((item) => (
                        <li key={item.id} className="flex items-start space-x-2">
                          <span className="text-accent mt-1">•</span>
                          <span>{item.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {data.primaryCta && (
                <Link href={data.primaryCta.url}>
                  <Button variant="secondary" size="lg" className="w-full mt-6 hover:scale-[1.02] transition">
                    {data.primaryCta.label}
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}