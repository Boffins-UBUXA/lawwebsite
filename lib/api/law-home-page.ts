// lib/api/law-home-page.ts

export interface Button {
    id: number;
    label: string;
    url: string;
    variant: string;
    icon: string | null;
  }
  
  export interface HeroBlock {
    __component: "law.hero-block";
    id: number;
    eyebrow: string;
    title: string;
    subtitle: string | null;
    description: string;
    phoneLabel: string;
    phoneNumber: string;
    phoneHref: string;
    background: any;
    primaryCta: Button;
    secondaryCta: Button;
  }
  
  export interface PracticeArea {
    id: number;
    documentId: string;
    title: string;
    slug: string;
    description: string;
    icon: string;
    order: number | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }
  
  export interface PracticeSection {
    __component: "law.practice-section";
    id: number;
    heading: string;
    description: string;
    practiceAreas: PracticeArea[];
  }
  
  export interface BulletPoint {
    id: number;
    title: string;
    description: string | null;
    icon: string | null;
  }
  
  export interface ContentHighlight {
    __component: "law.content-highlight";
    id: number;
    title: string;
    description: string;
    bullets: BulletPoint[];
    image: any;
  }
  
  export interface ValueItem {
    id: number;
    icon: string;
    title: string;
    description: string;
  }
  
  export interface AboutBlock {
    __component: "law.about-block";
    id: number;
    heading: string;
    intro: string;
    secondaryText: string | null;
    whyTitle: string;
    valuesTitle: string;
    image: any;
    whyItems: BulletPoint[];
    values: ValueItem[];
  }
  
  export interface Testimonial {
    id: number;
    documentId: string;
    name: string;
    role: string | null;
    quote: string;
    rating: number;
    order: number | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }
  
  export interface TestimonialsSection {
    __component: "law.testimonials-section";
    id: number;
    heading: string;
    subheading: string;
    testimonials: Testimonial[];
  }
  
  export interface ContactPoint {
    id: number;
    label: string;
    value: string;
    href: string | null;
    icon: string;
  }
  
  export interface ContactCTA {
    __component: "law.contact-cta";
    id: number;
    heading: string;
    description: string;
    formTitle: string | null;
    formDescription: string | null;
    formSubmitLabel: string | null;
    contactPoints: ContactPoint[];
    whatToExpect: BulletPoint[];
    primaryCta: Button | null;
    secondaryCta: Button | null;
    formFields: any[];
  }
  
  export type Section = 
    | HeroBlock 
    | PracticeSection 
    | ContentHighlight 
    | AboutBlock 
    | TestimonialsSection 
    | ContactCTA;
  
  export interface LawHomePage {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    sections: Section[];
    seo: any;
  }
  
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://cms.coming2canada.ca';
  const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN;
  
  export async function getLawHomePage(): Promise<LawHomePage | null> {
    try {
      const populate = [
        'sections',
        'sections.primaryCta',
        'sections.secondaryCta',
        'sections.practiceAreas',
        'sections.bullets',
        'sections.image',
        'sections.whyItems',
        'sections.values',
        'sections.testimonials',
        'sections.contactPoints',
        'sections.whatToExpect',
        'sections.formFields',
        'seo'
      ].join('&populate=');
  
      const response = await fetch(`${STRAPI_URL}/api/law-home-page?populate=${populate}`, {
        headers: {
          'Authorization': `Bearer ${STRAPI_TOKEN}`,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 60 }, // Revalidate every 60 seconds
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Strapi API Error:', errorData);
        throw new Error(`Failed to fetch law home page: ${response.statusText}`);
      }
  
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error fetching law home page:', error);
      return null;
    }
  }
  
  // Helper function to get a specific section by component type
  export function getSection<T extends Section>(
    sections: Section[],
    componentName: string
  ): T | undefined {
    return sections.find(section => section.__component === componentName) as T | undefined;
  }
  
  // Helper function to strip HTML tags from description
  export function stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '');
  }