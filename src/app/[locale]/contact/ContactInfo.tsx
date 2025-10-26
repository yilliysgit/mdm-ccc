'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

type ContactInfoProps = {
  org?: string
  address?: {
    street: string
    postalCode: string
    city: string
    country?: string
  }
  phone?: string
  email?: string
  openingHours?: Array<{ label: string; value: string }>
  mapQuery?: string
  socials?: Array<{ label: string; href: string }>
}

export default function ContactInfo({
  org = "MDMCCC",
  address = { street: "Straat 1", postalCode: "1234 AB", city: "Stad", country: "Nederland" },
  phone = "+31 85 123 4567",
  email = "info@jouwdomein.nl",
  openingHours = [
    { label: "Ma–Vr", value: "09:00–17:30" },
    { label: "Za", value: "10:00–16:00" },
    { label: "Zo", value: "Gesloten" },
  ],
  mapQuery = "Straat 1, 1234 AB Stad",
  socials = [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "Facebook", href: "https://facebook.com/" },
  ],
}: ContactInfoProps) {
  const t = useTranslations('Contact.info');
  
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;
  const telHref = `tel:${phone.replace(/\s+/g, "")}`;
  const mailHref = `mailto:${email}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: org,
    email,
    telephone: phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      postalCode: address.postalCode,
      addressLocality: address.city,
      addressCountry: address.country || "NL",
    },
    sameAs: socials.map(s => s.href),
  };

  return (
    <aside className="rounded-2xl border border-stone-200 bg-white/80 p-6 shadow-sm">
      {/* Structured data voor SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <h2 className="mb-4 text-2xl font-bold text-stone-900">{t('title')}</h2>
      <div className="space-y-4 text-stone-800">
        {/* Adres */}
        <div>
          <div className="font-semibold">{org}</div>
          <div>{address.street}</div>
          <div>{address.postalCode} {address.city}</div>
          {address.country && <div>{address.country}</div>}
          <Link
            href={mapHref}
            target="_blank"
            className="mt-2 inline-block text-emerald-700 hover:underline"
            aria-label={t('routeMap')}
          >
            📍 {t('routeMap')}
          </Link>
        </div>

        {/* Telefoon & e-mail */}
        <div className="space-y-1">
          <Link href={telHref} className="block hover:underline">📞 {phone}</Link>
          <Link href={mailHref} className="block hover:underline">✉️ {email}</Link>
        </div>

        {/* Openingstijden */}
        {openingHours?.length ? (
          <div>
            <div className="mb-1 font-semibold">{t('openingHours')}</div>
            <ul className="divide-y divide-stone-200 rounded-xl border border-stone-200 bg-white">
              {openingHours.map((row) => (
                <li key={row.label} className="flex items-center justify-between px-3 py-2 text-sm">
                  <span className="text-stone-600">{row.label}</span>
                  <span className="font-medium">{row.value}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* CTA-knoppen */}
        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href={telHref}
            className="inline-flex items-center rounded-xl bg-emerald-700 px-4 py-2 font-semibold text-white hover:bg-emerald-800"
          >
            {t('callUs')}
          </Link>
          <Link
            href={mailHref}
            className="inline-flex items-center rounded-xl border border-emerald-700 px-4 py-2 font-semibold text-emerald-700 hover:bg-emerald-50"
          >
            {t('emailUs')}
          </Link>
        </div>

        {/* Socials */}
        {socials?.length ? (
          <div className="pt-2">
            <div className="mb-1 font-semibold">{t('followUs')}</div>
            <ul className="flex flex-wrap gap-3 text-sm">
              {socials.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} target="_blank" className="text-emerald-700 hover:underline">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      {/* Mini-kaart */}
      <div className="mt-6 overflow-hidden rounded-xl border border-stone-200">
        <iframe
          title={t('title')}
          className="h-56 w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`}
        />
      </div>
    </aside>
  );
}