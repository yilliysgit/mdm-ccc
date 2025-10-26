'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import {
  Handshake,
  Car,
  GlobeHemisphereWest,
} from '@phosphor-icons/react';
import type { IconProps } from '@phosphor-icons/react';

function MissionCard({
  title,
  description,
  Icon,
}: {
  title: string;
  description: string;
  Icon: React.ComponentType<IconProps>;
}) {
  return (
    <article className="group relative rounded-2xl border border-[#e3c985] bg-white/70 p-6 shadow-[0_10px_30px_rgba(60,40,10,0.12)] transition-transform hover:-translate-y-0.5">
      <div className="flex items-start gap-4">
        <div className="shrink-0 rounded-xl bg-[#c9a34f]/15 p-3 ring-1 ring-[#c9a34f]/30">
          <Icon size={28} weight="regular" className="text-[#c9a34f]" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-[#243b2e]">{title}</h3>
          <p className="mt-2 text-[#3b2f1a] leading-relaxed">{description}</p>
        </div>
      </div>
    </article>
  );
}

export default function MissionSection() {
  const t = useTranslations('Mission');

  return (
    <section className="relative py-20 md:py-24 text-[#243b2e]">
      {/* Sahara-goud achtergrond */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#f3e9d4_0%,#e5d1a1_40%,#d8b46a_75%,#c9a34f_100%)]" />
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-14">
          <span className="inline-block rounded-full border border-[#d8c37b] bg-white/40 px-4 py-1.5 text-xs font-semibold tracking-widest text-[#3b2f1a] uppercase">
            {t('badge')}
          </span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl font-bold">{t('title')}</h2>
          <p className="mt-4 text-lg md:text-xl text-[#3b2f1a]/90 max-w-3xl mx-auto">{t('subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          <MissionCard
            Icon={Handshake}
            title={t('cards.impact.title')}
            description={t('cards.impact.desc')}
          />
          <MissionCard
            Icon={Car}
            title={t('cards.heritage.title')}
            description={t('cards.heritage.desc')}
          />
          <MissionCard
            Icon={GlobeHemisphereWest}
            title={t('cards.connection.title')}
            description={t('cards.connection.desc')}
          />
        </div>

        <div className="mt-14 text-center">
          <p className="text-lg md:text-xl font-medium text-[#3b2f1a]/90 mb-6">
            {t('closing')}
          </p>
          <Link
            href="/nieuws"
            className="inline-flex items-center gap-2 rounded-full bg-[#243b2e] px-6 py-3 font-semibold text-white shadow-[0_12px_28px_rgba(36,59,46,0.28)] hover:shadow-[0_16px_36px_rgba(36,59,46,0.36)] transition-shadow"
          >
            {t('cta')}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
