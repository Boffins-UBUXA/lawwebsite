// lib/api/law-site-settings.ts

export interface Contact {
    id: number;
    label: string;
    value: string;
    href: string;
    icon: string;
  }
  
  export interface SocialLink {
    id: number;
    platform: string;
    url: string;
    icon: string;
  }
  
  export interface NavigationItem {
    id: number;
    label: string;
    url: string;
    icon: string | null;
    dropdown: Array<{
      id: number;
      label: string;
      url: string;
      icon: string | null;
    }>;
    image: string | null;
  }
  
  export interface FooterContactDetail {
    id: number;
    label: string;
    value: string;
    type: string;
    href: string | null;
  }
  
  export interface LawSiteSettings {
    id: number;
    documentId: string;
    brandName: string;
    tagline: string;
    footerNote: string;
    logo: any;
    topContacts: Contact[];
    socialLinks: SocialLink[];
    navigation: NavigationItem[];
    footer: {
      id: number;
      FooterCopyright: string;
      logoAlt: string;
      companyName: string;
      companyTagline: string;
      logo: any;
      FooterLinks: NavigationItem[];
      ContactDetails: FooterContactDetail[];
    };
    seo: any;
  }
  
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://cms.coming2canada.ca';
  const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN;
  
  export async function getLawSiteSettings(): Promise<LawSiteSettings | null> {
    try {
      // Build proper populate query for nested relations
      const populate = [
        'logo',
        'topContacts',
        'socialLinks',
        'navigation',
        'navigation.dropdown',
        'footer',
        'footer.logo',
        'footer.FooterLinks',
        'footer.ContactDetails',
        'seo'
      ].join('&populate=');
      
      const response = await fetch(`${STRAPI_URL}/api/law-site-setting?populate=${populate}`, {
        headers: {
          'Authorization': `Bearer ${STRAPI_TOKEN}`,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 60 }, // Revalidate every 60 seconds
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Strapi API Error:', errorData);
        throw new Error(`Failed to fetch law site settings: ${response.statusText}`);
      }
  
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('Error fetching law site settings:', error);
      return null;
    }
  }
  
  export async function updateLawSiteSettings(data: Partial<LawSiteSettings>): Promise<boolean> {
    try {
      const response = await fetch(`${STRAPI_URL}/api/law-site-setting`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${STRAPI_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update law site settings: ${response.statusText}`);
      }
  
      return true;
    } catch (error) {
      console.error('Error updating law site settings:', error);
      return false;
    }
  }