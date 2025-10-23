"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Phone, Calendar, CheckCircle, Loader2, Users, Heart, Shield, FileText, Briefcase, Scale } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { getLawPracticeAreaBySlug, getImageUrl, type PracticeArea } from "@/lib/api/law-practice-areas"

// Icon mapping
const iconMap: Record<string, any> = {
  users: Users,
  heart: Heart,
  shield: Shield,
  filetext: FileText,
  briefcase: Briefcase,
  scale: Scale,
}

export default function PracticeAreaDetailPage() {
  const params = useParams()
  const slug = params?.slug as string
  
  const [practiceArea, setPracticeArea] = useState<PracticeArea | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPracticeArea = async () => {
      if (!slug) return
      
      try {
        setLoading(true)
        const data = await getLawPracticeAreaBySlug(slug)
        if (data) {
          setPracticeArea(data)
        } else {
          setError('Practice area not found')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load practice area')
      } finally {
        setLoading(false)
      }
    }

    fetchPracticeArea()
  }, [slug])

  // Helper to get icon component
  const getIconComponent = (iconName?: string) => {
    if (!iconName) return Scale
    const normalizedIcon = iconName.toLowerCase().replace(/[-_\s]/g, '')
    return iconMap[normalizedIcon] || Scale
  }

  // Helper to get default background image based on slug
  const getDefaultBackgroundImage = (slug: string) => {
    const imageMap: Record<string, string> = {
      'immigration-refugee-law': '/practice-immigration.jpg',
      'family-law': '/practice-family.jpg',
      'criminal-law': '/practice-criminal.jpg',
      'wills-powers-attorney': '/practice-wills.jpg',
      'employment-human-rights': '/practice-employment.jpg',
      'civil-litigation': '/practice-litigation.jpg',
    }
    return imageMap[slug] || '/practice-default.jpg'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center py-20">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !practiceArea) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary mb-4">Practice Area Not Found</h1>
            <p className="text-muted-foreground mb-8">{error || "The practice area you're looking for doesn't exist."}</p>
            <Link href="/practice-areas">
              <Button className="bg-secondary hover:bg-secondary/90 text-white">
                View All Practice Areas
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const IconComponent = getIconComponent(practiceArea.icon)
  const backgroundImageUrl = practiceArea.backgroundImage 
    ? getImageUrl(practiceArea.backgroundImage)
    : getDefaultBackgroundImage(practiceArea.slug)

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
            style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
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
                  <IconComponent className="h-12 w-12 text-secondary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-balance">
                  {practiceArea.title}
                </h1>
              </motion.div>
              {practiceArea.intro && (
                <motion.p
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-xl text-blue-100 leading-relaxed"
                >
                  {practiceArea.intro}
                </motion.p>
              )}
            </div>
          </div>
        </motion.section>

        {/* Main Content Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              {practiceArea.body && (
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  className="mb-12"
                >
                  <div 
                    className="prose prose-lg max-w-none text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: practiceArea.body }}
                  />
                </motion.div>
              )}

              {/* Services Section */}
              {practiceArea.services && practiceArea.services.length > 0 && (
                <div className="grid lg:grid-cols-2 gap-8 mb-16 items-stretch">
                  {practiceArea.services.map((service, index) => (
                    <motion.div
                      key={service.id}
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
                                  {service.summary}
                                </p>
                              </div>
                            </div>
                            {service.details && service.details.length > 0 && (
                              <ul className="ml-8 space-y-2">
                                {service.details.map((detail) => (
                                  <li key={detail.id} className="flex items-start space-x-2">
                                    <CheckCircle className="h-4 w-4 text-secondary mt-0.5" />
                                    <span className="text-sm text-muted-foreground">{detail.text}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Call to Action */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="bg-gray-50 rounded-2xl p-8 text-center"
              >
                <h3 className="text-2xl font-serif font-bold text-primary mb-4">
                  Need Legal Assistance?
                </h3>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Contact us today for a consultation to discuss your specific legal needs.
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