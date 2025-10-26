'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function AboutHero() {
  const t = useTranslations('About');

  // Subtiele parallax (zonder extra libs)
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY * 0.12); // 12% parallax
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="relative w-full h-[56vh] md:h-[68vh] min-h-[460px] overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translate3d(0, ${y * -1}px, 0)` }}
      >
        <Image
          src="/images/over-ons/mdm-ccc-over-ons.jpg"
          alt={t('imageAlt')}
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Color grade (brand duotone) */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,35,28,0.55)_0%,rgba(20,35,28,0.35)_28%,rgba(201,163,79,0.10)_100%)] mix-blend-multiply" />

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_30%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.35)_100%)]" />

      {/* Film grain (subtiel) */}
      <div className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay"
           style={{ backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'160\' height=\'160\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'2\' stitchTiles=\'stitch\'/></filter><rect width=\'100%\' height=\'100%\' filter=\'url(%23n)\' opacity=\'0.3\'/></svg>")' }} />

      {/* Top label bubble */}
      <div className="absolute top-6 md:top-8 left-1/2 -translate-x-1/2 z-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 backdrop-blur-md">
          <span className="text-xs md:text-sm font-semibold tracking-wide text-white uppercase">
            {t('badge')}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 mx-auto max-w-6xl px-6 h-full flex flex-col items-center justify-center text-center">
        <h1
          className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white"
          style={{ letterSpacing: '-0.02em', textShadow: '0 4px 24px rgba(0,0,0,0.45)' }}
        >
          {t('title')}
        </h1>

        <p
          className="mt-5 md:mt-6 text-base md:text-xl max-w-3xl text-white/95"
          style={{ textShadow: '0 2px 14px rgba(0,0,0,0.35)' }}
        >
          {t('subtitle')}
        </p>

        {/* CTA’s (optioneel) */}
        <div className="mt-7 md:mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="/rallys"
            className="inline-flex items-center gap-2 rounded-full bg-[#243b2e] text-white px-6 py-3 text-sm md:text-base font-semibold shadow-[0_10px_30px_rgba(36,59,46,0.35)] hover:shadow-[0_14px_38px_rgba(36,59,46,0.45)] transition-shadow"
          >
            {t('primaryCta', { default: 'Ontdek onze rally’s' })}
            <span aria-hidden>→</span>
          </a>
          <a
            href="/inschrijven"
            className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-6 py-3 text-sm md:text-base font-semibold text-white backdrop-blur-sm hover:bg-white/15 transition"
          >
            {t('secondaryCta', { default: 'Doe mee' })}
          </a>
        </div>
      </div>

      {/* Bottom sand fade naar pagina-achtergrond */}
      <div className="absolute bottom-0 left-0 right-0 h-28 md:h-36 bg-gradient-to-t from-[#f3e9d4] to-transparent z-10" />
    </section>
  );
}
