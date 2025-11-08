"use client"

import { useState, type FormEvent } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowRight } from "lucide-react"
import Link from "next/link"

type NewsletterStatus = "idle" | "loading" | "success" | "error"

export default function BlogPage() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<NewsletterStatus>("idle")
  const [feedback, setFeedback] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!email.trim()) {
      setStatus("error")
      setFeedback("Please enter your email address.")
      return
    }

    setStatus("loading")
    setFeedback(null)

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-form-source": "law-blog-newsletter",
        },
        body: JSON.stringify({ email, source: "law-blog-newsletter" }),
      })

      const body = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(body?.message || "We couldn't subscribe you right now.")
      }

      setStatus("success")
      setFeedback(body?.message || "Thanks for subscribing!")
      setEmail("")
    } catch (error: any) {
      setStatus("error")
      setFeedback(error?.message || "We couldn't subscribe you right now.")
    }
  }

  const blogPosts = [
    {
      title: "Understanding Immigration Law Changes in 2024",
      excerpt:
        "Recent updates to Canadian immigration policies and what they mean for applicants looking to relocate, reunite with family, or extend their status in Canada.",
      date: "March 15, 2024",
      author: "Bekwyn Law PC",
      category: "Immigration Law",
      readTime: "5 min read",
      slug: "understanding-immigration-law-changes-2024",
    },
    {
      title: "Family Law: Protecting Your Children's Interests",
      excerpt:
        "Key considerations when navigating custody and support arrangements during divorce, ensuring your children’s emotional and financial security.",
      date: "March 10, 2024",
      author: "Bekwyn Law PC",
      category: "Family Law",
      readTime: "7 min read",
      slug: "family-law-protecting-childrens-interests",
    },
    {
      title: "Estate Planning: Why You Need a Will",
      excerpt:
        "The importance of having a properly drafted will and powers of attorney — and how they protect your family’s future and peace of mind.",
      date: "March 5, 2024",
      author: "Bekwyn Law PC",
      category: "Estate Planning",
      readTime: "4 min read",
      slug: "estate-planning-why-you-need-will",
    },
    {
      title: "Employment Rights: Know Your Protections",
      excerpt:
        "Understanding your rights in the workplace and when to seek legal help to protect yourself from wrongful termination or unfair treatment.",
      date: "February 28, 2024",
      author: "Bekwyn Law PC",
      category: "Employment Law",
      readTime: "6 min read",
      slug: "employment-rights-know-your-protections",
    },
    {
      title: "Criminal Defense: Your Rights During Arrest",
      excerpt:
        "What you need to know about your rights when facing criminal charges, and how early legal representation can protect your future.",
      date: "February 20, 2024",
      author: "Bekwyn Law PC",
      category: "Criminal Law",
      readTime: "8 min read",
      slug: "criminal-defense-rights-during-arrest",
    },
    {
      title: "Civil Litigation: When to Consider Legal Action",
      excerpt:
        "Understanding when civil litigation might be the right path for your dispute and how Bekwyn Law can help you achieve justice.",
      date: "February 15, 2024",
      author: "Bekwyn Law PC",
      category: "Civil Litigation",
      readTime: "5 min read",
      slug: "civil-litigation-when-to-consider-legal-action",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* ✅ HERO SECTION */}
        <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white py-20">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-balance">
                Legal Insights & Updates
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Stay informed with the latest legal news, insights, and updates from our experienced legal team.
              </p>
            </div>
          </div>
        </section>

        {/* ✅ BLOG POSTS GRID */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8 items-stretch">
              {blogPosts.map((post, index) => (
                <Card
                  key={index}
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
                      <p className="text-muted-foreground leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center flex-wrap gap-3 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 flex-shrink-0" />
                          <span>{post.date}</span>
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
                        className="w-full text-secondary hover:bg-secondary hover:text-white group-hover:bg-secondary group-hover:text-white transition-all justify-between"
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
              <h2 className="text-3xl font-serif font-bold text-primary mb-6">Stay Updated</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Subscribe to our newsletter to receive the latest legal insights, updates, and news directly in your
                inbox.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-secondary"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  required
                  disabled={status === "loading"}
                />
                <Button
                  type="submit"
                  className="bg-secondary hover:bg-secondary/90 text-white px-6 py-3"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>

              {feedback ? (
                <p className={`text-sm mt-4 ${status === "error" ? "text-red-600" : "text-secondary"}`}>
                  {feedback}
                </p>
              ) : (
                <p className="text-xs text-muted-foreground mt-4">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
