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
  documentId: string;
  title: string;
  slug: string;
  cardSummary?: string;
  icon?: string;
  intro?: string;
  body?: string;
  order?: number;
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
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
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
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Strapi API Error:', errorData);
      throw new Error(`Failed to fetch practice areas: ${response.statusText}`);
    }

    const result: PracticeAreasResponse = await response.json();
    return result.data;
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
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Strapi API Error:', errorData);
      throw new Error(`Failed to fetch practice area: ${response.statusText}`);
    }

    const result: SinglePracticeAreaResponse = await response.json();
    return result.data;
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
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Strapi API Error:', errorData);
      throw new Error(`Failed to fetch practice area: ${response.statusText}`);
    }

    const result: PracticeAreasResponse = await response.json();
    return result.data[0] || null;
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