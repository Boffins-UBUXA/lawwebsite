const API_BASE_URL = (process.env.NEXT_PUBLIC_STRAPI_URL || "https://cms.coming2canada.ca").replace(/\/$/, "")
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN

export interface HeroImageAsset {
  url: string
  alt: string | null
  width?: number
  height?: number
  formats?: Record<
    string,
    {
      url?: string | null
      width?: number
      height?: number
    }
  >
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
  heroImage: HeroImageAsset | null
}

interface RawBlogPost extends Omit<BlogPost, "heroImage"> {
  heroImage: any
}

export interface BlogPostsResponse {
  data: RawBlogPost[]
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

    const params = new URLSearchParams({
      populate: "heroImage",
      sort: "publishedDate:desc",
    })

    const response = await fetch(`${API_BASE_URL}/api/law-blog-posts?${params.toString()}`, {
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
    return data.data.map(normalizeBlogPost)
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

    const params = new URLSearchParams()
    params.set("filters[slug][$eq]", slug)
    params.set("populate", "heroImage")
    params.set("pagination[pageSize]", "1")

    const response = await fetch(`${API_BASE_URL}/api/law-blog-posts?${params.toString()}`, {
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
    const post = data.data.at(0)

    if (!post) {
      console.error(`Blog post with slug "${slug}" not found`)
      return null
    }

    return normalizeBlogPost(post)
  } catch (error) {
    console.error(`Error fetching blog post ${slug}:`, error)
    return null
  }
}

function normalizeBlogPost(post: RawBlogPost): BlogPost {
  return {
    ...post,
    heroImage: normalizeImage(post.heroImage),
  }
}

function normalizeImage(image: any): HeroImageAsset | null {
  if (!image) return null

  const node = image?.data?.attributes ?? image
  if (!node) return null

  const pickUrl =
    node.url ??
    node.formats?.large?.url ??
    node.formats?.medium?.url ??
    node.formats?.small?.url ??
    node.formats?.thumbnail?.url

  if (!pickUrl) return null

  const absolute = pickUrl.startsWith("http") ? pickUrl : `${API_BASE_URL}${pickUrl}`

  const formats = node.formats
    ? Object.fromEntries(
        Object.entries(node.formats).map(([key, value]) => [
          key,
          {
            ...value,
            url: value?.url ? (value.url.startsWith("http") ? value.url : `${API_BASE_URL}${value.url}`) : undefined,
          },
        ]),
      )
    : undefined

  return {
    url: absolute,
    alt: node.alternativeText ?? node.caption ?? node.name ?? null,
    width: node.width,
    height: node.height,
    formats,
  }
}
