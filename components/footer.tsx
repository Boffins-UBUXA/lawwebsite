import { Scale, Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  const practiceAreas = [
    "Immigration & Refugee Law",
    "Family Law",
    "Criminal Law",
    "Wills & Powers of Attorney",
    "Employment & Human Rights",
    "Civil Litigation & Tenancy",
  ]

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              {/* <Scale className="h-8 w-8 text-accent" /> */}
              <img src="/bluebackgroundlogo.png"
                  alt="logo" className="h-16 w-16 rounded-lg" />
              <div className="text-2xl font-serif font-bold">Bekwyn Law PC</div>
            </div>
            <p className="text-primary-foreground/80 mb-6 text-pretty">
              At Bekwyn Law, we believe that law is about people, not just paperwork. We proudly serve individuals,
              families, and businesses with practical, compassionate, and results-driven legal support.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-accent" />
                <span className="text-sm">[+1 (289) 838-2982]</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-accent" />
                <span className="text-sm">[info@bekwynlaw.com]</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-accent" />
                <span className="text-sm">Bekwyn law head office Ontario, Canada</span>
              </div>
            </div>
          </div>

          {/* Practice Areas */}
          <div>
            <h3 className="text-lg font-serif font-bold mb-4">Practice Areas</h3>
            <ul className="space-y-2">
              {practiceAreas.map((area, index) => (
                <li key={index}>
                  <a
                    href="#practice-areas"
                    className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {area}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-serif font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#practice-areas"
                  className="text-sm text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a href="#contact" className="text-sm text-primary-foreground/80 hover:text-accent transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <span className="text-sm text-accent font-medium">Free Consultation</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
        <p className="text-sm text-primary-foreground/60">
           © {new Date().getFullYear()} Bekwyn Law PC. All rights reserved. | Professional legal services in Ontario
        </p>
        </div>
      </div>
    </footer>
  )
}
