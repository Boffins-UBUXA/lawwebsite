"use client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, ArrowRight, Phone, Calendar } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function CriminalLawPage() {
  const services = [
    {
      title: "Family Court Matters",
      description:
        "Comprehensive representation in family court for domestic violence cases, child protection proceedings, and family-related criminal charges with sensitive handling of complex family dynamics.",
    },
    {
      title: "Summary Conviction Offenses",
      description:
        "Expert defense for less serious criminal charges including theft under $5000, assault, mischief, and other summary offenses with focus on minimizing impact on your record.",
    },
    {
      title: "Youth Criminal Justice",
      description:
        "Specialized representation for young offenders under the Youth Criminal Justice Act, emphasizing rehabilitation and protecting future opportunities for youth clients.",
    },
    {
      title: "DUI/Impaired Driving",
      description:
        "Expert defense for impaired driving cases including breathalyzer challenges, Charter applications, and strategies to minimize penalties and protect your driving privileges.",
    },
    {
      title: "Assault Charges",
      description:
        "Comprehensive defense strategies for all levels of assault charges from simple assault to aggravated assault, with thorough investigation and evidence analysis.",
    },
    {
      title: "Appeals & Judicial Reviews",
      description:
        "Represent clients in criminal appeals to challenge convictions, seek sentence reductions, and pursue judicial reviews for procedural fairness issues.",
    },
    {
      title: "Bail Hearings",
      description:
        "Urgent representation for bail hearings to secure release pending trial, with comprehensive bail plans and surety arrangements.",
    },
    {
      title: "Peace Bonds & Restraining Orders",
      description:
        "Assistance with peace bond applications and defending against restraining order applications in family and criminal contexts.",
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
              backgroundImage: `url('/practice-criminal.jpg')`,
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
                  <Shield className="h-12 w-12 text-secondary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-balance">
                  Criminal Law – Family, Summary & Youth Matters
                </h1>
              </motion.div>
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-blue-100 text-pretty leading-relaxed"
              >
                Experienced criminal defense representation specializing in family court matters, summary conviction
                offenses, and youth criminal justice cases.
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
                <h2 className="text-3xl font-serif font-bold text-primary mb-6">Our Criminal Law Practice</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our criminal law practice offers experienced representation for family court matters, summary
                  conviction offenses, and youth criminal justice cases. We are dedicated to protecting your rights and
                  ensuring fair treatment in the legal system, with specialized expertise in cases involving families
                  and young offenders.
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
                  Need Criminal Defense Representation?
                </h3>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Contact us immediately for urgent criminal defense matters. We provide experienced representation for
                  family, summary, and youth criminal cases.
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
