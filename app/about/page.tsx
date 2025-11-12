import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Scale, Users, Award, Clock, User } from "lucide-react"
import Link from "next/link"
import { getLawAboutPage, getSection } from "@/lib/api/law-about-page"
import type { HeroSimple, MissionSection, FeatureGrid, TeamSection, SimpleCTA } from "@/lib/api/law-about-page"

export default async function AboutPage() {
  const pageData = await getLawAboutPage()

  if (!pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Failed to load page content</p>
      </div>
    )
  }

  const heroSection = getSection<HeroSimple>(pageData.data.sections, "law.hero-simple")
  const missionSection = getSection<MissionSection>(pageData.data.sections, "law.mission-section")
  const featureGrid = getSection<FeatureGrid>(pageData.data.sections, "law.feature-grid")
  const teamSection = getSection<TeamSection>(pageData.data.sections, "law.team-section")
  const legalAidSection = getSection<SimpleCTA>(pageData.data.sections, "law.simple-cta")

  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Scale,
    Users,
    Award,
    Clock,
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* HERO SECTION */}
        {heroSection && (
          <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white py-20">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-balance">{heroSection.title}</h1>
                <p className="text-xl text-blue-100 text-pretty leading-relaxed">{heroSection.subtitle}</p>
              </div>
            </div>
          </section>
        )}

        {/* MISSION & VALUES */}
        {missionSection && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h2 className="text-3xl font-serif font-bold text-primary mb-6">{missionSection.heading}</h2>
                  <div
                    className="text-lg text-muted-foreground leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: missionSection.body }}
                  />
                  <Link href={missionSection.cta.url}>
                    <Button className="bg-secondary hover:bg-secondary/90 text-white px-6 py-3 text-lg font-medium transition hover:scale-[1.02] cursor-pointer">
                      {missionSection.cta.label}
                    </Button>
                  </Link>
                </div>
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
        )}

        {/* WHY CHOOSE US */}
        {featureGrid && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-serif font-bold text-primary mb-4">{featureGrid.heading}</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  {featureGrid.subheading}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
                {featureGrid.items.map((card, i) => {
                  const IconComponent = iconMap[card.icon] || Scale
                  return (
                    <Card
                      key={i}
                      className="text-center flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
                    >
                      <CardContent className="p-6 flex flex-col flex-1">
                        <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                          <IconComponent className="h-8 w-8 text-secondary" />
                        </div>
                        <h3 className="text-xl font-semibold text-primary mb-3">{card.title}</h3>
                        <p className="text-muted-foreground leading-relaxed flex-1">{card.description}</p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* OUR TEAM */}
        {teamSection && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-serif font-bold text-primary mb-4">{teamSection.heading}</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  {teamSection.subheading}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-stretch max-w-3xl mx-auto">
                {teamSection.members.map((member, i) => (
                  <Card
                    key={i}
                    className="text-center flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
                  >
                    <CardContent className="p-6 flex flex-col flex-1">
                      <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="h-10 w-10 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-primary">{member.name}</h3>
                      <p className="text-sm font-medium mb-3 text-secondary">{member.role}</p>
                      <div className="text-xs space-y-1 leading-relaxed text-muted-foreground">
                        {member.details.map((line, j) => (
                          <p key={j}>{line.text}</p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* LEGAL AID INFO */}
        {legalAidSection && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-serif font-bold text-primary mb-6">{legalAidSection.title}</h2>
                <div
                  className="text-lg text-muted-foreground mb-8 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: legalAidSection.description }}
                />
                <Link href={legalAidSection.primaryCta.url}>
                  <Button
                    variant="outline"
                    className="border-secondary text-secondary hover:bg-secondary hover:text-white bg-transparent transition hover:scale-[1.02] cursor-pointer"
                  >
                    {legalAidSection.primaryCta.label}
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}
