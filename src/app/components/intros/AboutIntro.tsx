'use client';

import { useTranslations } from 'next-intl';

export default function AboutIntro() {
  const t = useTranslations('AboutIntro');

  return (
    <section className="relative py-12 md:py-16 bg-[#f7f1e2]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

{/* LEFT ~60% */}
<div className="lg:col-span-7 not-prose">
  <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#243b2e] tracking-tight">
    {t('heading')}
  </h2>

  {/* Body-tekst expliciet groter, met !important */}
  <p className="mt-5 !text-[20px] md:!text-[24px] lg:!text-[20px] !leading-[1.65] text-[#3b2f1a]">
    <strong>Marocains du Monde Classic Car Club</strong> {t('p1')}
  </p>
  <p className="mt-5 !text-[20px] md:!text-[24px] lg:!text-[20px] !leading-[1.65] text-[#3b2f1a]">
    {t('p2')}
  </p>

  <ul className="mt-7 grid sm:grid-cols-2 gap-3">
    <li className="rounded-xl bg-white/70 border border-black/5 px-4 py-3 text-sm md:text-[15px] text-[#243b2e]">• {t('h1')}</li>
    <li className="rounded-xl bg-white/70 border border-black/5 px-4 py-3 text-sm md:text-[15px] text-[#243b2e]">• {t('h2')}</li>
    <li className="rounded-xl bg-white/70 border border-black/5 px-4 py-3 text-sm md:text-[15px] text-[#243b2e]">• {t('h3')}</li>
    <li className="rounded-xl bg-white/70 border border-black/5 px-4 py-3 text-sm md:text-[15px] text-[#243b2e]">• {t('h4')}</li>
  </ul>
</div>

          {/* RIGHT 40% – Banner 336×600 */}
          <aside className="lg:col-span-5 w-full flex lg:justify-end">
            <div className="w-full max-w-[336px] min-h-[600px] rounded-2xl overflow-hidden border border-black/10 shadow-xl bg-white">
              <div className="h-full bg-gradient-to-b from-[#243b2e] to-[#c9a34f] relative">
                <div className="absolute inset-0 opacity-15 mix-blend-overlay"
                     style={{ backgroundImage: 'radial-gradient(circle at 30% 20%, #fff 0, transparent 40%)' }} />
                <div className="p-5 text-white flex h-full flex-col items-start justify-end">
                  <span className="text-xs uppercase tracking-widest opacity-90">{t('banner.label')}</span>
                  <h3 className="mt-1 text-xl font-semibold">336 × 600</h3>
                  <p className="mt-1 text-sm opacity-90">{t('banner.copy')}</p>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </section>
  );
}
