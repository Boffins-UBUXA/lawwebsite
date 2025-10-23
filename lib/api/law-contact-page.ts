const API_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "https://cms.coming2canada.ca"
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN

export interface HeroSimple {
  __component: "law.hero-simple"
  id: number
  title: string
  subtitle: string
  background: string | null
}

export interface ContactCard {
  id: number
  icon: string
  title: string
  value?: string
  href?: string
}

export interface ContactInfoSection {
  __component: "law.contact-info-section"
  id: number
  heading: string
  description: string
  cards: ContactCard[]
}

export interface FormField {
  id: number
  label: string
  fieldType: string
  placeholder: string
  required: boolean
}

export interface ContactPoint {
  id: number
  label: string
  value: string
  href: string
  icon: string
}

export interface ContactCTA {
  __component: "law.contact-cta"
  id: number
  heading: string
  description: string
  formTitle: string
  formDescription: string
  formSubmitLabel: string
  contactPoints: ContactPoint[]
  whatToExpect: unknown[]
  primaryCta: null
  secondaryCta: null
  formFields: FormField[]
}

export interface SimpleCTA {
  __component: "law.simple-cta"
  id: number
  title: string
  description: string
  primaryCta: {
    id: number
    label: string
    url: string
    variant: string
    icon: string | null
  }
  secondaryCta: null
}

export type ContactSection = HeroSimple | ContactInfoSection | ContactCTA | SimpleCTA

export interface ContactPageData {
  data: {
    id: number
    documentId: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    sections: ContactSection[]
    seo: null
  }
  meta: Record<string, unknown>
}

export async function getLawContactPage(): Promise<ContactPageData | null> {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }

    // Add authorization header if token is available
    if (API_TOKEN) {
      headers["Authorization"] = `Bearer ${API_TOKEN}`
    }

    const response = await fetch(`${API_BASE_URL}/api/law-contact-page`, {
      method: "GET",
      headers,
      next: {
        revalidate: 60, // Revalidate every 60 seconds for faster updates
        tags: ["law-contact-page"], // Add cache tag for on-demand revalidation
      },
    })

    if (!response.ok) {
      console.error("Failed to fetch contact page:", response.statusText)
      return null
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching contact page:", error)
    return null
  }
}

export function getSection<T extends ContactSection>(sections: ContactSection[], componentType: string): T | undefined {
  return sections.find((section) => section.__component === componentType) as T | undefined
}
