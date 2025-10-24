"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Users, Heart, Shield, FileText, Briefcase, Scale, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { getLawPracticeAreas, getImageUrl, type PracticeArea } from "@/lib/api/law-practice-areas"
import { getLawPracticeAreasPage, type PracticeAreasPageContent } from "@/lib/api/law-practice-areas-page"

// Icon mapping based on icon name from API
const iconMap: Record<string, any> = {
  users: Users,
  heart: Heart,
  shield: Shield,
  filetext: FileText,
  briefcase: Briefcase,
  scale: Scale,
}

function parseNumericId(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value
  if (typeof value === "string") {
    const parsed = Number.parseInt(value, 10)
    if (!Number.isNaN(parsed)) return parsed
  }
  return null
}

export default function PracticeAreasPage() {
  const [practiceAreas, setPracticeAreas] = useState<PracticeArea[]>([])
  const [pageContent, setPageContent] = useState<PracticeAreasPageContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPracticeAreas = async () => {
      try {
        setLoading(true)
        const [pageData, allPracticeAreas] = await Promise.all([
          getLawPracticeAreasPage(),
          getLawPracticeAreas(),
        ])
        setPageContent(pageData)

        if (pageData) {
          const refs = Array.isArray(pageData.practiceAreaRefs) ? pageData.practiceAreaRefs : []

          if (refs.length > 0) {
            const byId = new Map(
              allPracticeAreas
                .map((area) => [parseNumericId(area.id), area] as const)
                .filter(([key]) => key !== null)
            )
            const byDocumentId = new Map(
              allPracticeAreas
                .filter((area) => area.documentId)
                .map((area) => [(area.documentId as string).toLowerCase(), area])
            )
            const bySlug = new Map(
              allPracticeAreas
                .filter((area) => area.slug)
                .map((area) => [area.slug.toLowerCase(), area])
            )

            const ordered = refs
              .map((ref) => {
                const refId = parseNumericId(ref.id)
                if (refId !== null && byId.has(refId)) return byId.get(refId)

                const refDocumentId = ref.documentId?.toLowerCase()
                if (refDocumentId && byDocumentId.has(refDocumentId)) return byDocumentId.get(refDocumentId)

                const refSlug = ref.slug?.toLowerCase()
                if (refSlug && bySlug.has(refSlug)) return bySlug.get(refSlug)

                return undefined
              })
              .filter((area): area is PracticeArea => Boolean(area))

            if (ordered.length > 0) {
              setPracticeAreas(ordered)
            } else if (pageData.practiceAreas.length > 0) {
              setPracticeAreas(pageData.practiceAreas)
            } else {
              setPracticeAreas([])
            }
          } else if (pageData.practiceAreas.length > 0) {
            setPracticeAreas(pageData.practiceAreas)
          } else {
            setPracticeAreas([])
          }
        } else {
          setPracticeAreas(allPracticeAreas)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load practice areas')
      } finally {
        setLoading(false)
      }
    }

    fetchPracticeAreas()
  }, [])

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
                {pageContent?.heroTitle || "Areas of Practice"}
              </motion.h1>
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-blue-100 text-pretty"
              >
                {pageContent?.heroSubtitle ||
                  "Comprehensive legal services across multiple practice areas to meet all your legal needs"}
              </motion.p>
            </div>
          </div>
        </motion.section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-red-600 text-lg">{error}</p>
              </div>
            ) : practiceAreas.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">No practice areas found.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {practiceAreas.map((area, index) => {
                  const IconComponent = getIconComponent(area.icon)
                  const backgroundImageUrl = area.backgroundImage 
                    ? getImageUrl(area.backgroundImage)
                    : '/practice-default.jpg'

                  return (
                    <motion.div
                      key={area.id}
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
                              backgroundImage: `url('${backgroundImageUrl}')`,
                            }}
                          />

                          {/* Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-primary/90 group-hover:via-primary/60 group-hover:to-primary/30 transition-all duration-500" />

                          {/* Content */}
                          <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                            <motion.div 
                              whileHover={{ scale: 1.1 }} 
                              transition={{ duration: 0.3 }} 
                              className="mb-4"
                            >
                              <IconComponent className="h-12 w-12 text-secondary group-hover:text-white transition-colors duration-300" />
                            </motion.div>

                            <motion.h3
                              initial={{ y: 20, opacity: 0 }}
                              whileInView={{ y: 0, opacity: 1 }}
                              transition={{ delay: index * 0.1 + 0.3 }}
                              className="text-2xl font-serif font-bold mb-2 text-balance group-hover:text-secondary transition-colors duration-300"
                            >
                              {area.title}
                            </motion.h3>

                            {area.cardSummary && (
                              <p className="text-sm text-white/80 mb-3 line-clamp-2">
                                {area.cardSummary}
                              </p>
                            )}

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
                  )
                })}
              </div>
            )}
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
                <a href="tel:+12898382982">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-lg font-semibold transition-all bg-transparent"
                  >
                    Call +1 (289) 838-2982
                  </motion.button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
