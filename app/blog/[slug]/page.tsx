import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowLeft, Clock } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getLawBlogPost, getLawBlogPosts } from "@/lib/api/law-blog-posts"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getLawBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white py-20">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto">
              <Link
                href="/blog"
                className="inline-flex items-center text-secondary hover:text-secondary/80 mb-6 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>

              <div className="mb-6">
                <span className="bg-secondary/20 text-secondary px-3 py-1 rounded-full font-medium text-sm">
                  {post.category}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-balance">{post.title}</h1>

              <div className="flex items-center space-x-6 text-blue-100">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.publishedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Decorative top border */}
              <div className="w-20 h-1 bg-secondary mb-12 mx-auto"></div>

              <article className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-12 lg:p-16">
                <div
                  className="article-content
                    prose prose-base sm:prose-lg max-w-none
                    prose-headings:font-serif prose-headings:text-primary prose-headings:mb-4 sm:prose-headings:mb-6 prose-headings:mt-8 sm:prose-headings:mt-12 first:prose-headings:mt-0
                    prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:font-bold prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-2 sm:prose-h2:pb-3 prose-h2:break-words
                    prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:font-semibold prose-h3:break-words
                    prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4 sm:prose-p:mb-6 prose-p:text-justify
                    prose-p:font-light prose-p:tracking-wide prose-p:break-words prose-p:hyphens-auto
                    prose-a:text-secondary prose-a:font-medium prose-a:no-underline hover:prose-a:underline hover:prose-a:text-secondary/80 prose-a:break-words
                    prose-strong:text-primary prose-strong:font-semibold prose-strong:break-words
                    prose-ul:my-4 sm:prose-ul:my-6 prose-ul:pl-6 prose-li:text-gray-700 prose-li:leading-relaxed prose-li:mb-2
                    prose-ol:my-4 sm:prose-ol:my-6 prose-ol:pl-6
                    prose-blockquote:border-l-4 prose-blockquote:border-secondary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600
                    prose-img:rounded-lg prose-img:shadow-md prose-img:my-8 prose-img:w-full
                    prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:break-words
                    prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
                    first-letter:text-4xl sm:first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-primary first-letter:float-left first-letter:mr-2 sm:first-letter:mr-3 first-letter:leading-none first-letter:mt-1
                    [&>*:first-child]:first-letter:text-4xl [&>*:first-child]:sm:first-letter:text-5xl"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </article>

              {/* Call to Action */}
              <div className="mt-16 p-10 bg-gradient-to-br from-primary/5 via-white to-secondary/5 rounded-2xl border border-gray-100 shadow-lg text-center">
                <div className="max-w-2xl mx-auto">
                  <div className="w-16 h-1 bg-secondary mb-6 mx-auto"></div>
                  <h3 className="text-3xl font-serif font-bold text-primary mb-4">Need Legal Assistance?</h3>
                  <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                    If you have questions about this topic or need legal guidance, our experienced team is here to help.
                    Schedule a consultation today to discuss your legal needs.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/contact">
                      <Button className="bg-secondary hover:bg-secondary/90 text-white shadow-lg hover:shadow-xl transition-all px-8 py-6 text-lg">
                        Schedule Consultation
                      </Button>
                    </Link>
                    <a href="tel:+12898382982">
                      <Button
                        variant="outline"
                        className="border-2 border-primary text-primary hover:bg-primary hover:text-white bg-transparent shadow-lg hover:shadow-xl transition-all px-8 py-6 text-lg"
                      >
                        Call +1 (289) 838-2982
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export async function generateStaticParams() {
  const posts = await getLawBlogPosts()
  if (!posts) return []

  return posts.map((post) => ({
    slug: post.slug,
  }))
}
