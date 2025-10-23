// lib/api/law-testimonials.ts

export interface LawTestimonial {
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
  
  export interface LawTestimonialsResponse {
    data: LawTestimonial[];
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
      const response = await fetch(`${STRAPI_URL}/api/law-testimonials`, {
        headers: {
          'Authorization': `Bearer ${STRAPI_TOKEN}`,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 60 }, // Revalidate every 60 seconds
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Strapi API Error:', errorData);
        throw new Error(`Failed to fetch law testimonials: ${response.statusText}`);
      }
  
      const result: LawTestimonialsResponse = await response.json();
      
      // Sort by order if specified, otherwise by creation date
      return result.data.sort((a, b) => {
        if (a.order !== null && b.order !== null) {
          return a.order - b.order;
        }
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
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
      const response = await fetch(`${STRAPI_URL}/api/law-testimonials/${id}`, {
        headers: {
          'Authorization': `Bearer ${STRAPI_TOKEN}`,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 60 },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Strapi API Error:', errorData);
        throw new Error(`Failed to fetch law testimonial: ${response.statusText}`);
      }
  
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error fetching law testimonial:', error);
      return null;
    }
  }