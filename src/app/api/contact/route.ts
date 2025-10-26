// src/app/api/contact/route.ts
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const form = await req.formData()
  const name = String(form.get("name") || "").trim()
  const email = String(form.get("email") || "").trim()
  const message = String(form.get("message") || "").trim()
  const consent = !!form.get("consent")

  // basis-validatie
  const invalid = !name || !email || !message || !consent

  // tijdelijke "fake send"
  if (!invalid) {
    console.log("✅ Contactformulier ontvangen:", { name, email, message })
  } else {
    console.log("❌ Ongeldige invoer:", { name, email, message, consent })
  }

  // redirect zoals normaal (geen 400 error)
  const url = new URL("/contact", req.url)
  url.searchParams.set(invalid ? "error" : "sent", "1")
  return NextResponse.redirect(url, { status: 303 })
}
