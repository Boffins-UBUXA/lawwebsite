"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, Clock, MapPin } from "lucide-react"
import Link from "next/link"

export function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-foreground">💬 Let's Talk</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Your legal challenges deserve a listening ear and skilled advocacy. Contact us today to book your free
            15-minute consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* LEFT: Contact Info */}
          <Card className="h-full flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-2xl font-serif text-foreground">Get In Touch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 flex-1">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Phone className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <a href="tel:+12898382982" className="font-medium text-foreground hover:underline">
                    +1 (289) 838-2982
                  </a>
                  <p className="text-sm text-muted-foreground">Call for immediate assistance</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Mail className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <a href="mailto:info@bekwynlaw.com" className="font-medium text-foreground hover:underline">
                    info@bekwynlaw.com
                  </a>
                  <p className="text-sm text-muted-foreground">Send us your inquiry</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <MapPin className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Ontario, Canada</p>
                  <p className="text-sm text-muted-foreground">Serving clients across Ontario</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Clock className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Flexible Hours</p>
                  <p className="text-sm text-muted-foreground">Phone, video, or in-person consultations</p>
                </div>
              </div>
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
                  Take the first step towards resolving your legal matter. We offer a complimentary 15-minute
                  consultation to discuss your situation and how we can help.
                </p>

                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">What to expect:</h4>
                  <ul className="space-y-2 text-primary-foreground/90">
                    <li className="flex items-start space-x-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Initial assessment of your legal matter</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Overview of potential legal options</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-accent mt-1">•</span>
                      <span>Clear explanation of next steps</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-accent mt-1">•</span>
                      <span>No obligation to proceed</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* ✅ Working Button */}
              <Link href="/contact#form">
                <Button variant="secondary" size="lg" className="w-full mt-6 hover:scale-[1.02] transition">
                  Schedule Your Free Consultation
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
