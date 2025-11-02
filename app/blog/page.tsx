"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowRight } from "lucide-react"
import Link from "next/link"
import { getLawBlogPage } from "@/lib/api/law-blog-page"

export default async function BlogPage() {
  const pageData = await getLawBlogPage()

  if (!pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-muted-foreground">Failed to load blog content</p>
      </div>
    )
  }

  const { hero, posts, newsletter } = pageData.data

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* ✅ HERO SECTION */}
        <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white py-20">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-balance">{hero.title}</h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                {hero.description ? <div dangerouslySetInnerHTML={{ __html: hero.description }} /> : hero.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* ✅ BLOG POSTS GRID */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 items-stretch">
              {posts.map((post) => (
                <Card
                  key={post.id}
                  className="group flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-3 flex-wrap gap-2">
                      <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full font-medium whitespace-nowrap">
                        {post.category}
                      </span>
                      <span className="whitespace-nowrap">{post.readTime}</span>
                    </div>
                    <CardTitle className="text-xl font-serif text-primary group-hover:text-secondary transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="flex flex-col flex-1 justify-between">
                    <div className="space-y-4 flex-1">
                      <p className="text-muted-foreground leading-relaxed line-clamp-3">{post.excerpt}</p>

                      <div className="flex items-center flex-wrap gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 flex-shrink-0" />
                          <span>{new Date(post.publishedDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 flex-shrink-0" />
                          <span>{post.author}</span>
                        </div>
                      </div>
                    </div>

                    {/* ✅ Button anchored at bottom */}
                    <Link href={`/blog/${post.slug}`} className="mt-6">
                      <Button
                        variant="ghost"
                        className="w-full text-secondary hover:bg-secondary hover:text-white group-hover:bg-secondary group-hover:text-white transition-all justify-between cursor-pointer"
                      >
                        Read More
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ✅ NEWSLETTER SIGNUP */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-serif font-bold text-primary mb-6">{newsletter.title}</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{newsletter.description}</p>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
              >
                <input
                  type="email"
                  placeholder={newsletter.emailPlaceholder}
                  className="flex-1 px-4 py-3 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                <Button type="submit" className="bg-secondary hover:bg-secondary/90 text-white px-6 py-3 cursor-pointer">
                  {newsletter.buttonLabel}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground mt-4">{newsletter.disclaimer}</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
