import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { z } from "zod"

const schema = z.object({
  email: z.string().email(),
  name: z
    .string()
    .trim()
    .max(120)
    .optional()
    .transform((value) => (value ? value : undefined)),
  source: z
    .string()
    .trim()
    .max(120)
    .optional()
    .transform((value) => (value ? value : undefined)),
})

const STRAPI_URL =
  process.env.STRAPI_URL?.replace(/\/$/, "") ||
  process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/$/, "") ||
  "http://localhost:1337"

const STRAPI_TOKEN = process.env.STRAPI_TOKEN || process.env.NEXT_PUBLIC_STRAPI_TOKEN

type SubscriberPayload = z.infer<typeof schema>

async function upsertSubscriber(payload: SubscriberPayload) {
  if (!STRAPI_TOKEN) {
    throw new Error("Newsletter storage is not configured (missing STRAPI_TOKEN).")
  }

  const email = payload.email.toLowerCase()

  const response = await fetch(`${STRAPI_URL}/api/newsletter/subscribe`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      name: payload.name || null,
      source: payload.source || null,
    }),
  })

  if (response.status === 200 || response.status === 201) {
    const json = await response.json().catch(() => ({}))
    return { status: (json?.status === "exists" ? "exists" : "created") as "exists" | "created" }
  }

  const body = await response.text()
  throw new Error(`Unable to create subscriber (${response.status}): ${body}`)
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

async function sendNotification(payload: SubscriberPayload) {
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

  const lines = [
    `New newsletter subscriber`,
    "",
    `Email: ${payload.email}`,
    payload.name ? `Name: ${payload.name}` : null,
    payload.source ? `Source: ${payload.source}` : null,
    "",
    `This subscriber joined via the law website.`,
  ]
    .filter(Boolean)
    .join("\n")

  const subscriberLines = [
    `Thank you for subscribing to Bekwyn Law's newsletter!`,
    "",
    `We're glad to keep you informed with legal insights, firm updates, and resources that support you and your loved ones.`,
    "",
    `If you have any questions, reach out to us at ${process.env.NEWSLETTER_NOTIFICATION_EMAIL}.`,
    "",
    `Warm regards,`,
    `Bekwyn Law PC`,
  ]
    .filter(Boolean)
    .join("\n")

  await Promise.all([
    transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.NEWSLETTER_NOTIFICATION_EMAIL,
      subject: "New newsletter subscriber",
      text: lines,
    }),
    transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: payload.email,
      subject: "Thank you for subscribing to Bekwyn Law",
      text: subscriberLines,
    }),
  ])
}

export async function POST(request: Request) {
  try {
    const raw = await request.json()
    const payload = schema.parse({
      email: raw.email,
      name: raw.name,
      source: raw.source ?? request.headers.get("x-form-source") ?? undefined,
    })

    const result = await upsertSubscriber(payload)

    await sendNotification(payload).catch((err) => {
      console.error("Failed to send newsletter notification", err)
    })

    const message =
      result.status === "exists"
        ? "You're already subscribed. Thank you for staying connected."
        : "Thanks for subscribing! We'll keep you updated with legal insights."

    return NextResponse.json({ status: result.status, message })
  } catch (error: any) {
    console.error("Law newsletter subscription failed", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 })
    }

    return NextResponse.json(
      { message: "We couldn't add you right now. Please try again later." },
      { status: 500 },
    )
  }
}
