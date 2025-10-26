'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

type Milestone = {
  year: string;
  title: string;
  text: string;
  image?: string;
};

export default function HistoryTimeline() {
  const t = useTranslations('History');

  const items: Milestone[] = [
    {
      year: '2010',
      title: t('items.2010.title'),
      text: t('items.2010.text'),
      image: '/images/history/2010.jpg',
    },
    {
      year: '2015',
      title: t('items.2015.title'),
      text: t('items.2015.text'),
      image: '/images/history/2015.jpg',
    },
    {
      year: '2020',
      title: t('items.2020.title'),
      text: t('items.2020.text'),
      image: '/images/history/2020.jpg',
    },
    {
      year: '2024',
      title: t('items.2024.title'),
      text: t('items.2024.text'),
      image: '/images/history/2024.jpg',
    },
  ];

  return (
    <section className="relative py-24 md:py-28 bg-[#f3e9d4] text-[#243b2e]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-14">
          <span className="inline-block rounded-full border border-[#d8c37b] bg-white/60 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-[#3b2f1a]">
            {t('badge')}
          </span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl font-bold tracking-tight">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg md:text-xl text-[#3b2f1a]/90 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="relative">
          {/* centrale lijn */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-[#c9a34f]/50 hidden md:block" />

          <ol className="space-y-12">
            {items.map((m, i) => {
              const isLeft = i % 2 === 0;
              return (
                <li key={m.year} className="md:grid md:grid-cols-2 md:gap-10 items-center">
                  {/* kolom links */}
                  <div className={`relative ${!isLeft ? 'md:order-2' : ''}`}>
                    {/* marker */}
                    <span className="hidden md:block absolute -right-6 top-2 h-3 w-3 rounded-full bg-[#c9a34f] ring-8 ring-[#f3e9d4]" />
                    <div className="rounded-2xl bg-white/80 border border-black/5 p-6 shadow-[0_12px_40px_rgba(36,59,46,0.12)]">
                      <div className="text-[#c9a34f] font-bold tracking-widest text-xs uppercase">{m.year}</div>
                      <h3 className="mt-1 text-2xl md:text-3xl font-semibold text-[#243b2e]">{m.title}</h3>
                      <p className="mt-3 text-base md:text-lg leading-relaxed text-[#3b2f1a]">{m.text}</p>
                    </div>
                  </div>

                  {/* kolom rechts (foto) */}
                  <div className={`mt-4 md:mt-0 ${!isLeft ? 'md:order-1' : ''}`}>
                    {m.image && (
                      <div className="relative h-[220px] md:h-[280px] rounded-2xl overflow-hidden shadow-[0_16px_50px_rgba(36,59,46,0.18)]">
                        <Image
                          src={m.image}
                          alt={`${m.year} – ${m.title}`}
                          fill
                          className="object-cover object-center"
                          sizes="(min-width:768px) 40vw, 100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#243b2e]/20 via-transparent to-transparent" />
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a
            href="/stories"
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
