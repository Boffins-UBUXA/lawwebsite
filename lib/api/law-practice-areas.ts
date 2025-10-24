// lib/api/law-practice-areas.ts

export interface ServiceDetail {
  id: number;
  text: string;
}

export interface Service {
  id: number;
  icon: string | null;
  title: string;
  summary: string;
  details: ServiceDetail[];
}

export interface PracticeArea {
  id: number;
  documentId?: string | null;
  title: string;
  slug: string;
  cardSummary?: string;
  icon?: string | null;
  intro?: string | null;
  body?: string | null;
  order?: number | null;
  services?: Service[];
  heroImage?: {
    id: number;
    url: string;
    alternativeText?: string;
  } | null;
  backgroundImage?: {
    id: number;
    url: string;
    alternativeText?: string;
  } | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  publishedAt?: string | null;
}

export interface PracticeAreasResponse {
  data: PracticeArea[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface SinglePracticeAreaResponse {
  data: PracticeArea;
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://cms.coming2canada.ca';
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

/**
 * Fetch all practice areas
 */
export async function getLawPracticeAreas(): Promise<PracticeArea[]> {
  try {
    const populate = ['backgroundImage'].join('&populate=');
    
    const response = await fetch(`${STRAPI_URL}/api/law-practice-areas?populate=${populate}`, {
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
      throw new Error(`Failed to fetch practice areas: ${response.statusText}`);
    }

    const result: PracticeAreasResponse = await response.json();
    return (result.data || [])
      .map((item: any) => normalizePracticeArea(item))
      .filter((area): area is PracticeArea => Boolean(area));
  } catch (error) {
    console.error('Error fetching practice areas:', error);
    return [];
  }
}

/**
 * Fetch a single practice area by ID
 */
export async function getLawPracticeAreaById(id: string): Promise<PracticeArea | null> {
  try {
    const populate = ['backgroundImage'].join('&populate=');
    
    const response = await fetch(`${STRAPI_URL}/api/law-practice-areas/${id}?populate=${populate}`, {
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
      throw new Error(`Failed to fetch practice area: ${response.statusText}`);
    }

    const result: SinglePracticeAreaResponse = await response.json();
    return normalizePracticeArea(result.data);
  } catch (error) {
    console.error('Error fetching practice area:', error);
    return null;
  }
}

/**
 * Fetch a single practice area by slug
 */
export async function getLawPracticeAreaBySlug(slug: string): Promise<PracticeArea | null> {
  try {
    const populate = ['backgroundImage'].join('&populate=');
    
    const response = await fetch(
      `${STRAPI_URL}/api/law-practice-areas?filters[slug][$eq]=${slug}&populate=${populate}`,
      {
        headers: {
          'Authorization': `Bearer ${STRAPI_TOKEN}`,
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Strapi API Error:', errorData);
      throw new Error(`Failed to fetch practice area: ${response.statusText}`);
    }

    const result: PracticeAreasResponse = await response.json();
    const normalized = (result.data || [])
      .map((item: any) => normalizePracticeArea(item))
      .filter((area): area is PracticeArea => Boolean(area));
    return normalized[0] ?? null;
  } catch (error) {
    console.error('Error fetching practice area by slug:', error);
    return null;
  }
}

/**
 * Create a new practice area (admin only)
 */
export async function createLawPracticeArea(data: Partial<PracticeArea>): Promise<PracticeArea | null> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/law-practice-areas`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Strapi API Error:', errorData);
      throw new Error(`Failed to create practice area: ${response.statusText}`);
    }

    const result: SinglePracticeAreaResponse = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error creating practice area:', error);
    return null;
  }
}

/**
 * Update an existing practice area (admin only)
 */
export async function updateLawPracticeArea(id: string, data: Partial<PracticeArea>): Promise<boolean> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/law-practice-areas/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Strapi API Error:', errorData);
      throw new Error(`Failed to update practice area: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error('Error updating practice area:', error);
    return false;
  }
}

/**
 * Helper function to get full image URL
 */
export function getImageUrl(image: PracticeArea['backgroundImage']): string {
  if (!image?.url) return '';
  
  // If URL is already absolute, return as-is
  if (image.url.startsWith('http')) {
    return image.url;
  }
  
  // Otherwise, prepend Strapi URL
  return `${STRAPI_URL}${image.url}`;
}

export function normalizePracticeArea(item: any): PracticeArea | null {
  if (!item) return null;

  const attributes = item.attributes ?? item;

  const id =
    item.id ??
    attributes.id ??
    (typeof attributes === "number" ? attributes : null);

  const slug =
    attributes.slug ??
    attributes.Slug ??
    attributes.handle ??
    attributes.Handle ??
    item.slug ??
    item.Slug ??
    null;

  const title =
    attributes.title ??
    attributes.Title ??
    attributes.name ??
    attributes.Name ??
    "";

  if (!slug && id == null) return null;

  return {
    id: id ?? 0,
    documentId:
      attributes.documentId ??
      attributes.DocumentId ??
      item.documentId ??
      item.DocumentId ??
      null,
    title,
    slug: slug ?? "",
    cardSummary:
      attributes.cardSummary ??
      attributes.CardSummary ??
      attributes.summary ??
      attributes.Summary ??
      "",
    icon: attributes.icon ?? attributes.Icon ?? null,
    intro:
      attributes.intro ??
      attributes.Intro ??
      attributes.introduction ??
      attributes.Introduction ??
      null,
    body:
      attributes.body ??
      attributes.Body ??
      attributes.description ??
      attributes.Description ??
      null,
    order: attributes.order ?? attributes.Order ?? null,
    services: normalizeServices(attributes.services),
    heroImage: normalizeMedia(attributes.heroImage),
    backgroundImage: normalizeMedia(attributes.backgroundImage),
    createdAt: attributes.createdAt ?? item.createdAt ?? null,
    updatedAt: attributes.updatedAt ?? item.updatedAt ?? null,
    publishedAt: attributes.publishedAt ?? item.publishedAt ?? null,
  };
}

function normalizeServices(services: any): Service[] | undefined {
  if (!Array.isArray(services)) return undefined;

  return services
    .map((service: any) => {
      if (!service) return null;
      const attributes = service.attributes ?? service;
      return {
        id: service.id ?? attributes.id ?? 0,
        icon: attributes.icon ?? attributes.Icon ?? null,
        title: attributes.title ?? attributes.Title ?? "",
        summary: attributes.summary ?? attributes.Summary ?? "",
        details: Array.isArray(attributes.details)
          ? attributes.details
              .map((detail: any) => {
                if (!detail) return null;
                const detailAttrs = detail.attributes ?? detail;
                return {
                  id: detail.id ?? detailAttrs.id ?? 0,
                  text: detailAttrs.text ?? detailAttrs.Text ?? "",
                };
              })
              .filter((detail): detail is ServiceDetail => Boolean(detail && detail.text))
          : [],
      };
    })
    .filter((service): service is Service => Boolean(service));
}

function normalizeMedia(media: any) {
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
    id: node.id ?? media.id ?? 0,
    url: url.startsWith('http') ? url : `${STRAPI_URL}${url}`,
    alternativeText: node.alternativeText ?? node.caption ?? node.name ?? null,
  };
}
