"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Heart, Award, Users, Target } from "lucide-react"
import { motion } from "framer-motion"

const values = [
  {
    icon: Heart,
    title: "Integrity",
    description:
      "We believe in honesty, transparency, and doing what's right—even when it's not the easy road. Our clients’ trust is our greatest asset, and we guard it fiercely in every decision we make.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "Every case matters, and we bring focus, diligence, and skill to everything we do. We continuously strive for exceptional outcomes for every client we represent.",
  },
  {
    icon: Users,
    title: "Compassion",
    description:
      "We never forget the human side of law. We treat our clients with empathy, respect, and genuine concern for their well-being at every stage of the legal process.",
  },
  {
    icon: Target,
    title: "Commitment",
    description:
      "Your goals are our goals. We work tirelessly to protect your interests and achieve the best possible results through perseverance and strategic action.",
  },
]

const whyChooseUs = [
  "Personalized Attention: You are never just a file number. We take the time to understand your story and unique circumstances.",
  "Comprehensive Services: From immigration and family law to criminal defense and estate planning—all under one trusted roof.",
  "Trusted Advocacy: Decades of combined experience navigating Ontario's complex legal landscape with proven results.",
  "Client-Centered Approach: We measure success by the trust, peace of mind, and satisfaction of those we serve.",
]

export function AboutSection() {
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
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-foreground">About Us</h2>
          <p className="text-xl text-muted-foreground text-pretty mb-4">
            Our mission is simple: to make the law accessible, approachable, and effective for everyone we serve.
          </p>
          <p className="text-muted-foreground text-pretty leading-relaxed">
            We are committed to helping clients navigate legal challenges with clarity and confidence, offering
            thoughtful guidance and strategic solutions tailored to their unique situations.
          </p>
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
            <h3 className="text-2xl font-serif font-bold mb-6 text-foreground">Why Choose Bekwyn Law PC?</h3>
            <ul className="space-y-4">
              {whyChooseUs.map((reason, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-accent mt-1 font-bold">•</span>
                  <span className="text-muted-foreground leading-relaxed">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* OUR VALUES */}
        <div>
          <h3 className="text-2xl font-serif font-bold mb-8 text-center text-foreground">Our Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center flex flex-col justify-between h-full hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-6 flex flex-col flex-1">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-accent/10 rounded-full">
                      <value.icon className="h-8 w-8 text-accent" />
                    </div>
                  </div>
                  <h4 className="text-lg font-serif font-bold mb-3 text-foreground">{value.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
