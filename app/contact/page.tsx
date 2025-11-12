"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react"
import Link from "next/link"

type FormStatus = "idle" | "loading" | "success" | "error"

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  service: "",
  message: "",
  company: "",
}

export default function ContactPage() {
  const [formData, setFormData] = useState(initialForm)
  const [status, setStatus] = useState<FormStatus>("idle")
  const [errors, setErrors] = useState<string[]>([])
  const [feedback, setFeedback] = useState<string | null>(null)

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
    if (!formData.firstName.trim()) validationErrors.push("First name is required.")
    if (!formData.lastName.trim()) validationErrors.push("Last name is required.")
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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const body = await response.json().catch(() => ({}))

      if (!response.ok || body?.ok === false) {
        const detail = body?.error || body?.errors?.[0] || "We couldn't send your message right now."
        throw new Error(detail)
      }

      setStatus("success")
      setFeedback("Thank you! We've received your message and will respond shortly.")
      setFormData(initialForm)
    } catch (error: any) {
      setStatus("error")
      setFeedback(error?.message || "We couldn't send your message right now.")
    }
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white py-20">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-balance">Contact Us</h1>
              <p className="text-xl text-blue-100 text-pretty">
                Get in touch with our legal team for a consultation about your legal needs
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information & Form */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-serif font-bold text-primary mb-6">Get In Touch</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    We're here to help you with your legal needs. Contact us today to schedule a consultation and
                    discuss how we can assist you.
                  </p>
                </div>

                <div className="space-y-6">
                  <Card className="border-l-4 border-l-secondary">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-secondary/10 p-3 rounded-lg">
                          <Phone className="h-6 w-6 text-secondary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-primary mb-2">Phone Numbers</h3>
                          <p className="text-muted-foreground">+1 (289) 838 2982</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-secondary">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-secondary/10 p-3 rounded-lg">
                          <Mail className="h-6 w-6 text-secondary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-primary mb-2">Email</h3>
                          <p className="text-muted-foreground">info@bekwynlaw.com</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-secondary">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-secondary/10 p-3 rounded-lg">
                          <MapPin className="h-6 w-6 text-secondary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-primary mb-2">Location</h3>
                          <p className="text-muted-foreground">
                            Serving clients across Burlington,
                            <br />
                            Ontario and beyond
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-secondary">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-secondary/10 p-3 rounded-lg">
                          <Clock className="h-6 w-6 text-secondary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-primary mb-2">Office Hours</h3>
                          <p className="text-muted-foreground">
                            Monday - Friday: 9:00 AM - 5:00 PM
                            <br />
                            Saturday: By appointment
                            <br />
                            Sunday: Closed
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl font-serif text-primary">Schedule a Consultation</CardTitle>
                    <p className="text-muted-foreground">
                      Fill out the form below and we'll get back to you within 24 hours.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-primary mb-2" htmlFor="firstName">
                            First Name *
                          </label>
                          <Input
                            id="firstName"
                            name="firstName"
                            placeholder="Your first name"
                            value={formData.firstName}
                            onChange={handleChange("firstName")}
                            autoComplete="given-name"
                            required
                            disabled={status === "loading"}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-primary mb-2" htmlFor="lastName">
                            Last Name *
                          </label>
                          <Input
                            id="lastName"
                            name="lastName"
                            placeholder="Your last name"
                            value={formData.lastName}
                            onChange={handleChange("lastName")}
                            autoComplete="family-name"
                            required
                            disabled={status === "loading"}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-primary mb-2" htmlFor="email">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={handleChange("email")}
                          autoComplete="email"
                          required
                          disabled={status === "loading"}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-primary mb-2" htmlFor="phone">
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="(416) 123-4567"
                          value={formData.phone}
                          onChange={handleChange("phone")}
                          autoComplete="tel"
                          disabled={status === "loading"}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-primary mb-2" htmlFor="service">
                          Legal Matter Type
                        </label>
                        <select
                          id="service"
                          name="service"
                          className="w-full p-3 border border-input rounded-md bg-background"
                          value={formData.service}
                          onChange={handleChange("service")}
                          disabled={status === "loading"}
                        >
                          <option value="">Select a practice area</option>
                          <option value="immigration">Immigration & Refugee Law</option>
                          <option value="family">Family Law</option>
                          <option value="criminal">Criminal Law</option>
                          <option value="wills">Wills & Powers of Attorney</option>
                          <option value="employment">Employment & Human Rights</option>
                          <option value="civil">Civil Litigation</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-primary mb-2" htmlFor="message">
                          Message *
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Please describe your legal matter and how we can help you..."
                          rows={5}
                          value={formData.message}
                          onChange={handleChange("message")}
                          required
                          disabled={status === "loading"}
                        />
                      </div>

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
                        <p className={`text-sm ${status === "success" ? "text-secondary" : "text-red-600"}`}>
                          {feedback}
                        </p>
                      )}

                      <Button
                        type="submit"
                        className="w-full bg-secondary hover:bg-secondary/90 text-white cursor-pointer"
                        disabled={status === "loading"}
                      >
                        {status === "loading" ? (
                          <div className="flex items-center justify-center space-x-2">
                            <Send className="h-4 w-4 animate-pulse" />
                            <span>Sending...</span>
                          </div>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            <span>Send Message</span>
                          </>
                        )}
                      </Button>
                    </form>

                    <p className="text-xs text-muted-foreground text-center">
                      By submitting this form, you agree to our privacy policy. This form does not create an
                      attorney-client relationship.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Legal Aid Information */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-serif font-bold text-primary mb-6">Legal Aid Ontario</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We accept Legal Aid Ontario certificates. If you qualify for legal aid, please mention this when you
                contact us to schedule your consultation.
              </p>
              <Button
                variant="outline"
                className="border-secondary text-secondary hover:bg-secondary hover:text-white bg-transparent cursor-pointer"
              >
                <Link href="/legal-aid">Learn About Legal Aid Eligibility</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}