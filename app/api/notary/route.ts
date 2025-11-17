import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

type NotaryService =
  | "document-certification"
  | "affidavit-witnessing"
  | "signature-witnessing"
  | "travel-documents"
  | "real-estate"
  | "other"

type Payload = {
  name: string
  email: string
  phone?: string
  service?: NotaryService | ""
  message: string
  company?: string
}

type ServiceMapping = {
  label: string
  strapiValue: string | null
}

const SERVICE_MAP: Record<NotaryService, ServiceMapping> = {
  "document-certification": { label: "Document Certification", strapiValue: "Other" },
  "affidavit-witnessing": { label: "Affidavit Witnessing", strapiValue: "Other" },
  "signature-witnessing": { label: "Signature Witnessing", strapiValue: "Other" },
  "travel-documents": { label: "Travel Documents", strapiValue: "Other" },
  "real-estate": { label: "Real Estate Documents", strapiValue: "Other" },
  other: { label: "Other", strapiValue: "Other" },
}

function resolveService(service?: NotaryService | "" | null) {
  if (!service) return { label: null, strapiValue: "Other" }
  return SERVICE_MAP[service] ?? { label: service, strapiValue: "Other" }
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

const STRAPI_URL =
  process.env.STRAPI_URL?.replace(/\/$/, "") ||
  process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, "") ||
  "http://localhost:1337"

const STRAPI_TOKEN = process.env.STRAPI_TOKEN || process.env.NEXT_PUBLIC_STRAPI_TOKEN

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Payload

    const errors: string[] = []
    if (!body.name?.trim()) errors.push("Name is required.")
    if (!body.email?.trim() || !isEmail(body.email)) errors.push("A valid email is required.")
    if (!body.message?.trim()) errors.push("Message is required.")

    // Honeypot check
    if (body.company && body.company.trim().length > 0) {
      return NextResponse.json({ ok: true }, { status: 200 })
    }

    if (errors.length) {
      return NextResponse.json({ ok: false, errors }, { status: 400 })
    }

    if (!STRAPI_TOKEN) {
      console.error("STRAPI_TOKEN is missing")
      return NextResponse.json(
        { ok: false, error: "Server configuration error" },
        { status: 500 },
      )
    }

    const { label: serviceLabel, strapiValue } = resolveService(body.service)

    // Split name into first and last name
    const nameParts = body.name.trim().split(" ")
    const firstName = nameParts[0] || body.name
    const lastName = nameParts.slice(1).join(" ") || ""

    const messageForStrapi = [
      "NOTARY SERVICE INQUIRY",
      serviceLabel ? `Service: ${serviceLabel}` : null,
      "",
      body.message,
    ]
      .filter(Boolean)
      .join("\n")

    const strapiPayload = {
      data: {
        firstName: firstName,
        lastName: lastName,
        email: body.email,
        phone: body.phone?.trim() || null,
        service: strapiValue,
        message: messageForStrapi,
        source: "notary-website",
      },
    }

    console.log("Sending to Strapi:", JSON.stringify(strapiPayload, null, 2))

    const res = await fetch(`${STRAPI_URL}/api/inquiries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      body: JSON.stringify(strapiPayload),
      cache: "no-store",
    })

    const responseText = await res.text()
    console.log("Strapi response status:", res.status)
    console.log("Strapi response:", responseText)

    if (!res.ok) {
      let detail: any
      try {
        detail = JSON.parse(responseText)
      } catch {
        detail = { raw: responseText }
      }

      console.error("Strapi error:", detail)
      
      // Still send email notification even if Strapi fails
      await sendNotification(body).catch((err) => {
        console.error("Failed to send notary notification", err)
      })

      return NextResponse.json(
        { ok: false, error: "Failed to save inquiry. We've received your message via email.", detail },
        { status: 200 }, // Return 200 so user sees success message
      )
    }

    // Send email notification
    await sendNotification(body).catch((err) => {
      console.error("Failed to send notary notification", err)
    })

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (error: any) {
    console.error("Notary contact submission failed", error)
    
    // Try to send email as fallback
    try {
      const body = (await req.json()) as Payload
      await sendNotification(body).catch(() => {})
    } catch {}
    
    return NextResponse.json(
      { ok: false, error: error?.message || "Unexpected error" },
      { status: 500 },
    )
  }
}

function canSendEmail() {
  return (
    !!process.env.NEWSLETTER_NOTIFICATION_EMAIL &&
    !!process.env.SMTP_HOST &&
    !!process.env.SMTP_PORT &&
    !!process.env.SMTP_USER &&
    !!process.env.SMTP_PASS
  )
}

async function sendNotification(payload: Payload) {
  if (!canSendEmail()) {
    console.log("Email configuration missing, skipping notification")
    return
  }

  const port = Number(process.env.SMTP_PORT)
  const secure = process.env.SMTP_SECURE === "true" || port === 465

  const transporterOptions: nodemailer.TransportOptions = {
    host: process.env.SMTP_HOST,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  }

  if (process.env.SMTP_ALLOW_SELF_SIGNED === "true") {
    transporterOptions.tls = { rejectUnauthorized: false }
  }

  const transporter = nodemailer.createTransport(transporterOptions)

  const { label: serviceLabel } = resolveService(payload.service)

  const lines = [
    "🔔 New Notary Service Inquiry",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.phone ? `Phone: ${payload.phone}` : null,
    serviceLabel ? `Service: ${serviceLabel}` : null,
    "",
    "Message:",
    payload.message,
    "",
    "---",
    "Source: Notary Website Form",
  ]
    .filter(Boolean)
    .join("\n")

  const confirmationLines = [
    `Hello ${payload.name.split(" ")[0] || ""},`,
    "",
    `Thank you for contacting Bekwyn Law PC for notary services. We've received your inquiry and will respond within 24 hours.`,
    "",
    "For urgent matters, please call us at +1 (289) 838-2982.",
    "",
    "Warm regards,",
    "Bekwyn Law PC",
  ]
    .filter(Boolean)
    .join("\n")

  await Promise.all([
    transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.NEWSLETTER_NOTIFICATION_EMAIL,
      subject: "🔔 New Notary Service Inquiry",
      text: lines,
    }),
    transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: payload.email,
      subject: "We received your notary inquiry - Bekwyn Law PC",
      text: confirmationLines,
    }),
  ])
}