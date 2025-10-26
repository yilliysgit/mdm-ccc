'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

type Partner = {
  id: number;
  name: string;
  logo: string;
  url: string;
};

const partners: Partner[] = [
  { id: 1, name: 'FAVA',  logo: '/images/partners/fava-logo.svg',  url: 'https://fava.com' },
  { id: 2, name: 'FMAA',  logo: '/images/partners/fmaa-logo.svg',  url: 'https://fmaa.com' },
  { id: 3, name: 'FRSMA', logo: '/images/partners/frsma-logo.svg', url: 'https://frsma.com' },
  { id: 4, name: 'RACM',  logo: '/images/partners/racm-logo.svg',  url: 'https://racm.com' },
  { id: 5, name: 'Shell', logo: '/images/partners/shell-logo.svg', url: 'https://shell.com' }
];

export default function PartnersSlider() {
  const t = useTranslations('Partners');

  const quadrupled = [...partners, ...partners, ...partners, ...partners];

  return (
    <section className="relative overflow-hidden py-20 md:py-32" style={{
      background: `
        radial-gradient(circle at 15% 20%, rgba(212, 145, 111, 0.08) 0%, transparent 40%),
        radial-gradient(circle at 85% 80%, rgba(138, 145, 109, 0.08) 0%, transparent 40%),
        linear-gradient(135deg, #f9f6f1 0%, #f3ede3 50%, #e8ddc8 100%)
      `
    }}>
      {/* Decorative blobs - grotere en zichtbaardere */}
      <div className="pointer-events-none absolute -top-40 left-0 h-[700px] w-[700px] rounded-full bg-terra-400/8 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full bg-olive-400/8 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-1/2 h-[500px] w-[500px] rounded-full bg-terra-500/6 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-terra-500/20 bg-terra-500/5 px-5 py-2.5 text-sm font-semibold tracking-wide text-terra-700 backdrop-blur-sm">
            {t('badge')}
          </span>
          <h2 className="mb-5 font-serif text-4xl font-bold text-earth-900 md:text-5xl lg:text-6xl" style={{
            letterSpacing: '-0.02em'
          }}>
            {t('title')}
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-earth-700 md:text-xl" style={{
            lineHeight: '1.7'
          }}>
            {t('description')}
          </p>
        </div>

        {/* Slider */}
        <div className="relative group">
          <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-sand-200/80 via-sand-200/60 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-sand-200/80 via-sand-200/60 to-transparent z-10 pointer-events-none" />

          <div className="overflow-hidden">
            <div className="flex gap-8 py-8 partners-track">
              {quadrupled.map((p, i) => (
                
                  <a key={`partner-${i}`}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="partner-logo relative flex h-32 w-56 shrink-0 items-center justify-center rounded-3xl border border-sand-300/40 bg-white/90 p-3 shadow-soft backdrop-blur-md md:h-36 md:w-64 md:p-4"
                >
                  <span className="sr-only">{p.name}</span>
                  <div className="relative h-full w-full">
                    <Image
                      src={p.logo}
                      alt={`${p.name} logo`}
                      fill
                      sizes="(max-width: 768px) 224px, 256px"
                      className="object-contain transition-all duration-500"
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* CTA button */}
        <div className="mt-16 text-center">
          
            <a href="/partners"
            className="view-all-btn inline-flex items-center gap-3 rounded-xl border-2 border-olive-600/30 bg-white/80 px-8 py-4 text-base font-semibold text-earth-800 shadow-soft backdrop-blur-sm transition-all duration-300 hover:shadow-warm md:text-lg"
          >
            {t('viewAll')}
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}