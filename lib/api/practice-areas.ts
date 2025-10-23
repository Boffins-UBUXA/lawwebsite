// lib/api/practice-areas.ts

export interface PracticeAreaDetail {
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
    content?: any; // Add full content structure if needed
  }
  
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://cms.coming2canada.ca';
  const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN;
  
  // Fetch all practice areas
  export async function getPracticeAreas(): Promise<PracticeAreaDetail[]> {
    try {
      const response = await fetch(`${STRAPI_URL}/api/practice-areas?populate=*`, {
        headers: {
          'Authorization': `Bearer ${STRAPI_TOKEN}`,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 60 },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch practice areas: ${response.statusText}`);
      }
  
      const result = await response.json();
      return result.data || [];
    } catch (error) {
      console.error('Error fetching practice areas:', error);
      return [];
    }
  }
  
  // Fetch single practice area by slug
  export async function getPracticeAreaBySlug(slug: string): Promise<PracticeAreaDetail | null> {
    try {
      const response = await fetch(
        `${STRAPI_URL}/api/practice-areas?filters[slug][$eq]=${slug}&populate=*`,
        {
          headers: {
            'Authorization': `Bearer ${STRAPI_TOKEN}`,
            'Content-Type': 'application/json',
          },
          next: { revalidate: 60 },
        }
      );
  
      if (!response.ok) {
        throw new Error(`Failed to fetch practice area: ${response.statusText}`);
      }
  
      const result = await response.json();
      return result.data?.[0] || null;
    } catch (error) {
      console.error('Error fetching practice area:', error);
      return null;
    }
  }