"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Scale, Users, Award, Clock, User } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* ✅ HERO SECTION */}
        <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white py-20">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-balance">
                About Bekwyn Law PC
              </h1>
              <p className="text-xl text-blue-100 text-pretty leading-relaxed">
                Dedicated to providing exceptional legal services with integrity, compassion, and expertise.
              </p>
            </div>
          </div>
        </section>

        {/* ✅ MISSION & VALUES */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* LEFT: Text Content */}
              <div className="space-y-6">
                <h2 className="text-3xl font-serif font-bold text-primary mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  At Bekwyn Law PC, we are committed to providing our clients with personalized, professional legal
                  services. We understand that legal issues can be overwhelming, and we strive to make the process as
                  smooth and stress-free as possible, no matter the complexity of your case.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our approach is client-focused, ensuring that each individual receives the attention and expertise
                  they deserve. We believe in building lasting relationships based on trust, transparency, and results
                  that truly make a difference.
                </p>

                {/* ✅ Working button to contact form */}
                <Link href="/contact#form">
                  <Button className="bg-secondary hover:bg-secondary/90 text-white px-6 py-3 text-lg font-medium transition hover:scale-[1.02]">
                    Schedule Consultation
                  </Button>
                </Link>
              </div>

              {/* RIGHT: Image */}
              <div className="relative">
                <img
                  src="/professional-african-woman-lawyer-in-dark-blue-bla.jpg"
                  alt="Professional lawyer consultation"
                  className="rounded-lg shadow-xl w-full h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ✅ WHY CHOOSE US */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-primary mb-4">
                Why Choose Bekwyn Law PC?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                We combine legal expertise with personalized service to deliver exceptional results for our clients.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
              {[
                {
                  icon: Scale,
                  title: "Legal Expertise",
                  text: "Comprehensive knowledge across multiple practice areas, backed by years of courtroom and advisory experience.",
                },
                {
                  icon: Users,
                  title: "Client-Focused",
                  text: "Personalized attention, open communication, and tailored solutions for each client’s unique situation.",
                },
                {
                  icon: Award,
                  title: "Proven Results",
                  text: "A strong record of successful outcomes and satisfied clients across Ontario’s diverse legal landscape.",
                },
                {
                  icon: Clock,
                  title: "Timely Service",
                  text: "Responsive communication and efficient handling of all legal matters—because time matters to you.",
                },
              ].map((card, i) => (
                <Card
                  key={i}
                  className="text-center flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
                >
                  <CardContent className="p-6 flex flex-col flex-1">
                    <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <card.icon className="h-8 w-8 text-secondary" />
                    </div>
                    <h3 className="text-xl font-semibold text-primary mb-3">{card.title}</h3>
                    <p className="text-muted-foreground leading-relaxed flex-1">{card.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ✅ OUR TEAM */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-primary mb-4">Our Team</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Meet our experienced legal professionals dedicated to serving your needs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
              {[
                {
                  name: "Sophie Ibekwe",
                  role: "Partner, Litigation Lead",
                  details: ["LL.B, B.L., LL.M., PhD", "Barrister & Solicitor", "Ontario & Nigeria", "Notary Public"],
                },
                {
                  name: "Kingsley Ibekwe",
                  role: "Immigration Lead",
                  details: [
                    "MSc, ACIT, CPA (Ireland)",
                    "RCIC-IRB",
                    "Commissioner for Taking Affidavits",
                    "Province of Ontario",
                  ],
                },
                {
                  name: "Team Member",
                  role: "Position Title",
                  details: ["Qualifications", "Coming Soon"],
                  placeholder: true,
                },
                {
                  name: "Team Member",
                  role: "Position Title",
                  details: ["Qualifications", "Coming Soon"],
                  placeholder: true,
                },
              ].map((member, i) => (
                <Card
                  key={i}
                  className={`text-center flex flex-col justify-between hover:shadow-lg transition-shadow duration-300 ${
                    member.placeholder ? "opacity-50" : ""
                  }`}
                >
                  <CardContent className="p-6 flex flex-col flex-1">
                    <div
                      className={`${
                        member.placeholder ? "bg-gray-100" : "bg-primary/10"
                      } w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                      <User
                        className={`h-10 w-10 ${
                          member.placeholder ? "text-gray-400" : "text-primary"
                        }`}
                      />
                    </div>
                    <h3
                      className={`text-xl font-semibold mb-2 ${
                        member.placeholder ? "text-gray-400" : "text-primary"
                      }`}
                    >
                      {member.name}
                    </h3>
                    <p
                      className={`text-sm font-medium mb-3 ${
                        member.placeholder ? "text-gray-400" : "text-secondary"
                      }`}
                    >
                      {member.role}
                    </p>
                    <div
                      className={`text-xs space-y-1 leading-relaxed ${
                        member.placeholder ? "text-gray-400" : "text-muted-foreground"
                      }`}
                    >
                      {member.details.map((line, j) => (
                        <p key={j}>{line}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ✅ LEGAL AID INFO */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-serif font-bold text-primary mb-6">Legal Aid Ontario</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We are proud to accept Legal Aid Ontario certificates, ensuring that quality legal representation is
                accessible to those who need it most. Our commitment to justice extends beyond our paying clients to
                serve the broader community.
              </p>
              <Link href="/contact#form">
                <Button
                  variant="outline"
                  className="border-secondary text-secondary hover:bg-secondary hover:text-white bg-transparent transition hover:scale-[1.02]"
                >
                  Learn More About Legal Aid
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
