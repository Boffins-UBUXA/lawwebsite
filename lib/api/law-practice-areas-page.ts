// lib/api/law-practice-areas-page.ts

export interface PracticeAreasPageContent {
    id: number;
    documentId: string;
    heroTitle: string;
    heroSubtitle: string;
    sectionTitle?: string;
    sectionDescription?: string;
    ctaTitle?: string;
    ctaDescription?: string;
    ctaButtonText?: string;
    ctaButtonLink?: string;
    ctaPhoneText?: string;
    ctaPhoneNumber?: string;
    heroBackgroundImage?: {
      id: number;
      url: string;
      alternativeText?: string;
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  }
  
  export interface PracticeAreasPageResponse {
    data: PracticeAreasPageContent;
  }
  
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://cms.coming2canada.ca';
  const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN;
  
  /**
   * Fetch practice areas page content
   */
  export async function getLawPracticeAreasPage(): Promise<PracticeAreasPageContent | null> {
    try {
      const populate = ['heroBackgroundImage'].join('&populate=');
      
      const response = await fetch(`${STRAPI_URL}/api/law-practice-areas-page?populate=${populate}`, {
        headers: {
          'Authorization': `Bearer ${STRAPI_TOKEN}`,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 60 }, // Revalidate every 60 seconds
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Strapi API Error:', errorData);
        throw new Error(`Failed to fetch practice areas page: ${response.statusText}`);
      }
  
      const result: PracticeAreasPageResponse = await response.json();
      return result.data;
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