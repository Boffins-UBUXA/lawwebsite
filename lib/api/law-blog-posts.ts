const API_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "https://cms.coming2canada.ca"
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN

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

export interface BlogPostsResponse {
  data: BlogPost[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface SingleBlogPostResponse {
  data: BlogPost
  meta: Record<string, unknown>
}

export async function getLawBlogPosts(): Promise<BlogPost[] | null> {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }

    if (API_TOKEN) {
      headers["Authorization"] = `Bearer ${API_TOKEN}`
    }

    const response = await fetch(`${API_BASE_URL}/api/law-blog-posts`, {
      method: "GET",
      headers,
      next: {
        revalidate: 60,
        tags: ["law-blog-posts"],
      },
    })

    if (!response.ok) {
      console.error("Failed to fetch blog posts:", response.statusText)
      return null
    }

    const data: BlogPostsResponse = await response.json()
    return data.data
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return null
  }
}

export async function getLawBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }

    if (API_TOKEN) {
      headers["Authorization"] = `Bearer ${API_TOKEN}`
    }

    const response = await fetch(`${API_BASE_URL}/api/law-blog-posts`, {
      method: "GET",
      headers,
      next: {
        revalidate: 60,
        tags: [`law-blog-post-${slug}`],
      },
    })

    if (!response.ok) {
      console.error(`Failed to fetch blog posts:`, response.statusText)
      return null
    }

    const data: BlogPostsResponse = await response.json()
    const post = data.data.find((p) => p.slug === slug)

    if (!post) {
      console.error(`Blog post with slug "${slug}" not found`)
      return null
    }

    return post
  } catch (error) {
    console.error(`Error fetching blog post ${slug}:`, error)
    return null
  }
}
