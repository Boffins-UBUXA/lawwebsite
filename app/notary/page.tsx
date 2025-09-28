"use client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Users, Clock, FileCheck, Shield, MapPin, Phone, Mail, CheckCircle, Building, Plane } from "lucide-react"
import { motion } from "framer-motion"

const notaryServices = [
  {
    icon: FileCheck,
    title: "Affidavits & Statutory Declarations",
    description:
      "Professional witnessing and certification of sworn statements and declarations for legal proceedings.",
    features: ["Court affidavits", "Insurance claims", "Identity verification", "Witness statements"],
  },
  {
    icon: Shield,
    title: "Document Certification",
    description: "Official authentication and certification of important documents for various purposes.",
    features: ["Educational transcripts", "Medical records", "Financial documents", "Legal contracts"],
  },
  {
    icon: Users,
    title: "Signature Witnessing",
    description: "Professional witnessing of signatures on important legal and business documents.",
    features: ["Contract signing", "Power of attorney", "Wills and estates", "Business agreements"],
  },
  {
    icon: Plane,
    title: "Travel Document Services",
    description: "Specialized notarization for travel-related documents and international requirements.",
    features: ["Passport applications", "Visa documents", "Travel consent letters", "International certificates"],
  },
  {
    icon: Building,
    title: "Real Estate Documents",
    description: "Expert notarization services for real estate transactions and property-related documents.",
    features: ["Purchase agreements", "Mortgage documents", "Property transfers", "Lease agreements"],
  },
  {
    icon: CheckCircle,
    title: "Corporate Services",
    description: "Professional notary services for business and corporate document requirements.",
    features: ["Corporate resolutions", "Board meeting minutes", "Partnership agreements", "Business licenses"],
  },
]

const processSteps = [
  {
    step: "01",
    title: "Schedule Appointment",
    description: "Contact us to book your notary appointment at a convenient time.",
  },
  {
    step: "02",
    title: "Prepare Documents",
    description: "Gather all required documents and valid government-issued identification.",
  },
  {
    step: "03",
    title: "Meet & Verify",
    description: "Meet with our notary public for identity verification and document review.",
  },
  {
    step: "04",
    title: "Complete Service",
    description: "Sign, witness, and receive your properly notarized documents.",
  },
]

export default function NotaryPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6 text-balance">
                  Professional Notary Services
                </h1>
                <p className="text-xl text-muted-foreground mb-8 text-pretty">
                  Reliable, efficient, and professional notary public services for all your document authentication
                  needs. Fast turnaround with attention to detail you can trust.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="text-lg px-8">
                    Book Appointment
                  </Button>
                  <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                    View Services
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative h-96 rounded-2xl overflow-hidden">
                  <img
                    src="/notary.jpeg"
                    alt="Professional notary services office"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                </div>

                {/* Floating Stats Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-6 shadow-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">24hr</p>
                      <p className="text-sm text-muted-foreground">Turnaround</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-foreground">
                Comprehensive Notary Services
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                From document certification to signature witnessing, we provide a full range of notary services to meet
                your personal and business needs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {notaryServices.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border">
                    <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>

                    <h3 className="text-xl font-serif font-bold mb-3 text-foreground">{service.title}</h3>

                    <p className="text-muted-foreground mb-4 text-pretty">{service.description}</p>

                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-foreground">Simple 4-Step Process</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
                Getting your documents notarized is quick and straightforward with our streamlined process.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="text-center"
                >
                  <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-serif font-bold mb-3 text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground text-pretty">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-foreground">
                  Ready to Get Started?
                </h2>
                <p className="text-xl text-muted-foreground mb-8 text-pretty">
                  Contact us today to schedule your notary appointment. We offer flexible scheduling and competitive
                  rates for all notary services.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <span className="text-foreground">+1 (289) 8383-2982</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <span className="text-foreground">info@bekwynlaw.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span className="text-foreground">Bekwyn Law Head Office, Ontario, Canada</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Card className="p-8 border-border">
                  <h3 className="text-2xl font-serif font-bold mb-6 text-foreground">Schedule Your Appointment</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Service Needed</label>
                      <select className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground">
                        <option>Select a service</option>
                        <option>Document Certification</option>
                        <option>Affidavit Witnessing</option>
                        <option>Signature Witnessing</option>
                        <option>Travel Documents</option>
                        <option>Real Estate Documents</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                      <textarea
                        rows={4}
                        className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                        placeholder="Tell us about your notary needs"
                      />
                    </div>
                    <Button className="w-full">Schedule Appointment</Button>
                  </form>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}
