'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface ActivityItemProps {
  title: string;
  description: string;
  image: string;
  imageRight?: boolean;
}

function ActivityItem({ title, description, image, imageRight }: ActivityItemProps) {
  return (
    <div
      className={`flex flex-col lg:flex-row ${
        imageRight ? 'lg:flex-row-reverse' : ''
      } items-center gap-10 lg:gap-16`}
    >
      {/* Image */}
      <div className="relative flex-1 w-full h-[360px] md:h-[420px] rounded-2xl overflow-hidden shadow-xl">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#243b2e]/30 to-transparent" />
      </div>

      {/* Text */}
      <div className="flex-1 text-[#243b2e]">
        <h3 className="font-serif text-3xl md:text-4xl font-bold mb-4">{title}</h3>
        <p className="text-lg md:text-xl leading-relaxed text-[#3b2f1a]/90">{description}</p>
      </div>
    </div>
  );
}

export default function WhatWeDo() {
  const t = useTranslations('WhatWeDo');

  return (
    <section className="relative py-20 md:py-28 bg-[#f3e9d4]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <span className="inline-block rounded-full border border-[#d8c37b] bg-white/50 px-4 py-1.5 text-xs font-semibold tracking-widest text-[#3b2f1a] uppercase">
            {t('badge')}
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-serif font-bold text-[#243b2e]">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg md:text-xl text-[#3b2f1a]/90 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="space-y-20 md:space-y-24">
          <ActivityItem
            title={t('rallies.title')}
            description={t('rallies.desc')}
            image="https://images.unsplash.com/photo-1519638399535-1b036603ac77?q=80&w=2000&auto=format&fit=crop"
            imageRight={false}
          />
          <ActivityItem
            title={t('education.title')}
            description={t('education.desc')}
            image="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=2000&auto=format&fit=crop"
            imageRight={true}
          />
          <ActivityItem
            title={t('community.title')}
            description={t('community.desc')}
            image="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000&auto=format&fit=crop"
            imageRight={false}
          />
        </div>
      </div>
    </section>
  );
}
