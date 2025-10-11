"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function LegalAidPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-10 md:p-16">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary text-center mb-6">
              Legal Aid Eligibility
            </h1>
            <div className="w-20 h-1 bg-secondary mx-auto mb-10 rounded-full"></div>
            <p className="text-lg text-muted-foreground leading-relaxed text-justify">
              Legal Aid Ontario is committed to promoting equal access to justice by providing quality legal services
              to individuals who may not otherwise be able to afford representation. Through its certificate and duty
              counsel programs, Legal Aid Ontario assists clients who meet specific financial and case-related
              eligibility requirements.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed mt-6 text-justify">
              At <span className="font-semibold text-primary">Bekwyn Law</span>, we accept Legal Aid Ontario
              certificates and are proud to serve clients who qualify for this vital support. If your circumstances fall
              within the approved income and asset thresholds, you may be entitled to legal assistance in a variety of
              areas, including immigration and refugee law, family law, criminal defense, and certain civil matters.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed mt-6 text-justify">
              Clients who qualify may receive comprehensive support—from initial legal advice to full representation in
              court or before administrative tribunals. Legal Aid Ontario also offers summary advice, mediation, and
              referrals to community legal clinics for additional resources.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed mt-6 text-justify">
              To determine your eligibility, you can apply directly through the Legal Aid Ontario website, by phone, or
              in person at any local office. Understanding the process early ensures you receive timely assistance and
              the legal guidance you need to protect your rights and interests.
            </p>

            <div className="text-center mt-10">
              <a
                href="https://www.legalaid.on.ca/services/am-i-eligible/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-secondary text-white px-6 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-all"
              >
                Visit Legal Aid Ontario Website
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
