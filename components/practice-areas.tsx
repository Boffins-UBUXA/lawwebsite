"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Scale, Users, Shield, FileText, Briefcase, Home, LucideIcon } from "lucide-react"
import { motion } from "framer-motion"
import type { PracticeSection, ContentHighlight } from "@/lib/api/law-home-page"
import { stripHtml } from "@/lib/api/law-home-page"

interface PracticeAreasProps {
  data: PracticeSection;
  contentHighlights?: ContentHighlight[];
}

// Map icon names to Lucide components
const iconMap: Record<string, LucideIcon> = {
  Scale,
  Users,
  Shield,
  FileText,
  Briefcase,
  Home,
};

// Default background images (fallback if not provided from CMS)
const defaultBackgrounds: Record<string, string> = {
  "immigration": "/practice-immigration.jpg",
  "family": "/practice-family.jpg",
  "criminal": "/practice-criminal.jpg",
  "wills": "/practice-wills.jpg",
  "employment": "/practice-employment.jpg",
  "civil": "/practice-litigation.jpg",
};

export function PracticeAreas({ data, contentHighlights = [] }: PracticeAreasProps) {
  const cleanDescription = stripHtml(data.description);
  
  // Find notary and legal aid sections
  const notarySection = contentHighlights.find(h => h.title.toLowerCase().includes("notary"));
  const legalAidSection = contentHighlights.find(h => h.title.toLowerCase().includes("legal aid"));

  return (
    <section id="practice-areas" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-foreground">
            ⚖️ {data.heading}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            {cleanDescription}
          </p>
        </div>

        {/* Practice Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.practiceAreas.map((area, index) => {
            const IconComponent = iconMap[area.icon] || Scale;
            const backgroundImage = defaultBackgrounds[area.slug.split('-')[0]] || "/practice-immigration.jpg";

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
                        backgroundImage: `url('${backgroundImage}')`,
                      }}
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-primary/90 group-hover:via-primary/60 group-hover:to-primary/30 transition-all duration-500" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                      <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }} className="mb-4">
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
            );
          })}
        </div>

        {/* Notary Services Section */}
        {notarySection && (
          <div className="mt-16 bg-accent/10 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-serif font-bold mb-4 text-foreground">
              📋 {notarySection.title}
            </h3>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-left">
                <p className="text-muted-foreground mb-4">
                  {stripHtml(notarySection.description)}
                </p>
                {notarySection.bullets.length > 0 && (
                  <ul className="text-sm text-muted-foreground space-y-2 mb-4">
                    {notarySection.bullets.map((bullet) => (
                      <li key={bullet.id}>• {bullet.title}</li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="relative h-48 md:h-64 rounded-lg overflow-hidden">
                <img
                  src="/notary.jpeg"
                  alt="Professional notary services"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
            </div>
          </div>
        )}

        {/* Legal Aid Section */}
        {legalAidSection && (
          <div className="mt-16 bg-accent/10 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-serif font-bold mb-4 text-foreground">
              🧾 {legalAidSection.title}
            </h3>
            <div className="text-muted-foreground mb-4">
              {stripHtml(legalAidSection.description)
                .split('\n')
                .map((para, i) => (
                  <p key={i} className={i > 0 ? 'mt-4' : ''}>
                    {para}
                  </p>
                ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}