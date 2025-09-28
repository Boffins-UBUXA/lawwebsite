"use client"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Users, Heart, Shield, FileText, Briefcase, Scale } from "lucide-react"
import { motion } from "framer-motion"

export default function PracticeAreasPage() {
  const practiceAreas = [
    {
      icon: Users,
      title: "Immigration & Refugee Law",
      slug: "immigration-refugee-law",
      backgroundImage: "/practice-immigration.jpg",
    },
    {
      icon: Heart,
      title: "Family Law",
      slug: "family-law",
      backgroundImage: "/practice-family.jpg",
    },
    {
      icon: Shield,
      title: "Criminal Law – Family, Summary & Youth Matters",
      slug: "criminal-law",
      backgroundImage: "/practice-criminal.jpg",
    },
    {
      icon: FileText,
      title: "Wills & Powers of Attorney",
      slug: "wills-powers-attorney",
      backgroundImage: "/practice-wills.jpg",
    },
    {
      icon: Briefcase,
      title: "Employment & Human Rights",
      slug: "employment-human-rights",
      backgroundImage: "/practice-employment.jpg",
    },
    {
      icon: Scale,
      title: "Civil Litigation",
      slug: "civil-litigation",
      backgroundImage: "/practice-litigation.jpg",
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
          className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white py-20 overflow-hidden"
        >
          <div className="absolute inset-0">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute -top-20 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.1, 1, 1.1],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 25,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="absolute -bottom-20 -left-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
            />
          </div>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-5xl font-serif font-bold mb-6 text-balance"
              >
                Areas of Practice
              </motion.h1>
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-blue-100 text-pretty"
              >
                Comprehensive legal services across multiple practice areas to meet all your legal needs
              </motion.p>
            </div>
          </div>
        </motion.section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {practiceAreas.map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={`/practice-areas/${area.slug}`}>
                    <Card className="group relative h-80 overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0">
                      {/* Background Image */}
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{
                          backgroundImage: `url('${area.backgroundImage}')`,
                        }}
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-primary/90 group-hover:via-primary/60 group-hover:to-primary/30 transition-all duration-500" />

                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                        <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }} className="mb-4">
                          <area.icon className="h-12 w-12 text-secondary group-hover:text-white transition-colors duration-300" />
                        </motion.div>

                        <motion.h3
                          initial={{ y: 20, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 + 0.3 }}
                          className="text-2xl font-serif font-bold mb-2 text-balance group-hover:text-secondary transition-colors duration-300"
                        >
                          {area.title}
                        </motion.h3>

                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "3rem" }}
                          transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
                          className="h-1 bg-secondary group-hover:bg-white transition-colors duration-300"
                        />
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-serif font-bold text-primary mb-6">Need Legal Assistance?</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Our experienced legal team is ready to help you navigate your legal challenges. Contact us today for a
                consultation to discuss your specific needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-secondary hover:bg-secondary/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Schedule Consultation
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-lg font-semibold transition-all bg-transparent"
                >
                  Call (416) 227-8400
                </motion.button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
