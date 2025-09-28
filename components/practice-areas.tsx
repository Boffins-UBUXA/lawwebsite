"use client"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Scale, Users, Shield, FileText, Briefcase, Home } from "lucide-react"
import { motion } from "framer-motion"

const practiceAreas = [
  {
    icon: Users,
    title: "Immigration & Refugee Law",
    description: "We help individuals and families build their futures in Canada.",
    slug: "immigration-refugee-law",
    backgroundImage: "/practice-immigration.jpg",
    services: [
      "Study, work, and visitor visas",
      "Family sponsorships (spouse, child, parent)",
      "Express Entry, Provincial Nominee Program (PNP)",
      "Refugee claims and hearings before the IRB",
      "Citizenship applications and appeals",
    ],
  },
  {
    icon: Scale,
    title: "Family Law",
    description: "Compassionate guidance for families facing change and conflict.",
    slug: "family-law",
    backgroundImage: "/practice-family.jpg",
    services: [
      "Separation and divorce",
      "Parenting time (custody/access)",
      "Child and spousal support",
      "Separation agreements and parenting plans",
      "Property division and equalization",
    ],
  },
  {
    icon: Shield,
    title: "Criminal Law",
    description: "Protecting your rights at every stage of criminal proceedings.",
    slug: "criminal-law",
    backgroundImage: "/practice-criminal.jpg",
    services: [
      "Summary conviction matters",
      "Bail hearings and recognizance conditions",
      "Youth criminal justice cases",
      "Domestic assault and family-related charges",
      "Criminal record suspensions (pardons)",
    ],
  },
  {
    icon: FileText,
    title: "Wills & Powers of Attorney",
    description: "Protect your future and loved ones with clear estate planning.",
    slug: "wills-powers-attorney",
    backgroundImage: "/practice-wills.jpg",
    services: [
      "Simple wills and mirror wills for couples",
      "Powers of Attorney (personal care and property)",
      "Estate guidance for newcomers",
      "Probate and estate administration",
      "Guardianship and dependants' rights",
    ],
  },
  {
    icon: Briefcase,
    title: "Employment & Human Rights",
    description: "Protecting workers' rights and dignity in the workplace.",
    slug: "employment-human-rights",
    backgroundImage: "/practice-employment.jpg",
    services: [
      "Wrongful dismissal and constructive dismissal",
      "Unpaid wages and severance disputes",
      "Workplace discrimination or harassment",
      "Human Rights Tribunal proceedings",
      "WSIB and tribunal proceedings",
    ],
  },
  {
    icon: Home,
    title: "Civil Litigation & Tenancy",
    description: "Strategic advocacy for civil disputes and tenant rights.",
    slug: "civil-litigation",
    backgroundImage: "/practice-litigation.jpg",
    services: [
      "Breach of contract and service agreements",
      "Recovery of unpaid debts or loans",
      "Eviction defence and tenant rights",
      "Landlord and Tenant Board hearings",
      "Small claims court representation",
    ],
  },
]

export function PracticeAreas() {
  return (
    <section id="practice-areas" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-foreground">⚖️ Our Core Practice Areas</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            From immigration and family law to landlord-tenant, criminal, and other key practice areas, we offer a wide
            range of services tailored to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {practiceAreas.map((area, index) => (
            <motion.div
              key={index}
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
                      backgroundImage: `url('${area.backgroundImage}')`,
                    }}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-primary/90 group-hover:via-primary/60 group-hover:to-primary/30 transition-all duration-500" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }} className="mb-4">
                      <area.icon className="h-12 w-12 text-secondary group-hover:text-white transition-colors duration-300" />
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
          ))}
        </div>
        <div className="mt-16 bg-accent/10 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-serif font-bold mb-4 text-foreground">📋 Notary Services</h3>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-left">
              <p className="text-muted-foreground mb-4">
                Our experienced notary public provides reliable document authentication and certification services for
                personal and business needs.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2 mb-4">
                <li>• Affidavits and statutory declarations</li>
                <li>• Document certification and authentication</li>
                <li>• Witnessing signatures and oaths</li>
                <li>• Travel document notarization</li>
                <li>• Real estate document notarization</li>
                <li>• Corporate document certification</li>
              </ul>
              <p className="text-foreground font-medium">
                Fast, reliable, and professional notary services available by appointment.
              </p>
            </div>
            <div className="relative h-48 md:h-64 rounded-lg overflow-hidden">
              <img
                src="/notary.jpeg"
                alt="Professional notary services - document certification and authentication"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
          </div>
        </div>

        <div className="mt-16 bg-accent/10 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-serif font-bold mb-4 text-foreground">🧾 Legal Aid Ontario (LAO)</h3>
          <p className="text-muted-foreground mb-4">
            We accept Legal Aid certificates in Immigration and refugee law, Family law, Criminal (summary) and youth
            law, and Landlord & tenant matters (tenant-side).
          </p>
          <p className="text-foreground font-medium">
            If you are unsure whether you qualify, we can help you understand your options.
          </p>
        </div>
      </div>
    </section>
  )
}
