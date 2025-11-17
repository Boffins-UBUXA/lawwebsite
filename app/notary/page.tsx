"use client"

import { useState, type ChangeEvent, type FormEvent, useEffect } from "react"
import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FileCheck, Shield, Users, Plane, Building, CheckCircle, Clock, MapPin, Phone, Mail } from "lucide-react"
import Link from "next/link"
import { getLawNotaryPage, getSection } from "@/lib/api/law-notary-page"
import type { HeroBlock, ServiceGrid, ProcessStepsBlock, ContactCTA } from "@/lib/api/law-notary-page"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileCheck,
  Shield,
  Users,
  Plane,
  Building,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  MapPin,
}

type FormStatus = "idle" | "loading" | "success" | "error"

const initialForm = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
  company: "",
}

export default function NotaryPage() {
  const [pageData, setPageData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState(initialForm)
  const [status, setStatus] = useState<FormStatus>("idle")
  const [errors, setErrors] = useState<string[]>([])
  const [feedback, setFeedback] = useState<string | null>(null)

  useEffect(() => {
    getLawNotaryPage().then((data) => {
      setPageData(data)
      setLoading(false)
    })
  }, [])

  const handleChange =
    (field: keyof typeof initialForm) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFormData((prev) => ({ ...prev, [field]: event.target.value }))
    }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrors([])
    setFeedback(null)

    const validationErrors: string[] = []
    if (!formData.name.trim()) validationErrors.push("Name is required.")
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      validationErrors.push("A valid email address is required.")
    if (!formData.message.trim()) validationErrors.push("Message is required.")

    if (validationErrors.length) {
      setStatus("error")
      setErrors(validationErrors)
      return
    }

    setStatus("loading")

    try {
      const response = await fetch("/api/notary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const body = await response.json().catch(() => ({}))

      if (!response.ok) {
        const detail = body?.error || body?.errors?.[0] || "We couldn't send your message right now."
        throw new Error(detail)
      }

      // Success even if Strapi failed but email was sent
      setStatus("success")
      setFeedback("Thank you! We've received your inquiry and will respond within 24 hours.")
      setFormData(initialForm)
      
      // Scroll to feedback message
      setTimeout(() => {
        const feedbackElement = document.querySelector('[data-feedback]')
        feedbackElement?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 100)
    } catch (error: any) {
      setStatus("error")
      setFeedback(error?.message || "We couldn't send your message right now.")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {/* <p className="text-xl text-muted-foreground">Loading...</p> */}
      </div>
    )
  }

  if (!pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Failed to load page content</p>
      </div>
    )
  }

  const heroSection = getSection<HeroBlock>(pageData.data.sections, "law.hero-block")
  const serviceGrid = getSection<ServiceGrid>(pageData.data.sections, "law.service-grid")
  const processSteps = getSection<ProcessStepsBlock>(pageData.data.sections, "blocks.process-steps-block")
  const contactSection = getSection<ContactCTA>(pageData.data.sections, "law.contact-cta")

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-background">
        {/* HERO SECTION */}
        {heroSection && (
          <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6 text-balance">
                    {heroSection.title}
                  </h1>
                  <div
                    className="text-xl text-muted-foreground mb-8 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: heroSection.description }}
                  />
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href={heroSection.primaryCta.url}>
                      <Button size="lg" className="text-lg px-8 hover:scale-[1.02] transition cursor-pointer">
                        {heroSection.primaryCta.label}
                      </Button>
                    </Link>
                    <Link href={heroSection.secondaryCta.url}>
                      <Button
                        variant="outline"
                        size="lg"
                        className="text-lg px-8 bg-transparent hover:scale-[1.02] transition cursor-pointer"
                      >
                        {heroSection.secondaryCta.label}
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="relative">
                  <div className="relative h-96 rounded-2xl overflow-hidden">
                    <img
                      src="/notary.jpeg"
                      alt="Professional notary services office"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                  </div>

                  <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-6 shadow-lg">
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">24hr</p>
                        <p className="text-sm text-muted-foreground">Turnaround</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SERVICES GRID */}
        {serviceGrid && (
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-foreground">{serviceGrid.title}</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  {serviceGrid.description}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                {serviceGrid.services.map((service) => {
                  const IconComponent = iconMap[service.icon] || FileCheck
                  return (
                    <Card
                      key={service.id}
                      className="p-6 flex flex-col justify-between h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border"
                    >
                      <div>
                        <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="text-xl font-serif font-bold mb-3 text-foreground">{service.title}</h3>
                        <p className="text-muted-foreground mb-4 leading-relaxed">{service.summary}</p>
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* PROCESS SECTION */}
        {processSteps && (
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-foreground">{processSteps.title}</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  {processSteps.description}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
                {processSteps.steps.map((step) => (
                  <div key={step.id} className="text-center flex flex-col justify-between h-full">
                    <div>
                      <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                        {step.stepNumber}
                      </div>
                      <h3 className="text-xl font-serif font-bold mb-3 text-foreground">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CONTACT SECTION */}
        {contactSection && (
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left */}
                <div>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-foreground">
                    {contactSection.heading}
                  </h2>
                  <div
                    className="text-xl text-muted-foreground mb-8 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: contactSection.description }}
                  />

                  <div className="space-y-4">
                    {contactSection.contactPoints.map((point) => {
                      const IconComponent = iconMap[point.icon] || Phone
                      return (
                        <div key={point.id} className="flex items-center space-x-3">
                          <IconComponent className="h-5 w-5 text-primary" />
                          {point.href ? (
                            <a href={point.href} className="text-foreground hover:underline">
                              {point.value}
                            </a>
                          ) : (
                            <span className="text-foreground">{point.value}</span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Right - Form */}
                <Card className="p-8 border-border h-full flex flex-col justify-between">
                  <h3 className="text-2xl font-serif font-bold mb-6 text-foreground">{contactSection.formTitle}</h3>
                  <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                    {contactSection.formFields.map((field) => {
                      if (field.fieldType === "textarea") {
                        return (
                          <div key={field.id}>
                            <label className="block text-sm font-medium text-foreground mb-2">{field.label}</label>
                            <textarea
                              rows={4}
                              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                              placeholder={field.placeholder}
                              value={formData.message}
                              onChange={handleChange("message")}
                              required={field.required}
                              disabled={status === "loading"}
                            />
                          </div>
                        )
                      } else if (field.fieldType === "select") {
                        return (
                          <div key={field.id}>
                            <label className="block text-sm font-medium text-foreground mb-2">{field.label}</label>
                            <select
                              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                              value={formData.service}
                              onChange={handleChange("service")}
                              disabled={status === "loading"}
                            >
                              <option value="">{field.placeholder}</option>
                              <option value="document-certification">Document Certification</option>
                              <option value="affidavit-witnessing">Affidavit Witnessing</option>
                              <option value="signature-witnessing">Signature Witnessing</option>
                              <option value="travel-documents">Travel Documents</option>
                              <option value="real-estate">Real Estate Documents</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        )
                      } else {
                        // Map field labels to form data keys
                        const fieldKey =
                          field.label.toLowerCase().includes("name")
                            ? "name"
                            : field.label.toLowerCase().includes("email")
                              ? "email"
                              : field.label.toLowerCase().includes("phone")
                                ? "phone"
                                : "name"

                        return (
                          <div key={field.id}>
                            <label className="block text-sm font-medium text-foreground mb-2">{field.label}</label>
                            <input
                              type={field.fieldType}
                              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                              placeholder={field.placeholder}
                              value={formData[fieldKey as keyof typeof formData]}
                              onChange={handleChange(fieldKey as keyof typeof formData)}
                              required={field.required}
                              disabled={status === "loading"}
                            />
                          </div>
                        )
                      }
                    })}

                    {/* Honeypot field */}
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="company" className="sr-only">
                        Company
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={formData.company}
                        onChange={handleChange("company")}
                      />
                    </div>

                    {errors.length > 0 && (
                      <div className="text-sm text-red-600 space-y-1">
                        {errors.map((error) => (
                          <p key={error}>{error}</p>
                        ))}
                      </div>
                    )}

                    {feedback && (
                      <p className={`text-sm ${status === "success" ? "text-green-600" : "text-red-600"}`}>
                        {feedback}
                      </p>
                    )}

                    <Button
                      type="submit"
                      className="w-full hover:scale-[1.02] transition cursor-pointer"
                      disabled={status === "loading"}
                    >
                      {status === "loading" ? "Sending..." : contactSection.formSubmitLabel}
                    </Button>
                  </form>
                </Card>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}