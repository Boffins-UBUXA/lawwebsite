// lib/api/law-practice-areas-page.ts

import type { PracticeArea, Service } from "./law-practice-areas";

export interface PracticeAreaRef {
  id?: number | null;
  documentId?: string | null;
  slug?: string | null;
}

export interface PracticeAreasPageContent {
  id: number;
  documentId?: string | null;
  heroTitle?: string | null;
  heroSubtitle?: string | null;
  sectionTitle?: string | null;
  sectionDescription?: string | null;
  ctaTitle?: string | null;
  ctaDescription?: string | null;
  ctaButtonText?: string | null;
  ctaButtonLink?: string | null;
  ctaPhoneText?: string | null;
  ctaPhoneNumber?: string | null;
  heroBackgroundImage?: {
    id?: number | null;
    url?: string | null;
    alternativeText?: string | null;
  };
  practiceAreas: PracticeArea[];
  practiceAreaRefs: PracticeAreaRef[];
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface PracticeAreasPageResponse {
  data: PracticeAreasPageContent;
}

const STRAPI_URL = (process.env.NEXT_PUBLIC_STRAPI_URL || 'https://cms.coming2canada.ca').replace(/\/$/, '');
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

/**
 * Fetch practice areas page content
 */
export async function getLawPracticeAreasPage(): Promise<PracticeAreasPageContent | null> {
  try {
    const params = new URLSearchParams()
    params.set('populate[practiceAreas]', 'true')
    params.set('populate[hero][populate][background]', 'true')
    params.set('populate[practiceAreas][populate][backgroundImage]', 'true')
    params.set('populate[practiceAreas][populate][heroImage]', 'true')
    params.set('populate[practiceAreas][populate][services][populate][details]', 'true')

    const response = await fetch(`${STRAPI_URL}/api/law-practice-areas-page?${params.toString()}`, {
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      next: { revalidate: 60 }, // still provide hints for server-side usage
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Strapi API Error:', errorData);
      throw new Error(`Failed to fetch practice areas page: ${response.statusText}`);
    }

    const result: PracticeAreasPageResponse = await response.json();
    return normalizePracticeAreasPage(result.data);
  } catch (error) {
    console.error('Error fetching practice areas page:', error);
    return null;
  }
}
  
  /**
   * Update practice areas page content (admin only)
   */
  export async function updateLawPracticeAreasPage(data: Partial<PracticeAreasPageContent>): Promise<boolean> {
    try {
      const response = await fetch(`${STRAPI_URL}/api/law-practice-areas-page`, {
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
        throw new Error(`Failed to update practice areas page: ${response.statusText}`);
      }
  
      return true;
    } catch (error) {
      console.error('Error updating practice areas page:', error);
      return false;
    }
  }
  
  /**
   * Helper function to get full image URL
   */
export function getPageImageUrl(image: PracticeAreasPageContent['heroBackgroundImage']): string {
  if (!image?.url) return '';
  
  // If URL is already absolute, return as-is
  if (image.url.startsWith('http')) {
    return image.url;
  }
  
  // Otherwise, prepend Strapi URL
  return `${STRAPI_URL}${image.url}`;
}

function normalizePracticeAreasPage(entry: any): PracticeAreasPageContent | null {
  if (!entry) return null;

  const attributes = entry.attributes ?? entry;
  const heroSource = attributes.hero ?? entry.hero ?? {};
  const ctaSource = attributes.cta ?? entry.cta ?? {};

  const practiceAreasSource =
    attributes.practiceAreas ??
    entry.practiceAreas ??
    attributes.practice_areas ??
    entry.practice_areas ??
    [];

  const rawPracticeAreaItems: any[] = Array.isArray(practiceAreasSource?.data)
    ? practiceAreasSource.data
    : Array.isArray(practiceAreasSource)
    ? practiceAreasSource
    : [];

  const practiceAreas: PracticeArea[] = rawPracticeAreaItems
    .map((item: any) => normalizePracticeAreaItem(item))
    .filter((area): area is PracticeArea => Boolean(area));

  const practiceAreaRefs: PracticeAreaRef[] = rawPracticeAreaItems
    .map((item: any) => extractPracticeAreaRef(item))
    .filter((ref): ref is PracticeAreaRef => Boolean(ref));

  const normalized = {
    id: entry.id,
    documentId:
      entry.documentId ??
      attributes.documentId ??
      attributes.DocumentId ??
      null,
    heroTitle:
      heroSource.title ??
      heroSource.Title ??
      attributes.heroTitle ??
      attributes.hero_title ??
      null,
    heroSubtitle:
      heroSource.subtitle ??
      heroSource.Subtitle ??
      attributes.heroSubtitle ??
      attributes.hero_subtitle ??
      null,
    sectionTitle: attributes.sectionTitle ?? null,
    sectionDescription: attributes.introduction ?? null,
    ctaTitle: ctaSource.title ?? ctaSource.Title ?? null,
    ctaDescription: ctaSource.description ?? ctaSource.Description ?? null,
    ctaButtonText: ctaSource.primaryCta?.label ?? ctaSource.primary_cta?.label ?? null,
    ctaButtonLink: ctaSource.primaryCta?.url ?? ctaSource.primary_cta?.url ?? null,
    ctaPhoneText: ctaSource.secondaryCta?.label ?? ctaSource.secondary_cta?.label ?? null,
    ctaPhoneNumber: ctaSource.secondaryCta?.url ?? ctaSource.secondary_cta?.url ?? null,
    heroBackgroundImage: normalizeMedia(
      heroSource.background ??
        heroSource.backgroundImage ??
        attributes.heroBackgroundImage ??
        entry.heroBackgroundImage
    ),
    practiceAreas,
    practiceAreaRefs,
    createdAt: entry.createdAt ?? attributes.createdAt ?? null,
    updatedAt: entry.updatedAt ?? attributes.updatedAt ?? null,
    publishedAt: entry.publishedAt ?? attributes.publishedAt ?? null,
  };

  return normalized;
}

function normalizeMedia(media: any) {
  if (!media) return undefined;

  const node = media?.data?.attributes ?? media?.data ?? media;
  if (!node) return undefined;

  const url =
    node.url ??
    node.formats?.large?.url ??
    node.formats?.medium?.url ??
    node.formats?.small?.url ??
    node.formats?.thumbnail?.url;

  if (!url) return undefined;

  return {
    id: node.id ?? media.id ?? null,
    url: url.startsWith('http') ? url : `${STRAPI_URL}${url}`,
    alternativeText: node.alternativeText ?? node.caption ?? node.name ?? null,
  };
}

function normalizePracticeAreaItem(item: any): PracticeArea | null {
  if (!item) return null;

  const attributes = item.attributes ?? item;
  const backgroundImage = normalizeMedia(attributes.backgroundImage);
  const heroImage = normalizeMedia(attributes.heroImage);

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

  if (!slug && !attributes.documentId && !item.id) return null;

  return {
    id: item.id ?? attributes.id ?? 0,
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
    backgroundImage,
    heroImage,
    createdAt: attributes.createdAt ?? item.createdAt ?? null,
    updatedAt: attributes.updatedAt ?? item.updatedAt ?? null,
    publishedAt: attributes.publishedAt ?? item.publishedAt ?? null,
  } as PracticeArea;
}

function normalizeServices(services: any): PracticeArea["services"] {
  if (!Array.isArray(services)) return undefined;

  return services
    .map((service: any) => {
      if (!service) return null;
      const attributes = service.attributes ?? service;
      return {
        id: service.id ?? attributes.id ?? 0,
        icon: attributes.icon ?? null,
        title: attributes.title ?? "",
        summary: attributes.summary ?? "",
        details: Array.isArray(attributes.details)
          ? attributes.details
              .map((detail: any) => ({
                id: detail.id ?? detail?.attributes?.id ?? 0,
                text: detail.text ?? detail?.attributes?.text ?? "",
              }))
              .filter((detail) => detail.text)
          : [],
      };
    })
    .filter((service): service is Service => Boolean(service));
}

function extractPracticeAreaRef(item: any): PracticeAreaRef | null {
  if (item == null) return null;

  if (typeof item === "number") {
    return { id: item };
  }

  if (typeof item === "string") {
    return { slug: item };
  }

  const attributes = item.attributes ?? item;

  const id = item.id ?? attributes.id ?? null;
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

  if (id || documentId || slug) {
    return { id, documentId, slug };
  }

  return null;
}
