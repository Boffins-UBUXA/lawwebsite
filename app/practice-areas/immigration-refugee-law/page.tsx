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
        "Help reunite families by sponsoring spouses, children, parents, and grandparents to come to Canada. We guide you through the complex application process, ensuring all documentation is properly prepared and submitted.",
    },
    {
      title: "Work Permits & Study Permits",
      description:
        "Assist with temporary residence applications for work and study purposes, including LMIA applications, post-graduation work permits, and study permit extensions.",
    },
    {
      title: "Permanent Residence Applications",
      description:
        "Guide you through Express Entry, Provincial Nominee Programs, Canadian Experience Class, and other immigration pathways to achieve your goal of permanent residence in Canada.",
    },
    {
      title: "Refugee Protection Claims",
      description:
        "Provide comprehensive legal representation for those seeking protection in Canada, including refugee hearings, pre-removal risk assessments, and humanitarian applications.",
    },
    {
      title: "Citizenship Applications",
      description:
        "Help eligible permanent residents become Canadian citizens through the citizenship application process, including preparation for citizenship tests and ceremonies.",
    },
    {
      title: "Appeals & Judicial Reviews",
      description:
        "Represent clients in immigration appeals before the Immigration Appeal Division and federal court judicial review proceedings for refused applications.",
    },
    {
      title: "Business Immigration",
      description:
        "Assist entrepreneurs and investors with business immigration programs, including start-up visa programs and self-employed persons programs.",
    },
    {
      title: "Inadmissibility Issues",
      description:
        "Help clients overcome inadmissibility issues including criminal inadmissibility, medical inadmissibility, and misrepresentation concerns.",
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
              backgroundImage: `url('/practice-immigration.jpg')`,
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
                  <Users className="h-12 w-12 text-secondary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-balance">Immigration & Refugee Law</h1>
              </motion.div>
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-blue-100 text-pretty leading-relaxed"
              >
                Comprehensive immigration services to help individuals, families, and businesses navigate Canada's
                complex immigration system with personalized attention and strategic guidance.
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
                <h2 className="text-3xl font-serif font-bold text-primary mb-6">Our Immigration Law Practice</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our immigration law practice provides comprehensive legal services to individuals, families, and
                  businesses navigating Canada's complex immigration system. We understand that immigration matters are
                  deeply personal and can significantly impact your future. Our experienced team is dedicated to
                  providing personalized attention and strategic guidance throughout your immigration journey.
                </p>
              </motion.div>

              {/* Services Grid */}
              <div className="grid md:grid-cols-2 gap-8 mb-16">
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
                        <div className="flex items-start space-x-3">
                          <ArrowRight className="h-5 w-5 text-secondary flex-shrink-0 mt-1" />
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

              {/* Call to Action */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-8 text-center"
              >
                <h3 className="text-2xl font-serif font-bold text-primary mb-4">
                  Ready to Start Your Immigration Journey?
                </h3>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Contact us today for a consultation to discuss your immigration needs and explore your options.
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
