const API_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "https://cms.coming2canada.ca"
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN

export interface HeroSimple {
  __component: "law.hero-simple"
  id: number
  title: string
  subtitle: string
  background: string | null
}

export interface MissionSection {
  __component: "law.mission-section"
  id: number
  heading: string
  body: string
  image: string | null
  cta: {
    id: number
    label: string
    url: string
    variant: string
    icon: string | null
  }
}

export interface FeatureItem {
  id: number
  icon: string
  title: string
  description: string
}

export interface FeatureGrid {
  __component: "law.feature-grid"
  id: number
  heading: string
  subheading: string
  items: FeatureItem[]
}

export interface TeamMember {
  id: number
  name: string
  role: string
  photo: string | null
  details: Array<{ id: number; text: string }>
}

export interface TeamSection {
  __component: "law.team-section"
  id: number
  heading: string
  subheading: string
  members: TeamMember[]
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

export type AboutSection = HeroSimple | MissionSection | FeatureGrid | TeamSection | SimpleCTA

export interface AboutPageData {
  data: {
    id: number
    documentId: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    sections: AboutSection[]
    seo: null
  }
  meta: Record<string, unknown>
}

export async function getLawAboutPage(): Promise<AboutPageData | null> {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }

    // Add authorization header if token is available
    if (API_TOKEN) {
      headers["Authorization"] = `Bearer ${API_TOKEN}`
    }

    const response = await fetch(`${API_BASE_URL}/api/law-about-page`, {
      method: "GET",
      headers,
      next: {
        revalidate: 60, // Revalidate every 60 seconds for faster updates
        tags: ["law-about-page"], // Add cache tag for on-demand revalidation
      },
    })

    if (!response.ok) {
      console.error("Failed to fetch about page:", response.statusText)
      return null
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching about page:", error)
    return null
  }
}

export function getSection<T extends AboutSection>(sections: AboutSection[], componentType: string): T | undefined {
  return sections.find((section) => section.__component === componentType) as T | undefined
}
