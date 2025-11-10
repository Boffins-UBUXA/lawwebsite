import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

type PayloadService =
  | "immigration"
  | "family"
  | "criminal"
  | "wills"
  | "employment"
  | "civil"
  | "other"

type Payload = {
  firstName: string
  lastName: string
  email: string
  phone?: string
  service?: PayloadService | ""
  message: string
  company?: string
}

type ServiceMapping = {
  label: string
  strapiValue: string | null
}

const SERVICE_MAP: Record<PayloadService, ServiceMapping> = {
  immigration: { label: "Immigration & Refugee Law", strapiValue: "Permanent Residency (PR)" },
  family: { label: "Family Law", strapiValue: "Family Sponsorship" },
  criminal: { label: "Criminal Law", strapiValue: "Other" },
  wills: { label: "Wills & Powers of Attorney", strapiValue: "Other" },
  employment: { label: "Employment & Human Rights", strapiValue: "Other" },
  civil: { label: "Civil Litigation", strapiValue: "Other" },
  other: { label: "Other", strapiValue: "Other" },
}

function resolveService(service?: PayloadService | "" | null) {
  if (!service) return { label: null, strapiValue: null }
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
    if (!body.firstName?.trim()) errors.push("First name is required.")
    if (!body.lastName?.trim()) errors.push("Last name is required.")
    if (!body.email?.trim() || !isEmail(body.email)) errors.push("A valid email is required.")
    if (!body.message?.trim()) errors.push("Message is required.")

    if (body.company && body.company.trim().length > 0) {
      return NextResponse.json({ ok: true }, { status: 200 })
    }

    if (errors.length) {
      return NextResponse.json({ ok: false, errors }, { status: 400 })
    }

    if (!STRAPI_TOKEN) {
      return NextResponse.json(
        { ok: false, error: "Missing STRAPI_TOKEN on server" },
        { status: 500 },
      )
    }

    const { label: serviceLabel, strapiValue } = resolveService(body.service)

    const messageForStrapi = [serviceLabel ? `Requested area: ${serviceLabel}` : null, body.message]
      .filter(Boolean)
      .join("\n\n")

    const res = await fetch(`${STRAPI_URL}/api/inquiries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          phone: body.phone?.trim() ? body.phone : null,
          service: strapiValue,
          message: messageForStrapi,
          source: "lawwebsite",
        },
      }),
      cache: "no-store",
    })

    if (!res.ok) {
      let detail: any
      try {
        detail = await res.json()
      } catch {
        detail = undefined
      }

      return NextResponse.json(
        { ok: false, error: "Failed to persist inquiry", detail },
        { status: 502 },
      )
    }

    await sendNotification(body).catch((err) => {
      console.error("Failed to send contact notification", err)
    })

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (error: any) {
    console.error("Law contact submission failed", error)
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
  if (!canSendEmail()) return

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
    "New contact inquiry",
    "",
    `Name: ${payload.firstName} ${payload.lastName}`,
    `Email: ${payload.email}`,
    payload.phone ? `Phone: ${payload.phone}` : null,
    serviceLabel ? `Requested area: ${serviceLabel}` : null,
    "",
    "Message:",
    payload.message,
  ]
    .filter(Boolean)
    .join("\n")

  const confirmationLines = [
    `Hello ${payload.firstName || ""},`,
    "",
    `Thank you for contacting Bekwyn Law PC. We've received your message and will respond within one business day.`,
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
      subject: "New website inquiry",
      text: lines,
    }),
    transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: payload.email,
      subject: "We received your inquiry",
      text: confirmationLines,
    }),
  ])
}