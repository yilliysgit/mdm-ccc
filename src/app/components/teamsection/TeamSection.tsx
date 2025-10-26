'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { UsersThree, Wrench, MapTrifold } from '@phosphor-icons/react';

type TeamMember = {
  name: string;
  role: string;
  photo: string; // /public/images/team/...
};

const TEAM: TeamMember[] = [
  { name: 'Y. El Amrani', role: 'Voorzitter & Rally Director', photo: '/images/team/1.jpg' },
  { name: 'S. Benali', role: 'Techniek & Logistiek', photo: '/images/team/2.jpg' },
  { name: 'R. Ait Lahcen', role: 'Partnerships & Events', photo: '/images/team/3.jpg' },
  { name: 'N. El Fassi', role: 'Community & Media', photo: '/images/team/4.jpg' }
];

export default function TeamSection() {
  const t = useTranslations('Team');

  return (
    <section className="relative py-24 md:py-28 bg-[#f3e9d4] text-[#243b2e]">
      <div className="mx-auto max-w-6xl px-6">
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block rounded-full border border-[#d8c37b] bg-white/60 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-[#3b2f1a]">
            {t('badge')}
          </span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl font-bold tracking-tight">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg md:text-xl text-[#3b2f1a]/90">
            {t('lead1')}
          </p>
          <p className="mt-3 text-base md:text-lg text-[#3b2f1a]/90">
            {t('lead2')}
          </p>

          {/* Stats / badges */}
          <div className="mt-8 grid sm:grid-cols-3 gap-3">
            <div className="flex items-center justify-center gap-2 rounded-xl bg-white/80 border border-black/5 py-3 px-4">
              <UsersThree size={22} className="text-[#c9a34f]" />
              <span className="text-sm md:text-base">{t('stats.members')}</span>
            </div>
            <div className="flex items-center justify-center gap-2 rounded-xl bg-white/80 border border-black/5 py-3 px-4">
              <MapTrifold size={22} className="text-[#c9a34f]" />
              <span className="text-sm md:text-base">{t('stats.rallies')}</span>
            </div>
            <div className="flex items-center justify-center gap-2 rounded-xl bg-white/80 border border-black/5 py-3 px-4">
              <Wrench size={22} className="text-[#c9a34f]" />
              <span className="text-sm md:text-base">{t('stats.experience')}</span>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((m) => (
            <article key={m.name} className="rounded-2xl overflow-hidden bg-white/80 border border-black/5 shadow-[0_12px_40px_rgba(36,59,46,0.12)]">
              <div className="relative h-64">
                <Image
                  src={m.photo}
                  alt={`${m.name} – ${m.role}`}
                  fill
                  className="object-cover object-center"
                  sizes="(min-width:1024px) 25vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#243b2e]/30 via-transparent to-transparent" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{m.name}</h3>
                <p className="text-sm text-[#3b2f1a]/90">{m.role}</p>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#243b2e] px-6 py-3 font-semibold text-white shadow-[0_12px_28px_rgba(36,59,46,0.28)] hover:shadow-[0_16px_36px_rgba(36,59,46,0.36)] transition-shadow"
          >
            {t('cta')}
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
