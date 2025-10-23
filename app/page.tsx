import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { PracticeAreas } from "@/components/practice-areas"
import { AboutSection } from "@/components/about-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { getLawHomePage, getSection } from "@/lib/api/law-home-page"
import { getLawTestimonials } from "@/lib/api/law-testimonials"
import type { 
  HeroBlock, 
  PracticeSection, 
  AboutBlock, 
  TestimonialsSection as TestimonialsSectionType,
  ContactCTA,
  ContentHighlight
} from "@/lib/api/law-home-page"

export default async function HomePage() {
  // Fetch data from Strapi
  const [homePageData, testimonials] = await Promise.all([
    getLawHomePage(),
    getLawTestimonials()
  ]);

  if (!homePageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Failed to load page content</p>
      </div>
    );
  }

  // Extract sections by type
  const heroSection = getSection<HeroBlock>(homePageData.sections, "law.hero-block");
  const practiceSection = getSection<PracticeSection>(homePageData.sections, "law.practice-section");
  const aboutSection = getSection<AboutBlock>(homePageData.sections, "law.about-block");
  const testimonialsSection = getSection<TestimonialsSectionType>(homePageData.sections, "law.testimonials-section");
  const contactSection = getSection<ContactCTA>(homePageData.sections, "law.contact-cta");
  
  // Get content highlights (notary and legal aid sections)
  const contentHighlights = homePageData.sections.filter(
    section => section.__component === "law.content-highlight"
  ) as ContentHighlight[];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {heroSection && <HeroSection data={heroSection} />}
        {practiceSection && <PracticeAreas 
          data={practiceSection} 
          contentHighlights={contentHighlights} 
        />}
        {aboutSection && <AboutSection data={aboutSection} />}
        {testimonialsSection && (
          <TestimonialsSection 
            data={testimonialsSection} 
            testimonials={testimonials}
          />
        )}
        {contactSection && <ContactSection data={contactSection} />}
      </main>
      
      <Footer />
    </div>
  )
}