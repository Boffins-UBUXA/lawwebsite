import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowLeft, Clock } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

// Sample blog posts data - in a real app, this would come from a CMS or database
const blogPosts = {
  "understanding-immigration-law-changes-2024": {
    title: "Understanding Immigration Law Changes in 2024",
    excerpt: "Recent updates to Canadian immigration policies and what they mean for applicants.",
    date: "March 15, 2024",
    author: "Bekwyn Law PC",
    category: "Immigration Law",
    readTime: "5 min read",
    content: `
      <p>The Canadian immigration landscape has seen significant changes in 2024, affecting various immigration programs and pathways. These updates reflect the government's commitment to addressing labor market needs while maintaining the integrity of the immigration system.</p><br>
      
      <h2>Key Changes in Express Entry System</h2>
      <p>The Express Entry system has undergone several modifications to better align with Canada's economic priorities. The most notable change is the introduction of category-based selection, which allows Immigration, Refugees and Citizenship Canada (IRCC) to invite candidates based on specific attributes such as work experience in particular occupations or French language proficiency.</p><br>
      
      <h2>Provincial Nominee Program Updates</h2>
      <p>Several provinces have updated their Provincial Nominee Program (PNP) streams to address regional labor market needs. These changes include new occupation lists, updated minimum requirements, and streamlined application processes for in-demand professions.</p><br>
      
      <h2>Impact on Applicants</h2>
      <p>These changes create both opportunities and challenges for prospective immigrants. While some pathways have become more accessible for candidates with specific skills or language abilities, others may face increased competition or modified requirements.</p><br>
      
      <h2>What This Means for You</h2>
      <p>If you're considering immigration to Canada, it's crucial to understand how these changes affect your specific situation. Our experienced immigration lawyers can help you navigate these updates and develop a strategy that maximizes your chances of success.</p><br>
      
      <p>Contact Bekwyn Law PC today to discuss how the 2024 immigration changes impact your immigration goals and to explore the best pathways for your unique circumstances.</p>
    `,
  },
  "family-law-protecting-childrens-interests": {
    title: "Family Law: Protecting Your Children's Interests",
    excerpt: "Key considerations when navigating custody and support arrangements during divorce.",
    date: "March 10, 2024",
    author: "Bekwyn Law PC",
    category: "Family Law",
    readTime: "7 min read",
    content: `
      <p>When families face separation or divorce, protecting children's interests becomes the paramount concern. The legal system recognizes that children's well-being must be the primary consideration in all family law decisions, but navigating this complex area requires careful planning and expert guidance.</p>
      
      <h2>The Best Interests of the Child Standard</h2>
      <p>Canadian family law is governed by the principle that the best interests of the child must be the primary consideration in all decisions affecting children. This standard encompasses various factors including the child's physical, emotional, and psychological safety, security, and well-being.</p>
      
      <h2>Custody and Access Arrangements</h2>
      <p>Modern family law recognizes various custody arrangements, from joint custody to sole custody, each designed to serve the child's best interests. The key is finding an arrangement that provides stability while maintaining meaningful relationships with both parents when appropriate.</p>
      
      <h2>Child Support Obligations</h2>
      <p>Child support is calculated using federal guidelines that consider both parents' incomes and the amount of time the child spends with each parent. Beyond basic support, parents may also be responsible for special or extraordinary expenses such as childcare, medical expenses, and extracurricular activities.</p>
      
      <h2>Creating Effective Parenting Plans</h2>
      <p>A well-crafted parenting plan addresses not only where children will live and when they'll see each parent, but also important decisions about education, healthcare, religion, and extracurricular activities. These plans should be detailed enough to prevent future conflicts while remaining flexible enough to adapt as children grow.</p>
      
      <h2>When to Seek Legal Help</h2>
      <p>Family law matters involving children are emotionally charged and legally complex. Having experienced legal representation ensures that your children's interests are properly protected and that you understand your rights and obligations as a parent.</p>
      
      <p>At Bekwyn Law PC, we understand the sensitive nature of family disputes and work diligently to achieve outcomes that serve your children's best interests while protecting your parental rights.</p>
    `,
  },
  // Add more blog posts as needed...
}

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts[params.slug as keyof typeof blogPosts]

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
                  <span>{post.date}</span>
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
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div
                className="prose prose-lg max-w-none prose-headings:text-primary prose-headings:font-serif prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-secondary prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Call to Action */}
              <div className="mt-12 p-8 bg-gray-50 rounded-2xl text-center">
                <h3 className="text-2xl font-serif font-bold text-primary mb-4">Need Legal Assistance?</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  If you have questions about this topic or need legal guidance, our experienced team is here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button className="bg-secondary hover:bg-secondary/90 text-white">Schedule Consultation</Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
                  >
                    Call (416) 227-8400
                  </Button>
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

// Generate static params for known blog posts
export function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug: slug,
  }))
}
