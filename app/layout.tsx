// app/layout.tsx
import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { SiteSettingsProvider } from "@/contexts/site-settings-context"

export const metadata: Metadata = {
  title: "Bekwyn Law PC - Professional Legal Services in Ontario",
  description:
    "At Bekwyn Law, we believe that law is about people, not just paperwork. Professional legal services in immigration, family law, criminal law, and more.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <SiteSettingsProvider>
          <Suspense fallback={null}>{children}</Suspense>
          <Analytics />
        </SiteSettingsProvider>
      </body>
    </html>
  )
}