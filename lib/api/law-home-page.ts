// lib/api/law-home-page.ts

import { getLawPracticeAreas, normalizePracticeArea, type PracticeArea as CatalogPracticeArea } from "./law-practice-areas";
import { getLawTestimonials, normalizeTestimonial, type LawTestimonial, type TestimonialMedia } from "./law-testimonials";

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
    documentId?: string | null;
    title: string;
    slug: string;
    description?: string | null;
    icon?: string | null;
    cardSummary?: string | null;
    order?: number | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    publishedAt?: string | null;
  }

type PracticeAreaRef = {
  id?: number | null;
  documentId?: string | null;
  slug?: string | null;
};

type TestimonialRef = {
  id?: number | null;
  documentId?: string | null;
};
  
export interface PracticeSection {
    __component: "law.practice-section";
    id: number;
    heading: string;
    description: string;
    practiceAreas: PracticeArea[];
    practiceAreaRefs?: PracticeAreaRef[];
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
    documentId?: string | null;
    name: string;
    role?: string | null;
    quote: string;
    rating: number;
    order?: number | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    publishedAt?: string | null;
    photo?: TestimonialMedia | null;
  }

  export interface TestimonialsSection {
    __component: "law.testimonials-section";
    id: number;
    heading: string;
    subheading: string;
    testimonials: Testimonial[];
    testimonialRefs?: TestimonialRef[];
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
        'sections.testimonials.photo',
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
        cache: 'no-store',
        next: { revalidate: 60 }, // Revalidate every 60 seconds
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Strapi API Error:', errorData);
        throw new Error(`Failed to fetch law home page: ${response.statusText}`);
      }

      const result = await response.json();
      const [homeData, practiceCatalog, testimonialCatalog] = await Promise.all([
        Promise.resolve(result.data),
        getLawPracticeAreas().catch((err) => {
          console.error("Failed to fetch practice areas catalog", err);
          return [] as CatalogPracticeArea[];
        }),
        getLawTestimonials().catch((err) => {
          console.error("Failed to fetch testimonials catalog", err);
          return [] as LawTestimonial[];
        }),
      ]);

      if (homeData && Array.isArray(homeData.sections)) {
        homeData.sections = homeData.sections.map((section: any) => {
          if (section?.__component === "law.practice-section") {
            return normalizePracticeSection(section, practiceCatalog);
          }
          if (section?.__component === "law.testimonials-section") {
            return normalizeTestimonialsSection(section, testimonialCatalog);
          }
          return section;
        });
      }

      return homeData;
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

function normalizePracticeSection(section: any, catalog: CatalogPracticeArea[]): PracticeSection {
  const rawRelation = section?.practiceAreas;
  const relationDefined = rawRelation !== undefined && rawRelation !== null;

  const refs = extractPracticeAreaRefs(rawRelation);
  const normalizedFromRelation = extractNormalizedPracticeAreas(rawRelation);

  const catalogById = new Map<number, PracticeArea>();
  const catalogByDocumentId = new Map<string, PracticeArea>();
  const catalogBySlug = new Map<string, PracticeArea>();

  catalog.forEach((area) => {
    const normalized = normalizePracticeArea(area);
    if (!normalized) return;
    if (typeof normalized.id === "number") catalogById.set(normalized.id, normalized);
    if (normalized.documentId) catalogByDocumentId.set(normalized.documentId.toLowerCase(), normalized);
    if (normalized.slug) catalogBySlug.set(normalized.slug.toLowerCase(), normalized);
  });

  const relationById = new Map<number, PracticeArea>();
  const relationByDocumentId = new Map<string, PracticeArea>();
  const relationBySlug = new Map<string, PracticeArea>();

  normalizedFromRelation.forEach((area) => {
    if (typeof area.id === "number") relationById.set(area.id, area);
    if (area.documentId) relationByDocumentId.set(area.documentId.toLowerCase(), area);
    if (area.slug) relationBySlug.set(area.slug.toLowerCase(), area);
  });

  const ordered = refs
    .map((ref) => {
      const refId = parseNumericId(ref.id);
      if (refId !== null) {
        const match = catalogById.get(refId) ?? relationById.get(refId);
        if (match) return match;
      }

      const refDocumentId = ref.documentId?.toLowerCase();
      if (refDocumentId) {
        const match = catalogByDocumentId.get(refDocumentId) ?? relationByDocumentId.get(refDocumentId);
        if (match) return match;
      }

      const refSlug = ref.slug?.toLowerCase();
      if (refSlug) {
        const match = catalogBySlug.get(refSlug) ?? relationBySlug.get(refSlug);
        if (match) return match;
      }

      return undefined;
    })
    .filter((area): area is PracticeArea => Boolean(area));

  const catalogNormalized = catalog
    .map((area) => normalizePracticeArea(area))
    .filter((area): area is PracticeArea => Boolean(area));

  const practiceAreas =
    ordered.length > 0
      ? ordered
      : normalizedFromRelation.length > 0
      ? normalizedFromRelation
      : relationDefined
      ? []
      : catalogNormalized;

  return {
    ...section,
    practiceAreas,
    practiceAreaRefs: relationDefined ? refs : undefined,
  };
}

function extractPracticeAreaRefs(raw: any): PracticeAreaRef[] {
  const items = Array.isArray(raw?.data) ? raw.data : Array.isArray(raw) ? raw : [];

  return items
    .map((item: any) => {
      if (item == null) return null;

      if (typeof item === "number") return { id: item };
      if (typeof item === "string") return { slug: item };

      const attributes = item.attributes ?? item;
      const id = parseNumericId(item.id ?? attributes.id);

      const documentId =
        attributes.documentId ??
        attributes.DocumentId ??
        item.documentId ??
        item.DocumentId ??
        null;

      const slug =
        attributes.slug ??
        attributes.Slug ??
        item.slug ??
        item.Slug ??
        null;

      if (id !== null || documentId || slug) {
        return { id, documentId, slug };
      }

      return null;
    })
    .filter((ref): ref is PracticeAreaRef => Boolean(ref));
}

function extractNormalizedPracticeAreas(raw: any): PracticeArea[] {
  const items = Array.isArray(raw?.data) ? raw.data : Array.isArray(raw) ? raw : [];
  return items
    .map((item: any) => normalizePracticeArea(item))
    .filter((area): area is PracticeArea => Boolean(area));
}

function parseNumericId(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number.parseInt(value, 10);
    if (!Number.isNaN(parsed)) return parsed;
  }
  return null;
}

function normalizeTestimonialsSection(section: any, catalog: LawTestimonial[]): TestimonialsSection {
  const rawRelation = section?.testimonials;
  const relationDefined = rawRelation !== undefined && rawRelation !== null;

  const refs = extractTestimonialRefs(rawRelation);
  const normalizedFromRelation = extractNormalizedTestimonials(rawRelation);

  const catalogById = new Map<number, Testimonial>();
  const catalogByDocumentId = new Map<string, Testimonial>();

  catalog.forEach((testimonial) => {
    const normalized = normalizeTestimonial(testimonial);
    if (!normalized) return;
    catalogById.set(normalized.id, normalized);
    if (normalized.documentId) {
      catalogByDocumentId.set(normalized.documentId.toLowerCase(), normalized);
    }
  });

  const relationById = new Map<number, Testimonial>();
  const relationByDocumentId = new Map<string, Testimonial>();

  normalizedFromRelation.forEach((testimonial) => {
    relationById.set(testimonial.id, testimonial);
    if (testimonial.documentId) {
      relationByDocumentId.set(testimonial.documentId.toLowerCase(), testimonial);
    }
  });

  const ordered = refs
    .map((ref) => {
      const refId = parseNumericId(ref.id);
      if (refId !== null) {
        const match = catalogById.get(refId) ?? relationById.get(refId);
        if (match) return match;
      }

      const refDocumentId = ref.documentId?.toLowerCase();
      if (refDocumentId) {
        const match = catalogByDocumentId.get(refDocumentId) ?? relationByDocumentId.get(refDocumentId);
        if (match) return match;
      }

      return undefined;
    })
    .filter((item): item is Testimonial => Boolean(item));

  const catalogNormalized = catalog
    .map((testimonial) => normalizeTestimonial(testimonial))
    .filter((testimonial): testimonial is Testimonial => Boolean(testimonial));

  const testimonialFallback =
    ordered.length > 0
      ? ordered
      : normalizedFromRelation.length > 0
      ? normalizedFromRelation
      : relationDefined
      ? []
      : catalogNormalized;

  return {
    ...section,
    testimonials: testimonialFallback,
    testimonialRefs: relationDefined ? refs : undefined,
  };
}

function extractTestimonialRefs(raw: any): TestimonialRef[] {
  const items = Array.isArray(raw?.data) ? raw.data : Array.isArray(raw) ? raw : [];

  return items
    .map((item: any) => {
      if (item == null) return null;

      if (typeof item === "number") return { id: item };

      const attributes = item.attributes ?? item;
      const id = parseNumericId(item.id ?? attributes.id);
      const documentId =
        attributes.documentId ??
        attributes.DocumentId ??
        item.documentId ??
        item.DocumentId ??
        null;

      if (id !== null || documentId) {
        return { id, documentId };
      }

      return null;
    })
    .filter((ref): ref is TestimonialRef => Boolean(ref));
}

function extractNormalizedTestimonials(raw: any): Testimonial[] {
  const items = Array.isArray(raw?.data) ? raw.data : Array.isArray(raw) ? raw : [];
  return items
    .map((item: any) => normalizeTestimonial(item))
    .filter((testimonial): testimonial is Testimonial => Boolean(testimonial));
}
