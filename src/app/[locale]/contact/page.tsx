'use client';
import Header from "@/app/components/layout/header/Header";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import ContactForm from "@/app/components/forms/ContactForm";
import ContactInfo from "./ContactInfo";

export default function ContactPage() {
  const t = useTranslations('Contact');
  const searchParams = useSearchParams();
  
  const sent = searchParams.get('sent') === '1';
  const error = searchParams.get('error') === '1';

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100">
      {/* HERO */}
      <section className="relative isolate overflow-hidden pt-28 pb-24">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/contact-hero.jpg"
            alt={t('title')}
            fill
            className="object-cover opacity-25"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-white/30 -z-10" />
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h1 className="mb-4 text-5xl md:text-6xl font-black tracking-tight text-stone-900">
            {t('title')}
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-stone-700">
            {t('description')}
          </p>
        </div>
      </section>

      {/* Meldingen */}
      <section className="mx-auto max-w-3xl px-6">
        {sent && (
          <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-800">
            {t('success')}
          </div>
        )}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-800">
            {t('error')}
          </div>
        )}
      </section>

      {/* Form + Contact info */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <ContactForm />
          </div>

          <ContactInfo
            org="Marocains du Monde Classic Car Club"
            address={{ 
              street: "Avenue Mohammed V 10", 
              postalCode: "10000", 
              city: "Rabat", 
              country: "Marokko" 
            }}
            phone="+212 6 12 34 56 78"
            email="info@mdmccc.org"
            openingHours={[
              { label: t('info.hours.monFri'), value: "09:00–17:30" },
              { label: t('info.hours.sat'), value: "10:00–16:00" },
              { label: t('info.hours.sun'), value: t('info.hours.closed') },
            ]}
            mapQuery="Avenue Mohammed V 10, Rabat, Morocco"
            socials={[
              { label: "Instagram", href: "https://instagram.com/" },
              { label: "Facebook", href: "https://facebook.com/" },
              { label: "YouTube", href: "https://youtube.com/" },
            ]}
          />
        </div>
      </section>
    </main>
  );
}