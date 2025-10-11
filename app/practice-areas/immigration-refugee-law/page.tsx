"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, ArrowRight, Phone, Calendar } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function ImmigrationRefugeeLawPage() {
  const services = [
    {
      title: "Family Class Sponsorship",
      description:
        "Helping reunite families by sponsoring spouses, children, parents, and grandparents to come to Canada.",
    },
    {
      title: "Work & Study Permits",
      description:
        "Assisting with LMIA applications, post-graduation work permits, study permit extensions, and renewals.",
    },
    {
      title: "Permanent Residence Applications",
      description:
        "Guiding clients through Express Entry, PNP, and Canadian Experience Class applications for PR.",
    },
    {
      title: "Refugee Protection Claims",
      description:
        "Providing legal representation for refugee hearings, pre-removal risk assessments, and humanitarian applications.",
    },
    {
      title: "Citizenship Applications",
      description:
        "Helping permanent residents apply for and obtain Canadian citizenship with confidence.",
    },
    {
      title: "Appeals & Judicial Reviews",
      description:
        "Handling immigration appeals and judicial reviews for refused or delayed applications.",
    },
    {
      title: "Business Immigration",
      description:
        "Supporting entrepreneurs and investors through start-up visa and self-employed programs.",
    },
    {
      title: "Inadmissibility Issues",
      description:
        "Advising clients on overcoming criminal, medical, or misrepresentation inadmissibility matters.",
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
            style={{ backgroundImage: "url('/practice-immigration.jpg')" }}
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
                  <Users className="h-12 w-12 text-secondary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-balance">
                  Immigration & Refugee Law
                </h1>
              </motion.div>
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-blue-100 leading-relaxed"
              >
                Comprehensive immigration and refugee services guiding individuals, families, and businesses through
                Canada’s complex immigration system with expertise and compassion.
              </motion.p>
            </div>
          </div>
        </motion.section>

        {/* Services Section */}
        <section className="py-16 bg-white" id="practice-immigration">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <h2 className="text-3xl font-serif font-bold text-primary mb-6">
                  Our Immigration & Refugee Practice
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our team provides legal support for all aspects of Canadian immigration law — from work and study
                  permits to appeals and refugee protection — ensuring your case is handled with diligence and care.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8 mb-16 items-stretch">
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
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-3">
                          <ArrowRight className="h-5 w-5 text-secondary mt-1" />
                          <div>
                            <h3 className="text-xl font-semibold text-primary mb-3">{service.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                          </div>
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
                  Ready to Begin Your Immigration Journey?
                </h3>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Book a confidential consultation with our immigration lawyers today and take the next step toward your
                  future in Canada.
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
