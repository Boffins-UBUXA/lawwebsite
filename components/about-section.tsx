import { Card, CardContent } from "@/components/ui/card"
import { Heart, Award, Users, Target } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Integrity",
    description: "We believe in honesty, transparency, and doing what's right—even when it's not the easy road.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Every case matters, and we bring focus, diligence, and skill to everything we do.",
  },
  {
    icon: Users,
    title: "Compassion",
    description: "We never forget the human side of law. We treat our clients with empathy and respect.",
  },
  {
    icon: Target,
    title: "Commitment",
    description:
      "Your goals are our goals. We work tirelessly to protect your interests and achieve the best possible results.",
  },
]

const whyChooseUs = [
  "Personalized Attention: You are never just a file number. We take the time to understand your story.",
  "Comprehensive Services: From immigration and family law to criminal and more under one roof.",
  "Trusted Advocacy: Experience across diverse areas of law in Ontario's legal landscape.",
  "Client-Centered Approach: We measure success by the trust and satisfaction of the people we serve.",
]

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-foreground">About Us</h2>
          <p className="text-xl text-muted-foreground text-pretty">
          Our mission is simple: to make the law accessible, approachable, and effective for everyone we serve.
          </p>
          <p className="text-muted-foreground text-pretty">
              We are committed to helping clients navigate legal challenges with clarity and confidence, offering
              thoughtful guidance and strategic solutions tailored to their unique situations.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* <div>
            <h3 className="text-2xl font-serif font-bold mb-6 text-foreground">Our Mission</h3>
            <p className="text-lg text-muted-foreground mb-6 text-pretty">
              Our mission is simple: to make the law accessible, approachable, and effective for everyone we serve.
            </p>
            <p className="text-muted-foreground text-pretty">
              We are committed to helping clients navigate legal challenges with clarity and confidence, offering
              thoughtful guidance and strategic solutions tailored to their unique situations.
            </p>
          </div> */}
          <div className="">
                <img
                  src="/law-firm-about-us-meeting.jpg"
                  alt="Professional lawyer consultation"
                  className="rounded-lg shadow-xl w-full h-96 object-cover"
                />
              </div>

          <div>
            <h3 className="text-2xl font-serif font-bold mb-6 text-foreground">Why Choose Bekwyn Law PC?</h3>
            <ul className="space-y-4">
              {whyChooseUs.map((reason, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="text-accent mt-1 font-bold">•</span>
                  <span className="text-muted-foreground">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-serif font-bold mb-8 text-center text-foreground">Our Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-accent/10 rounded-full">
                      <value.icon className="h-8 w-8 text-accent" />
                    </div>
                  </div>
                  <h4 className="text-lg font-serif font-bold mb-3 text-foreground">{value.title}</h4>
                  <p className="text-sm text-muted-foreground text-pretty">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
