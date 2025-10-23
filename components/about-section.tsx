"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Heart, Award, Users, Target, LucideIcon } from "lucide-react"
import { motion } from "framer-motion"
import type { AboutBlock } from "@/lib/api/law-home-page"
import { stripHtml } from "@/lib/api/law-home-page"

interface AboutSectionProps {
  data: AboutBlock;
}

// Map icon names to Lucide components
const iconMap: Record<string, LucideIcon> = {
  Heart,
  Award,
  Users,
  Target,
};

export function AboutSection({ data }: AboutSectionProps) {
  // Parse intro text (may have multiple paragraphs)
  const introParts = data.intro
    .split('</p>')
    .filter(Boolean)
    .map(part => stripHtml(part).trim())
    .filter(Boolean);

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-foreground">
            {data.heading}
          </h2>
          {introParts.map((paragraph, index) => (
            <p 
              key={index} 
              className={`text-${index === 0 ? 'xl' : 'base'} text-muted-foreground text-pretty ${index > 0 ? 'mt-4' : ''} leading-relaxed`}
            >
              {paragraph}
            </p>
          ))}
        </motion.div>

        {/* WHY CHOOSE US */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-stretch">
          <div className="flex">
            <img
              src="/law-firm-about-us-meeting.jpg"
              alt="Professional lawyer consultation"
              className="rounded-lg shadow-xl w-full h-96 object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-serif font-bold mb-6 text-foreground">
              {data.whyTitle}
            </h3>
            <ul className="space-y-4">
              {data.whyItems.map((item, index) => (
                <li key={item.id} className="flex items-start space-x-3">
                  <span className="text-accent mt-1 font-bold">•</span>
                  <span className="text-muted-foreground leading-relaxed">{item.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* OUR VALUES */}
        <div>
          <h3 className="text-2xl font-serif font-bold mb-8 text-center text-foreground">
            {data.valuesTitle}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {data.values.map((value, index) => {
              const IconComponent = iconMap[value.icon] || Heart;
              
              return (
                <Card
                  key={value.id}
                  className="text-center flex flex-col justify-between h-full hover:shadow-lg transition-shadow duration-300"
                >
                  <CardContent className="p-6 flex flex-col flex-1">
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-accent/10 rounded-full">
                        <IconComponent className="h-8 w-8 text-accent" />
                      </div>
                    </div>
                    <h4 className="text-lg font-serif font-bold mb-3 text-foreground">
                      {value.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  )
}