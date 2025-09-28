import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Scale, Users, Award, Clock, User } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white py-20">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-balance">About Bekwyn Law PC</h1>
              <p className="text-xl text-blue-100 text-pretty">
                Dedicated to providing exceptional legal services with integrity, compassion, and expertise
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-serif font-bold text-primary mb-6">Our Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  At Bekwyn Law PC, we are committed to providing our clients with personalized, professional legal
                  services. We understand that legal issues can be overwhelming, and we strive to make the process as
                  smooth and stress-free as possible.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our approach is client-focused, ensuring that each individual receives the attention and expertise
                  they deserve. We believe in building lasting relationships based on trust, transparency, and results.
                </p>
                <Button className="bg-secondary hover:bg-secondary/90 text-white">Schedule Consultation</Button>
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

        {/* Why Choose Us */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-primary mb-4">Why Choose Bekwyn Law PC?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We combine legal expertise with personalized service to deliver exceptional results for our clients
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Scale className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-3">Legal Expertise</h3>
                  <p className="text-muted-foreground">
                    Comprehensive knowledge across multiple practice areas with years of experience
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-3">Client-Focused</h3>
                  <p className="text-muted-foreground">
                    Personalized attention and tailored solutions for each client's unique needs
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-3">Proven Results</h3>
                  <p className="text-muted-foreground">
                    Track record of successful outcomes and satisfied clients across all practice areas
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-3">Timely Service</h3>
                  <p className="text-muted-foreground">
                    Responsive communication and efficient handling of all legal matters
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold text-primary mb-4">Our Team</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Meet our experienced legal professionals dedicated to serving your needs
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Sophie Ibekwe */}
              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-2">Sophie Ibekwe</h3>
                  <p className="text-sm text-secondary font-medium mb-3">Partner, Litigation Lead</p>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>LL.B, B.L., LL.M., PhD</p>
                    <p>Barrister & Solicitor</p>
                    <p>Ontario & Nigeria</p>
                    <p>Notary Public</p>
                  </div>
                </CardContent>
              </Card>

              {/* Kingsley Ibekwe */}
              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-2">Kingsley Ibekwe</h3>
                  <p className="text-sm text-secondary font-medium mb-3">Immigration Lead</p>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>MSc, ACIT, CPA (Ireland)</p>
                    <p>RCIC-IRB</p>
                    <p>Commissioner for Taking Affidavits</p>
                    <p>Province of Ontario</p>
                  </div>
                </CardContent>
              </Card>

              {/* Placeholder for future staff member 1 */}
              <Card className="text-center hover:shadow-lg transition-shadow duration-300 opacity-50">
                <CardContent className="p-6">
                  <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">Team Member</h3>
                  <p className="text-sm text-gray-400 font-medium mb-3">Position Title</p>
                  <div className="text-xs text-gray-400 space-y-1">
                    <p>Qualifications</p>
                    <p>Coming Soon</p>
                  </div>
                </CardContent>
              </Card>

              {/* Placeholder for future staff member 2 */}
              <Card className="text-center hover:shadow-lg transition-shadow duration-300 opacity-50">
                <CardContent className="p-6">
                  <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-10 w-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">Team Member</h3>
                  <p className="text-sm text-gray-400 font-medium mb-3">Position Title</p>
                  <div className="text-xs text-gray-400 space-y-1">
                    <p>Qualifications</p>
                    <p>Coming Soon</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Legal Aid Information */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-serif font-bold text-primary mb-6">Legal Aid Ontario</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We are proud to accept Legal Aid Ontario certificates, ensuring that quality legal representation is
                accessible to those who need it most. Our commitment to justice extends beyond our paying clients to
                serve the broader community.
              </p>
              <Button
                variant="outline"
                className="border-secondary text-secondary hover:bg-secondary hover:text-white bg-transparent"
              >
                Learn More About Legal Aid
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
