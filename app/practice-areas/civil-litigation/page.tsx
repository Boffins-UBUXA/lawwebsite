"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Scale, ArrowRight, Phone, Calendar, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function CivilLitigationPage() {
  const services = [
    {
      title: "Contract Disputes",
      description: "Resolution of commercial and personal contract disagreements and breaches.",
      details: [
        "Breach of contract claims and defenses",
        "Contract interpretation and enforcement",
        "Commercial agreement disputes",
        "Service and supply contract issues",
        "Damages assessment and recovery",
      ],
    },
    {
      title: "Personal Injury Claims",
      description: "Comprehensive representation for accident victims and injury claims.",
      details: [
        "Motor vehicle accident claims",
        "Slip and fall injury cases",
        "Medical malpractice claims",
        "Product liability and defective products",
        "Insurance claim disputes and bad faith",
      ],
    },
    {
      title: "Property & Real Estate Disputes",
      description: "Legal resolution of property-related conflicts and real estate matters.",
      details: [
        "Boundary and easement disputes",
        "Landlord and tenant conflicts",
        "Real estate transaction disputes",
        "Construction lien and defect claims",
        "Condominium and strata disputes",
      ],
    },
    {
      title: "Debt Collection & Recovery",
      description: "Efficient collection of outstanding debts and financial obligations.",
      details: [
        "Commercial debt collection procedures",
        "Judgment enforcement and garnishment",
        "Asset seizure and realization",
        "Bankruptcy and insolvency proceedings",
        "Settlement negotiations and payment plans",
      ],
    },
    {
      title: "Business & Commercial Litigation",
      description: "Complex commercial disputes and business-related legal conflicts.",
      details: [
        "Partnership and shareholder disputes",
        "Corporate governance conflicts",
        "Intellectual property infringement",
        "Competition and trade disputes",
        "Professional negligence claims",
      ],
    },
    {
      title: "Appeals & Judicial Review",
      description: "Appellate representation and judicial review of administrative decisions.",
      details: [
        "Court of Appeal proceedings",
        "Judicial review applications",
        "Administrative tribunal appeals",
        "Leave to appeal applications",
        "Constitutional and Charter challenges",
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
            style={{ backgroundImage: "url('/practice-litigation.jpg')" }}
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
                  <Scale className="h-12 w-12 text-secondary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-balance">
                  Civil Litigation
                </h1>
              </motion.div>
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-blue-100 leading-relaxed"
              >
                Experienced civil litigation representation for complex disputes, personal injury claims, contract
                breaches, and all civil court matters with strategic advocacy and a results-focused approach.
              </motion.p>
            </div>
          </div>
        </motion.section>

        {/* Services Section */}
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
                  Our Civil Litigation Practice
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  When disputes cannot be resolved through negotiation, experienced litigation counsel becomes
                  essential. Our civil litigation practice provides strategic representation in complex disputes,
                  personal injury claims, and commercial conflicts.
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
                              <p className="text-muted-foreground leading-relaxed mb-4">
                                {service.description}
                              </p>
                            </div>
                          </div>
                          <ul className="ml-8 space-y-2">
                            {service.details.map((detail, detailIndex) => (
                              <li key={detailIndex} className="flex items-start space-x-2">
                                <CheckCircle className="h-4 w-4 text-secondary mt-0.5" />
                                <span className="text-sm text-muted-foreground">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-8 text-center"
              >
                <h3 className="text-2xl font-serif font-bold text-primary mb-4">
                  Need Litigation Representation?
                </h3>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Complex disputes require experienced litigation counsel. Contact us for strategic representation and
                  aggressive advocacy in your civil litigation matter.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button className="bg-secondary hover:bg-secondary/90 text-white">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Consultation
                    </Button>
                  </Link>
                  <a href="tel:+12898382982">
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
