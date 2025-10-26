"use client"

import { useState } from "react"
import { useTranslations } from 'next-intl'

type Errors = Partial<Record<"name"|"email"|"message"|"consent", string>>

const isEmail = (v: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())

export default function ContactForm() {
  const t = useTranslations('Contact.form')
  const [errors, setErrors] = useState<Errors>({})

  function validate(form: HTMLFormElement) {
    const data = new FormData(form)
    const name = String(data.get("name") || "").trim()
    const email = String(data.get("email") || "").trim()
    const message = String(data.get("message") || "").trim()
    const consent = !!data.get("consent")

    const e: Errors = {}
    if (name.length < 2) e.name = t('validation.nameMin')
    if (!isEmail(email)) e.email = t('validation.emailInvalid')
    if (message.length < 10) e.message = t('validation.messageMin')
    if (!consent) e.consent = t('validation.consentRequired')

    setErrors(e)
    return Object.keys(e).length === 0
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    if (!validate(form)) {
      // focus het eerste foutveld
      const firstError = form.querySelector<HTMLElement>("[data-error='true']")
      firstError?.focus()
      return
    }

    // ✅ simulatie
    alert(t('successMessage'))
    console.log("Contactformulier (simulatie):", Object.fromEntries(new FormData(form).entries()))
    form.reset()
    setErrors({})
  }

  // helpers om rood randje te tonen
  const cls = (hasError: boolean) =>
    `mt-1 w-full rounded-xl border px-3 py-2 outline-none transition
     ${hasError ? "border-red-400 ring-4 ring-red-200/60" : "border-stone-300 focus:ring-4 focus:ring-emerald-600/25"}`

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4 rounded-2xl border border-stone-200 bg-white/80 p-6">
      {/* Naam */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-stone-700">
          {t('name')} {t('required')}
        </label>
        <input
          id="name" name="name" type="text" autoComplete="name"
          data-error={Boolean(errors.name)}
          className={cls(Boolean(errors.name))}
          placeholder={t('namePlaceholder')}
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      {/* E-mail */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-stone-700">
          {t('email')} {t('required')}
        </label>
        <input
          id="email" name="email" type="email" autoComplete="email"
          data-error={Boolean(errors.email)}
          className={cls(Boolean(errors.email))}
          placeholder={t('emailPlaceholder')}
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      {/* Onderwerp (optioneel) */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-stone-700">
          {t('subject')}
        </label>
        <input 
          id="subject" 
          name="subject" 
          type="text" 
          className={cls(false)} 
          placeholder={t('subjectPlaceholder')} 
        />
      </div>

      {/* Bericht */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-stone-700">
          {t('message')} {t('required')}
        </label>
        <textarea
          id="message" name="message" rows={6}
          data-error={Boolean(errors.message)}
          className={cls(Boolean(errors.message))}
          placeholder={t('messagePlaceholder')}
        />
        {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
      </div>

      {/* Toestemming */}
      <div className="flex items-start gap-2">
        <input 
          id="consent" 
          name="consent" 
          type="checkbox" 
          data-error={Boolean(errors.consent)} 
          className="mt-1" 
        />
        <label htmlFor="consent" className="text-sm text-stone-700">
          {t('consent')}
        </label>
      </div>
      {errors.consent && <p className="text-sm text-red-600">{errors.consent}</p>}

      <div>
        <button 
          type="submit" 
          className="inline-flex items-center rounded-xl bg-emerald-700 px-5 py-2.5 font-semibold text-white shadow-sm transition hover:bg-emerald-800"
        >
          {t('send')}
        </button>
      </div>
    </form>
  )
}