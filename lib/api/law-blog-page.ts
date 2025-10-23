const API_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "https://cms.coming2canada.ca"
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN

export interface BlogHero {
  id: number
  eyebrow: string | null
  title: string
  subtitle: string
  description: string
  phoneLabel: string | null
  phoneNumber: string | null
  phoneHref: string | null
  background: string | null
  primaryCta: unknown | null
  secondaryCta: unknown | null
}

export interface BlogPost {
  id: number
  documentId: string
  title: string
  slug: string
  excerpt: string
  publishedDate: string
  author: string
  category: string
  readTime: string
  content: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  heroImage: unknown | null
}

export interface NewsletterSection {
  id: number
  title: string
  description: string
  emailPlaceholder: string
  buttonLabel: string
  disclaimer: string
}

export interface BlogPageData {
  data: {
    id: number
    documentId: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    hero: BlogHero
    posts: BlogPost[]
    newsletter: NewsletterSection
    seo: unknown | null
  }
  meta: Record<string, unknown>
}

export async function getLawBlogPage(): Promise<BlogPageData | null> {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }

    if (API_TOKEN) {
      headers["Authorization"] = `Bearer ${API_TOKEN}`
    }

    const response = await fetch(`${API_BASE_URL}/api/law-blog-page`, {
      method: "GET",
      headers,
      next: {
        revalidate: 60,
        tags: ["law-blog-page"],
      },
    })

    if (!response.ok) {
      console.error("Failed to fetch blog page:", response.statusText)
      return null
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching blog page:", error)
    return null
  }
}
