"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, ArrowRight, Phone, Calendar, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function WillsPowersAttorneyPage() {
  const services = [
    {
      title: "Will Preparation & Estate Planning",
      description: "Comprehensive will drafting and estate planning to protect your assets and loved ones.",
      details: [
        "Simple and complex will preparation",
        "Estate planning strategies and tax minimization",
        "Trust creation and administration",
        "Beneficiary designations and updates",
        "Regular will reviews and updates",
      ],
    },
    {
      title: "Powers of Attorney",
      description: "Authorize trusted individuals to act on your behalf for property or personal care matters.",
      details: [
        "Power of Attorney for Property and Personal Care",
        "Continuing and non-continuing powers of attorney",
        "Revocation and amendment of existing documents",
        "Capacity assessments and documentation",
        "Healthcare and financial decision support",
      ],
    },
    {
      title: "Estate Administration",
      description: "Guidance through probate and estate settlement procedures.",
      details: [
        "Probate applications and estate trustee duties",
        "Asset identification and valuation",
        "Debt settlement and tax clearances",
        "Beneficiary distribution and reporting",
        "Dispute resolution and mediation",
      ],
    },
    {
      title: "Guardianship Applications",
      description: "Legal representation for guardianship of property and personal care.",
      details: [
        "Court applications for guardianship",
        "Capacity evaluations and medical evidence",
        "Ongoing guardianship administration",
        "Dispute resolution and mediation",
        "Court representation and advocacy",
      ],
    },
    {
      title: "Estate Disputes & Litigation",
      description: "Resolving estate disputes and will challenges efficiently and respectfully.",
      details: [
        "Will challenges and validity issues",
        "Beneficiary entitlement disputes",
        "Estate trustee removals and objections",
        "Court litigation and settlements",
        "Mediation and alternative resolutions",
      ],
    },
    {
      title: "Business Succession Planning",
      description: "Strategic continuity planning for business owners and family enterprises.",
      details: [
        "Buy-sell agreements and ownership transitions",
        "Corporate restructuring for tax efficiency",
        "Key person and life insurance planning",
        "Trust and share transfer mechanisms",
        "Next-generation leadership planning",
      ],
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative py-20 overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/practice-wills.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-primary/50 to-primary/30"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex items-center space-x-4 mb-6"
              >
                <div className="bg-secondary/20 p-4 rounded-xl">
                  <FileText className="h-12 w-12 text-secondary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-balance">
                  Wills & Powers of Attorney
                </h1>
              </motion.div>
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-blue-100 leading-relaxed"
              >
                Secure your family’s future with tailored estate planning — from will preparation to power of attorney
                and estate administration guidance.
              </motion.p>
            </div>
          </div>
        </motion.section>

        {/* Main Section */}
        <section className="py-16 bg-white" id="practice-wills">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="text-3xl font-serif font-bold text-primary mb-6">
                  Our Estate Planning Practice
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Proper estate planning ensures your wishes are respected and your loved ones are protected. Our
                  lawyers assist in creating robust wills, managing estates, and planning for business succession.
                </p>
              </motion.div>

              <div className="grid lg:grid-cols-2 gap-8 mb-16 items-stretch">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex"
                  >
                    <Card className="h-full flex flex-col justify-between hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-secondary">
                      <CardContent className="p-6 flex flex-col justify-between h-full">
                        <div>
                          <div className="flex items-start space-x-3 mb-4">
                            <ArrowRight className="h-5 w-5 text-secondary mt-1" />
                            <div>
                              <h3 className="text-xl font-semibold text-primary mb-3">{service.title}</h3>
                              <p className="text-muted-foreground leading-relaxed mb-4">{service.description}</p>
                            </div>
                          </div>
                          <ul className="ml-8 space-y-2">
                            {service.details.map((d, i) => (
                              <li key={i} className="flex items-start space-x-2">
                                <CheckCircle className="h-4 w-4 text-secondary mt-0.5" />
                                <span className="text-sm text-muted-foreground">{d}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-8 text-center"
                id="contact"
              >
                <h3 className="text-2xl font-serif font-bold text-primary mb-4">
                  Ready to Plan Your Estate?
                </h3>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Protect your assets and your loved ones today. Book a personalized estate planning consultation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="#contact">
                    <Button className="bg-secondary hover:bg-secondary/90 text-white">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Consultation
                    </Button>
                  </a>
                  <a href="tel:+14162278400">
                    <Button
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call +1 (289) 838-2982
                    </Button>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
