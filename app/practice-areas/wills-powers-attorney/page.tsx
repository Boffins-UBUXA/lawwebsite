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
      description: "Legal documents authorizing trusted individuals to make decisions on your behalf.",
      details: [
        "Power of Attorney for Property (financial decisions)",
        "Power of Attorney for Personal Care (healthcare decisions)",
        "Continuing and non-continuing powers of attorney",
        "Revocation and amendment of existing powers",
        "Capacity assessments and documentation",
      ],
    },
    {
      title: "Estate Administration",
      description: "Guidance through the probate process and estate settlement procedures.",
      details: [
        "Probate applications and court procedures",
        "Estate trustee appointments and duties",
        "Asset identification and valuation",
        "Debt settlement and tax clearances",
        "Distribution of estate assets to beneficiaries",
      ],
    },
    {
      title: "Guardianship Applications",
      description: "Legal representation for guardianship of property and person applications.",
      details: [
        "Guardianship of property applications",
        "Guardianship of person applications",
        "Capacity assessments and medical evidence",
        "Court representation and advocacy",
        "Ongoing guardianship administration support",
      ],
    },
    {
      title: "Estate Disputes & Litigation",
      description: "Resolution of estate-related conflicts and will challenges.",
      details: [
        "Will challenges and validity disputes",
        "Beneficiary rights and entitlements",
        "Estate trustee disputes and removal",
        "Mediation and settlement negotiations",
        "Court representation in estate litigation",
      ],
    },
    {
      title: "Business Succession Planning",
      description: "Strategic planning for business continuity and ownership transition.",
      details: [
        "Buy-sell agreements and succession plans",
        "Corporate restructuring for succession",
        "Tax-efficient ownership transfers",
        "Key person insurance planning",
        "Family business transition strategies",
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
              backgroundImage: `url('/practice-wills.jpg')`,
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
                  <FileText className="h-12 w-12 text-secondary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-balance">Wills & Powers of Attorney</h1>
              </motion.div>
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-blue-100 text-pretty leading-relaxed"
              >
                Comprehensive estate planning services including will preparation, powers of attorney, and estate
                administration to protect your assets and ensure your wishes are carried out.
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
                <h2 className="text-3xl font-serif font-bold text-primary mb-6">Our Estate Planning Practice</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Proper estate planning is essential for protecting your assets and ensuring your wishes are carried
                  out. Our experienced team provides comprehensive estate planning services, from simple wills to
                  complex estate structures. We help you plan for the future while providing peace of mind for you and
                  your loved ones.
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
                <h3 className="text-2xl font-serif font-bold text-primary mb-4">Ready to Plan Your Estate?</h3>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Don't wait to protect your assets and loved ones. Contact us today to discuss your estate planning
                  needs and create a comprehensive plan.
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
