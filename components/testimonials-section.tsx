"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import { motion } from "framer-motion"
import type { TestimonialsSection as TestimonialsSectionType } from "@/lib/api/law-home-page"
import type { LawTestimonial } from "@/lib/api/law-testimonials"
import { stripHtml } from "@/lib/api/law-home-page"

interface TestimonialsSectionProps {
  data: TestimonialsSectionType;
  testimonials: LawTestimonial[];
}

// Default images for testimonials
const defaultImages: Record<string, string> = {
  "Sarah Johnson": "/professional-woman-headshot.png",
  "Onyebuchi Nmadi": "/africa-man-law.jpeg",
  "Emily Rodriguez": "/professional-man-headshot.png",
};

export function TestimonialsSection({ data, testimonials }: TestimonialsSectionProps) {
  // Use testimonials from API if available, otherwise fallback to data from home page section
  const displayTestimonials = testimonials.length > 0 ? testimonials : data.testimonials;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
            {data.heading}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {data.subheading}
          </p>
        </motion.div>

        {displayTestimonials.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No testimonials available at the moment.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {displayTestimonials.map((testimonial, index) => {
              const cleanQuote = stripHtml(testimonial.quote);
              const image = defaultImages[testimonial.name] || "/placeholder.svg";

              return (
                <motion.div
                  key={testimonial.id}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="flex"
                >
                  <Card className="flex flex-col justify-between w-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-secondary">
                    <CardContent className="p-6 flex flex-col flex-1">
                      {/* Quote + Stars */}
                      <div>
                        <div className="flex items-center mb-4">
                          <Quote className="h-8 w-8 text-secondary/30 mr-2 flex-shrink-0" />
                          <div className="flex">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                            ))}
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-6 leading-relaxed italic line-clamp-6">
                          "{cleanQuote}"
                        </p>
                      </div>

                      {/* Avatar + Name */}
                      <div className="flex items-center mt-auto pt-4 border-t border-gray-100">
                        <img
                          src={image}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full mr-4 object-cover flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="font-semibold text-primary truncate">
                            {testimonial.name}
                          </h4>
                          {testimonial.role && (
                            <p className="text-sm text-muted-foreground truncate">
                              {testimonial.role}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  )
}