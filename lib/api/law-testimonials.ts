// lib/api/law-testimonials.ts

export interface TestimonialMedia {
  url: string;
  alt: string | null;
}

export interface LawTestimonial {
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

export interface LawTestimonialsResponse {
  data: any[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://cms.coming2canada.ca';
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

/**
 * Fetch all law testimonials
 */
export async function getLawTestimonials(): Promise<LawTestimonial[]> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/law-testimonials?populate=photo`, {
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
      throw new Error(`Failed to fetch law testimonials: ${response.statusText}`);
    }

    const result: LawTestimonialsResponse = await response.json();

    const normalized = (result.data || [])
      .map((item) => normalizeTestimonial(item))
      .filter((item): item is LawTestimonial => Boolean(item));

    // Sort by order if specified, otherwise by creation date
    return normalized.sort((a, b) => {
      if (a.order != null && b.order != null) {
        return a.order - b.order;
      }
      const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return aDate - bDate;
    });
  } catch (error) {
    console.error('Error fetching law testimonials:', error);
    return [];
  }
}

/**
 * Fetch a single law testimonial by ID
 */
export async function getLawTestimonial(id: string): Promise<LawTestimonial | null> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/law-testimonials/${id}?populate=photo`, {
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Strapi API Error:', errorData);
      throw new Error(`Failed to fetch law testimonial: ${response.statusText}`);
    }

    const result = await response.json();
    return normalizeTestimonial(result.data);
  } catch (error) {
    console.error('Error fetching law testimonial:', error);
    return null;
  }
}

export function normalizeTestimonial(item: any): LawTestimonial | null {
  if (!item) return null;

  const attributes = item.attributes ?? item;

  const id =
    item.id ??
    attributes.id ??
    (typeof attributes === "number" ? attributes : null);

  if (id == null) return null;

  const quote = attributes.quote ?? attributes.Quote ?? "";
  const name = attributes.name ?? attributes.Name ?? "";
  const rating = attributes.rating ?? attributes.Rating ?? 5;

  return {
    id,
    documentId: attributes.documentId ?? attributes.DocumentId ?? item.documentId ?? item.DocumentId ?? null,
    name,
    role: attributes.role ?? attributes.Role ?? null,
    quote,
    rating,
    order: attributes.order ?? attributes.Order ?? null,
    createdAt: attributes.createdAt ?? item.createdAt ?? null,
    updatedAt: attributes.updatedAt ?? item.updatedAt ?? null,
    publishedAt: attributes.publishedAt ?? item.publishedAt ?? null,
    photo: normalizeMedia(attributes.photo ?? item.photo ?? null),
  };
}

function normalizeMedia(media: any): TestimonialMedia | null {
  if (!media) return null;

  const node = media?.data?.attributes ?? media?.data ?? media;
  if (!node) return null;

  const url =
    node.url ??
    node.formats?.large?.url ??
    node.formats?.medium?.url ??
    node.formats?.small?.url ??
    node.formats?.thumbnail?.url;

  if (!url) return null;

  return {
    url: url.startsWith('http') ? url : `${STRAPI_URL}${url}`,
    alt: node.alternativeText ?? node.caption ?? node.name ?? null,
  };
}
