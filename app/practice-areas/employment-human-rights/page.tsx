"use client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, ArrowRight, Phone, Calendar, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function EmploymentHumanRightsPage() {
  const services = [
    {
      title: "Wrongful Dismissal & Termination",
      description: "Legal representation for employees facing wrongful dismissal or unfair termination.",
      details: [
        "Wrongful dismissal claims and severance negotiations",
        "Constructive dismissal and workplace changes",
        "Employment contract review and negotiation",
        "Severance package evaluation and enhancement",
        "Non-compete and restrictive covenant disputes",
      ],
    },
    {
      title: "Human Rights Complaints",
      description: "Advocacy for discrimination and harassment cases in the workplace.",
      details: [
        "Human Rights Tribunal applications and representation",
        "Workplace discrimination based on protected grounds",
        "Sexual harassment and workplace harassment claims",
        "Accommodation duty failures and disability rights",
        "Reprisal and retaliation protection",
      ],
    },
    {
      title: "Employment Standards Violations",
      description: "Enforcement of minimum employment standards and worker rights.",
      details: [
        "Unpaid wages and overtime claims",
        "Vacation pay and statutory holiday entitlements",
        "Pregnancy and parental leave violations",
        "Employment Standards Act compliance",
        "Ministry of Labour complaint assistance",
      ],
    },
    {
      title: "Workplace Safety & WSIB",
      description: "Legal support for workplace injury and safety matters.",
      details: [
        "WSIB claim appeals and benefit disputes",
        "Return-to-work accommodation issues",
        "Workplace safety violations and reprisals",
        "Occupational health and safety compliance",
        "Long-term disability claim support",
      ],
    },
    {
      title: "Employment Contract Services",
      description: "Contract drafting, review, and negotiation for employees and employers.",
      details: [
        "Employment agreement review and negotiation",
        "Executive compensation and benefit packages",
        "Non-disclosure and confidentiality agreements",
        "Independent contractor vs. employee classification",
        "Workplace policy development and review",
      ],
    },
    {
      title: "Labour Relations & Unions",
      description: "Representation in unionized workplace matters and labour disputes.",
      details: [
        "Grievance procedures and arbitration",
        "Collective bargaining support",
        "Union certification and decertification",
        "Labour board applications and hearings",
        "Strike and lockout legal issues",
      ],
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative py-20 overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/practice-employment.jpg')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/60 via-primary/50 to-primary/40"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-white">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex items-center space-x-4 mb-6"
              >
                <div className="bg-secondary/20 p-4 rounded-xl">
                  <Briefcase className="h-12 w-12 text-secondary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-balance">Employment & Human Rights</h1>
              </motion.div>
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-blue-100 text-pretty leading-relaxed"
              >
                Comprehensive employment law and human rights representation protecting workers' rights, addressing
                workplace discrimination, and ensuring fair treatment in all employment matters.
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
                  Our Employment & Human Rights Practice
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Every worker deserves fair treatment and respect in the workplace. Our employment and human rights
                  practice provides strong advocacy for employees facing discrimination, wrongful dismissal, and
                  workplace violations. We also assist employers with compliance and policy development to create fair
                  and inclusive workplaces.
                </p>
              </motion.div>

              {/* Services Grid */}
              <div className="grid lg:grid-cols-2 gap-8 mb-16">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-secondary">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-3 mb-4">
                          <ArrowRight className="h-5 w-5 text-secondary flex-shrink-0 mt-1" />
                          <div>
                            <h3 className="text-xl font-semibold text-primary mb-3">{service.title}</h3>
                            <p className="text-muted-foreground leading-relaxed mb-4">{service.description}</p>
                          </div>
                        </div>
                        <div className="ml-8">
                          <ul className="space-y-2">
                            {service.details.map((detail, detailIndex) => (
                              <li key={detailIndex} className="flex items-start space-x-2">
                                <CheckCircle className="h-4 w-4 text-secondary flex-shrink-0 mt-0.5" />
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

              {/* Call to Action */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-8 text-center"
              >
                <h3 className="text-2xl font-serif font-bold text-primary mb-4">Facing Workplace Issues?</h3>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Don't let workplace violations go unaddressed. Contact us for experienced employment law
                  representation and human rights advocacy.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button className="bg-secondary hover:bg-secondary/90 text-white">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Consultation
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call (416) 227-8400
                  </Button>
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
