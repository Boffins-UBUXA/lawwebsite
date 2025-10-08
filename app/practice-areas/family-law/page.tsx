"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, ArrowRight, Phone, Calendar, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function FamilyLawPage() {
  const services = [
    {
      title: "Divorce & Separation",
      description: "Comprehensive legal guidance through divorce proceedings and separation agreements.",
      details: [
        "Uncontested and contested divorce proceedings",
        "Separation agreements and cohabitation agreements",
        "Property division and asset valuation",
        "Spousal support calculations and modifications",
        "Mediation and collaborative divorce options",
      ],
    },
    {
      title: "Child Custody & Access",
      description: "Protecting children's best interests in custody and access arrangements.",
      details: [
        "Joint and sole custody arrangements",
        "Parenting plans and schedules",
        "Access rights for non-custodial parents",
        "Relocation and mobility issues",
        "Enforcement of custody orders",
      ],
    },
    {
      title: "Child & Spousal Support",
      description: "Ensuring fair financial support arrangements for families.",
      details: [
        "Child support calculations using federal guidelines",
        "Special and extraordinary expenses",
        "Spousal support assessments and duration",
        "Support modification applications",
        "Enforcement of support orders",
      ],
    },
    {
      title: "Property Division",
      description: "Equitable distribution of matrimonial property and assets.",
      details: [
        "Matrimonial home rights and division",
        "Business valuation and division",
        "Pension and RRSP division",
        "Debt allocation and responsibility",
        "Pre-nuptial and marriage contract enforcement",
      ],
    },
    {
      title: "Adoption Services",
      description: "Legal assistance with all types of adoption proceedings.",
      details: [
        "Private and agency adoptions",
        "Step-parent and relative adoptions",
        "International adoption procedures",
        "Adult adoption processes",
        "Post-adoption legal services",
      ],
    },
    {
      title: "Domestic Violence & Protection",
      description: "Legal protection and support for domestic violence situations.",
      details: [
        "Restraining orders and peace bonds",
        "Emergency protection applications",
        "Safety planning and legal advice",
        "Court representation in protection proceedings",
        "Coordination with support services",
      ],
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative py-20 overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/practice-family.jpg')" }}
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
                  <Heart className="h-12 w-12 text-secondary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-balance">
                  Family Law
                </h1>
              </motion.div>
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-blue-100 leading-relaxed"
              >
                Compassionate and experienced family law representation for divorce, custody, support, and all
                family-related legal matters with a focus on protecting your family's future.
              </motion.p>
            </div>
          </div>
        </motion.section>

        {/* Main Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="text-3xl font-serif font-bold text-primary mb-6">
                  Our Family Law Practice
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Family law matters are deeply personal and emotionally challenging. Our experienced team provides
                  compassionate representation while protecting your rights and your family’s future.
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
                              <h3 className="text-xl font-semibold text-primary mb-3">
                                {service.title}
                              </h3>
                              <p className="text-muted-foreground leading-relaxed mb-4">
                                {service.description}
                              </p>
                            </div>
                          </div>
                          <ul className="ml-8 space-y-2">
                            {service.details.map((detail, i) => (
                              <li key={i} className="flex items-start space-x-2">
                                <CheckCircle className="h-4 w-4 text-secondary mt-0.5" />
                                <span className="text-sm text-muted-foreground">
                                  {detail}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Call to Action */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-8 text-center"
              >
                <h3 className="text-2xl font-serif font-bold text-primary mb-4">
                  Need Family Law Assistance?
                </h3>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Family matters require sensitive and experienced legal guidance. Contact us for a confidential
                  consultation today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button className="bg-secondary hover:bg-secondary/90 text-white">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Consultation
                    </Button>
                  </Link>
                  <a href="tel:+14162278400">
                    <Button
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call (416) 227-8400
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
