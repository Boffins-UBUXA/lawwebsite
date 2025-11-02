import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react"
import Link from "next/link"
import { getLawContactPage, getSection } from "@/lib/api/law-contact-page"
import type { HeroSimple, ContactInfoSection, ContactCTA, SimpleCTA } from "@/lib/api/law-contact-page"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Phone,
  Mail,
  MapPin,
  Clock,
}

export default async function ContactPage() {
  const pageData = await getLawContactPage()

  if (!pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Failed to load page content</p>
      </div>
    )
  }

  const heroSection = getSection<HeroSimple>(pageData.data.sections, "law.hero-simple")
  const contactInfoSection = getSection<ContactInfoSection>(pageData.data.sections, "law.contact-info-section")
  const contactCTASection = getSection<ContactCTA>(pageData.data.sections, "law.contact-cta")
  const legalAidSection = getSection<SimpleCTA>(pageData.data.sections, "law.simple-cta")

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        {heroSection && (
          <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white py-20">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-balance">{heroSection.title}</h1>
                <p className="text-xl text-blue-100 text-pretty">{heroSection.subtitle}</p>
              </div>
            </div>
          </section>
        )}

        {/* Contact Information & Form */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              {contactInfoSection && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-serif font-bold text-primary mb-6">{contactInfoSection.heading}</h2>
                    <div
                      className="text-lg text-muted-foreground leading-relaxed mb-8"
                      dangerouslySetInnerHTML={{ __html: contactInfoSection.description }}
                    />
                  </div>

                  <div className="space-y-6">
                    {contactInfoSection.cards.map((card) => {
                      const IconComponent = iconMap[card.icon] || Phone
                      return (
                        <Card key={card.id} className="border-l-4 border-l-secondary">
                          <CardContent className="p-6">
                            <div className="flex items-start space-x-4">
                              <div className="bg-secondary/10 p-3 rounded-lg">
                                <IconComponent className="h-6 w-6 text-secondary" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-primary mb-2">{card.title}</h3>
                                <div className="space-y-1">
                                  {card.value ? (
                                    <p className="text-muted-foreground">
                                      {card.href ? (
                                        <a href={card.href} className="hover:text-secondary transition-colors">
                                          {card.value}
                                        </a>
                                      ) : (
                                        card.value
                                      )}
                                    </p>
                                  ) : null}
                                  {card.lines?.map((line) => (
                                    <p key={line.id} className="text-muted-foreground">
                                      {line.text}
                                    </p>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Contact Form */}
              {contactCTASection && (
                <div>
                  <Card className="shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-2xl font-serif text-primary">{contactCTASection.formTitle}</CardTitle>
                      <p className="text-muted-foreground">{contactCTASection.formDescription}</p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <form className="space-y-6">
                        {contactCTASection.formFields.map((field) => {
                          if (field.fieldType === "textarea") {
                            return (
                              <div key={field.id}>
                                <label className="block text-sm font-medium text-primary mb-2">
                                  {field.label} {field.required && "*"}
                                </label>
                                <Textarea placeholder={field.placeholder} rows={5} />
                              </div>
                            )
                          } else if (field.fieldType === "select") {
                            return (
                              <div key={field.id}>
                                <label className="block text-sm font-medium text-primary mb-2">
                                  {field.label} {field.required && "*"}
                                </label>
                                <select className="w-full p-3 border border-input rounded-md bg-background">
                                  <option value="">{field.placeholder}</option>
                                  {(field.options ?? []).map((option) => (
                                    <option key={option.id} value={option.value}>
                                      {option.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            )
                          } else {
                            return (
                              <div key={field.id}>
                                <label className="block text-sm font-medium text-primary mb-2">
                                  {field.label} {field.required && "*"}
                                </label>
                                <Input type={field.fieldType} placeholder={field.placeholder} />
                              </div>
                            )
                          }
                        })}

                        <Button className="w-full bg-secondary hover:bg-secondary/90 text-white cursor-pointer">
                          <Send className="h-4 w-4 mr-2" />
                          {contactCTASection.formSubmitLabel}
                        </Button>

                        <p className="text-xs text-muted-foreground text-center">
                          By submitting this form, you agree to our privacy policy. This form does not create an
                          attorney-client relationship.
                        </p>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Legal Aid Information */}
        {legalAidSection && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-serif font-bold text-primary mb-6">{legalAidSection.title}</h2>
                <div
                  className="text-lg text-muted-foreground mb-8 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: legalAidSection.description }}
                />
                <Button
                  variant="outline"
                  className="border-secondary text-secondary hover:bg-secondary hover:text-white bg-transparent cursor-pointer"
                >
                  <Link href={legalAidSection.primaryCta.url}>{legalAidSection.primaryCta.label}</Link>
                </Button>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}
