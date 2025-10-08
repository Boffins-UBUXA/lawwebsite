"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"
import { motion } from "framer-motion"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      content:
        "Bekwyn Law helped me navigate the complex immigration process with such care and expertise. They made what seemed impossible, possible. I'm now a proud Canadian resident thanks to their dedication.",
      rating: 5,
      image: "/professional-woman-headshot.png",
    },
    {
      name: "Onyebuchi Nmadi",
      content:
        "During one of the most difficult times in my life, the team at Bekwyn Law provided compassionate and effective legal support. They fought for my children's best interests and achieved an outcome I never thought possible.",
      rating: 5,
      image: "/africa-man-law.jpeg",
    },
    {
      name: "Emily Rodriguez",
      content:
        "The estate planning services were thorough and professional. They explained everything clearly and ensured my family's future is secure. I highly recommend their services to anyone needing legal assistance.",
      rating: 5,
      image: "/professional-man-headshot.png",
    },
  ]

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
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">What Our Clients Say</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients have to say about our legal services.
          </p>
        </motion.div>

        {/* ✅ Equal-height responsive cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
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
                      "{testimonial.content}"
                    </p>
                  </div>

                  {/* Avatar + Name */}
                  <div className="flex items-center mt-auto pt-4 border-t border-gray-100">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-semibold text-primary truncate">{testimonial.name}</h4>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
