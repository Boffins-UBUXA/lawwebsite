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
      <p>When families face separation or divorce, protecting children's interests becomes the paramount concern. The legal system recognizes that children's well-being must be the primary consideration in all family law decisions, but navigating this complex area requires careful planning and expert guidance.</p><br>
      
      <h2>The Best Interests of the Child Standard</h2>
      <p>Canadian family law is governed by the principle that the best interests of the child must be the primary consideration in all decisions affecting children. This standard encompasses various factors including the child's physical, emotional, and psychological safety, security, and well-being.</p><br>
      
      <h2>Custody and Access Arrangements</h2>
      <p>Modern family law recognizes various custody arrangements, from joint custody to sole custody, each designed to serve the child's best interests. The key is finding an arrangement that provides stability while maintaining meaningful relationships with both parents when appropriate.</p><br>
      
      <h2>Child Support Obligations</h2>
      <p>Child support is calculated using federal guidelines that consider both parents' incomes and the amount of time the child spends with each parent. Beyond basic support, parents may also be responsible for special or extraordinary expenses such as childcare, medical expenses, and extracurricular activities.</p><br>
      
      <h2>Creating Effective Parenting Plans</h2>
      <p>A well-crafted parenting plan addresses not only where children will live and when they'll see each parent, but also important decisions about education, healthcare, religion, and extracurricular activities. These plans should be detailed enough to prevent future conflicts while remaining flexible enough to adapt as children grow.</p><br>
      
      <h2>When to Seek Legal Help</h2>
      <p>Family law matters involving children are emotionally charged and legally complex. Having experienced legal representation ensures that your children's interests are properly protected and that you understand your rights and obligations as a parent.</p><br>
      
      <p>At Bekwyn Law PC, we understand the sensitive nature of family disputes and work diligently to achieve outcomes that serve your children's best interests while protecting your parental rights.</p>
    `,
  },
  "estate-planning-why-you-need-will": {
    title: "Estate Planning: Why You Need a Will",
    excerpt: "The importance of having a properly drafted will and powers of attorney.",
    date: "March 5, 2024",
    author: "Bekwyn Law PC",
    category: "Estate Planning",
    readTime: "4 min read",
    content: `
      <p>Estate planning is one of the most important steps you can take to protect your loved ones and ensure your wishes are carried out after you're gone. Yet many Canadians delay creating a will, often with costly consequences for their families.</p><br>
      
      <h2>Why a Will Matters</h2>
      <p>A will is more than just a document—it's your voice when you can no longer speak for yourself. Without a will, provincial intestacy laws determine how your assets are distributed, which may not align with your wishes. This can lead to family disputes, unnecessary delays, and additional costs for your loved ones.</p><br>
      
      <h2>Key Components of Estate Planning</h2>
      <p>A comprehensive estate plan includes several important documents. Your will specifies how your assets should be distributed and who should care for minor children. Powers of attorney for property and personal care designate trusted individuals to make decisions on your behalf if you become incapacitated.</p><br>
      
      <h2>Protecting Your Family's Future</h2>
      <p>Estate planning isn't just about distributing assets—it's about minimizing tax implications, avoiding probate complications, and ensuring your family is cared for according to your wishes. A properly structured estate plan can save your beneficiaries thousands of dollars in taxes and legal fees.</p><br>
      
      <h2>When to Update Your Will</h2>
      <p>Life changes require updates to your estate plan. Marriage, divorce, the birth of children, significant asset acquisitions, or the death of a beneficiary are all triggers for reviewing and updating your will and powers of attorney.</p><br>
      
      <p>Don't leave your family's future to chance. Contact Bekwyn Law PC today to discuss your estate planning needs and ensure your legacy is protected.</p>
    `,
  },
  "employment-rights-know-your-protections": {
    title: "Employment Rights: Know Your Protections",
    excerpt: "Understanding your rights in the workplace and when to seek legal help.",
    date: "February 28, 2024",
    author: "Bekwyn Law PC",
    category: "Employment Law",
    readTime: "6 min read",
    content: `
      <p>Employment law in Canada provides significant protections for workers, but many employees are unaware of their rights until facing a workplace dispute. Understanding these protections is essential for every working Canadian.</p><br>
      
      <h2>Your Rights Under Employment Standards</h2>
      <p>Employment standards legislation establishes minimum requirements for wages, working hours, overtime pay, vacation time, and statutory holidays. These are baseline protections that every employer must provide, regardless of what your employment contract says.</p><br>
      
      <h2>Wrongful Dismissal Protection</h2>
      <p>If you're terminated without cause, you're generally entitled to reasonable notice or pay in lieu of notice. The amount depends on various factors including length of service, age, position, and availability of similar employment. Common law notice often exceeds minimum statutory requirements.</p><br>
      
      <h2>Discrimination and Harassment</h2>
      <p>Human rights legislation prohibits discrimination based on protected grounds such as race, gender, age, disability, and religion. Workplace harassment, whether from supervisors or colleagues, violates these protections and can result in significant liability for employers.</p><br>
      
      <h2>Constructive Dismissal</h2>
      <p>You don't have to be formally fired to have a legal claim. Constructive dismissal occurs when your employer makes fundamental changes to your employment terms without your agreement, such as significant salary reductions, demotions, or hostile work environments.</p><br>
      
      <h2>When to Seek Legal Advice</h2>
      <p>If you're facing termination, have been dismissed, or experiencing workplace harassment or discrimination, consulting an employment lawyer early can significantly impact your outcome. Many situations are time-sensitive, with limitation periods that can bar your claim if you wait too long.</p><br>
      
      <p>Bekwyn Law PC has extensive experience protecting employee rights. Contact us for a confidential consultation about your workplace situation.</p>
    `,
  },
  "criminal-defense-rights-during-arrest": {
    title: "Criminal Defense: Your Rights During Arrest",
    excerpt: "What you need to know about your rights when facing criminal charges.",
    date: "February 20, 2024",
    author: "Bekwyn Law PC",
    category: "Criminal Law",
    readTime: "8 min read",
    content: `
      <p>Being arrested or charged with a criminal offense is one of the most stressful experiences a person can face. Understanding your rights and taking appropriate action immediately can significantly impact the outcome of your case.</p><br>
      
      <h2>Your Charter Rights</h2>
      <p>The Canadian Charter of Rights and Freedoms guarantees important protections when you're detained or arrested. You have the right to remain silent, the right to be informed of the reasons for your arrest, and the right to retain and instruct counsel without delay. Police must inform you of these rights immediately upon arrest.</p><br>
      
      <h2>The Right to Silence</h2>
      <p>You are not required to answer police questions beyond providing basic identification information. Anything you say can be used as evidence against you. Even seemingly innocent statements can be misinterpreted or taken out of context. Exercise your right to silence until you've consulted with a lawyer.</p><br>
      
      <h2>Right to Legal Counsel</h2>
      <p>Upon arrest, police must provide you with a reasonable opportunity to contact a lawyer. This includes access to duty counsel if you cannot afford a private lawyer. Do not waive this right—legal advice at this critical stage can make the difference between conviction and acquittal.</p><br>
      
      <h2>The Importance of Early Legal Representation</h2>
      <p>The earlier you involve a criminal defense lawyer, the better your chances of a favorable outcome. Early intervention allows your lawyer to preserve evidence, interview witnesses while memories are fresh, identify Charter violations, and develop a strong defense strategy.</p><br>
      
      <h2>Common Mistakes to Avoid</h2>
      <p>Many people inadvertently damage their case by speaking to police without counsel, consenting to searches, or failing to document their arrest circumstances. Others miss important deadlines or fail to comply with bail conditions, creating additional legal problems.</p><br>
      
      <h2>Bail Hearings and Release Conditions</h2>
      <p>After arrest, you may be held for a bail hearing. Having experienced legal representation at your bail hearing is crucial for securing your release and establishing reasonable conditions. Overly restrictive bail conditions can significantly impact your life and your ability to prepare your defense.</p><br>
      
      <p>If you've been arrested or charged with a criminal offense, time is of the essence. Contact Bekwyn Law PC immediately for experienced criminal defense representation that protects your rights and your future.</p>
    `,
  },
  "civil-litigation-when-to-consider-legal-action": {
    title: "Civil Litigation: When to Consider Legal Action",
    excerpt: "Understanding when civil litigation might be the right path for your dispute.",
    date: "February 15, 2024",
    author: "Bekwyn Law PC",
    category: "Civil Litigation",
    readTime: "5 min read",
    content: `
      <p>Civil litigation can be a powerful tool for resolving disputes and obtaining justice, but it's not always the best solution for every conflict. Understanding when litigation is appropriate—and when alternative approaches might be more effective—is crucial for making informed decisions about your legal matters.</p><br>
      
      <h2>What is Civil Litigation?</h2>
      <p>Civil litigation is the process of resolving disputes between individuals, businesses, or organizations through the court system. Unlike criminal cases, civil litigation typically involves seeking monetary compensation or specific performance rather than criminal penalties.</p><br>
      
      <h2>Common Types of Civil Disputes</h2>
      <p>Civil litigation encompasses a wide range of disputes including breach of contract, personal injury claims, property disputes, professional negligence, defamation, and business conflicts. Each type of case has unique considerations regarding evidence, applicable law, and potential remedies.</p><br>
      
      <h2>Factors to Consider Before Litigating</h2>
      <p>Before pursuing litigation, consider the strength of your case, the amount at stake, the cost of litigation versus potential recovery, and the time commitment required. Litigation can be expensive and time-consuming, so it's essential to have realistic expectations about costs, timelines, and likely outcomes.</p><br>
      
      <h2>Alternative Dispute Resolution</h2>
      <p>Negotiation, mediation, and arbitration can often resolve disputes more quickly and cost-effectively than traditional litigation. These approaches allow parties to maintain greater control over the outcome and can preserve business or personal relationships that litigation might damage.</p><br>
      
      <h2>When Litigation Makes Sense</h2>
      <p>Litigation may be your best option when negotiation has failed, the other party is uncooperative or acting in bad faith, you need court orders for enforcement, or the legal principles at stake have broader implications beyond your specific case.</p><br>
      
      <h2>The Litigation Process</h2>
      <p>Civil litigation typically involves several stages: initial pleadings, discovery of evidence, pre-trial motions, and potentially trial. Most cases settle before trial, but being prepared to go to trial often strengthens your negotiating position.</p><br>
      
      <p>If you're involved in a dispute and considering legal action, Bekwyn Law PC can help you evaluate your options and develop a strategic approach that protects your interests while managing costs effectively.</p>
    `,
  },
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