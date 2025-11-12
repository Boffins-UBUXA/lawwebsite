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

const STRAPI_URL = (process.env.NEXT_PUBLIC_STRAPI_URL || 'https://cms.coming2canada.ca').replace(/\/$/, '');
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

function toAbsoluteUrl(url?: string | null): string | undefined {
  if (!url) return undefined;
  return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
}

type MediaLike = {
  url?: string | null;
  formats?: Record<string, { url?: string | null }> | null;
};

function enhanceMedia<T extends MediaLike | null | undefined>(media: T): T {
  if (!media) return media;
  const enhanced: MediaLike = { ...media, url: toAbsoluteUrl(media.url) };
  if (media.formats) {
    enhanced.formats = Object.fromEntries(
      Object.entries(media.formats).map(([key, value]) => [
        key,
        { ...value, url: toAbsoluteUrl(value?.url || undefined) },
      ]),
    );
  }
  return enhanced as T;
}

function enhanceNavigationMedia(entry: any) {
  if (!entry) return entry;
  const next: any = { ...entry };

  if (next.image) {
    if (typeof next.image === 'string') {
      next.image = toAbsoluteUrl(next.image);
    } else {
      next.image = enhanceMedia(next.image)?.url ?? null;
    }
  }

  if (Array.isArray(next.dropdown)) {
    next.dropdown = next.dropdown.map((item: any) => {
      if (!item) return item;
      const dropdownItem: any = { ...item };
      if (dropdownItem.image) {
        dropdownItem.image =
          typeof dropdownItem.image === 'string'
            ? toAbsoluteUrl(dropdownItem.image)
            : enhanceMedia(dropdownItem.image)?.url ?? null;
      }
      return dropdownItem;
    });
  }

  return next;
}

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
      const data = result.data;

      if (data) {
        data.logo = enhanceMedia(data.logo);

        if (Array.isArray(data.navigation)) {
          data.navigation = data.navigation.map((item: any) => enhanceNavigationMedia(item));
        }

        if (data.footer) {
          data.footer.logo = enhanceMedia(data.footer.logo);
          if (Array.isArray(data.footer.FooterLinks)) {
            data.footer.FooterLinks = data.footer.FooterLinks.map((item: any) => enhanceNavigationMedia(item));
          }
        }
      }

      return data;
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
