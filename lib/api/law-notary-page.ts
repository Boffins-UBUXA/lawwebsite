const API_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "https://cms.coming2canada.ca"
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN

export interface HeroBlock {
  __component: "law.hero-block"
  id: number
  eyebrow: string | null
  title: string
  subtitle: string
  description: string
  phoneLabel: string | null
  phoneNumber: string | null
  phoneHref: string | null
  background: string | null
  primaryCta: {
    id: number
    label: string
    url: string
    variant: string
    icon: string | null
  }
  secondaryCta: {
    id: number
    label: string
    url: string
    variant: string
    icon: string | null
  }
}

export interface Service {
  id: number
  icon: string
  title: string
  summary: string
}

export interface ServiceGrid {
  __component: "law.service-grid"
  id: number
  title: string
  description: string
  services: Service[]
}

export interface ProcessStep {
  id: number
  stepNumber: string
  title: string
  description: string
  icon: string | null
}

export interface ProcessStepsBlock {
  __component: "blocks.process-steps-block"
  id: number
  title: string
  description: string
  steps: ProcessStep[]
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
  href: string | null
  icon: string
}

export interface WhatToExpect {
  id: number
  title: string
  description: string | null
  icon: string | null
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
  whatToExpect: WhatToExpect[]
  primaryCta: {
    id: number
    label: string
    url: string
    variant: string
    icon: string | null
  }
  secondaryCta: {
    id: number
    label: string
    url: string
    variant: string
    icon: string | null
  }
  formFields: FormField[]
}

export type NotarySection = HeroBlock | ServiceGrid | ProcessStepsBlock | ContactCTA

export interface NotaryPageData {
  data: {
    id: number
    documentId: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    sections: NotarySection[]
    seo: null
  }
  meta: Record<string, unknown>
}

export async function getLawNotaryPage(): Promise<NotaryPageData | null> {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }

    // Add authorization header if token is available
    if (API_TOKEN) {
      headers["Authorization"] = `Bearer ${API_TOKEN}`
    }

    const response = await fetch(`${API_BASE_URL}/api/law-notary-page`, {
      method: "GET",
      headers,
      next: {
        revalidate: 60, // Revalidate every 60 seconds for faster updates
        tags: ["law-notary-page"], // Add cache tag for on-demand revalidation
      },
    })

    if (!response.ok) {
      console.error("Failed to fetch notary page:", response.statusText)
      return null
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching notary page:", error)
    return null
  }
}

export function getSection<T extends NotarySection>(sections: NotarySection[], componentType: string): T | undefined {
  return sections.find((section) => section.__component === componentType) as T | undefined
}
