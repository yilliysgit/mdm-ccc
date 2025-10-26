'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function WhyClassicsCollage() {
  const t = useTranslations('WhyClassics');

  return (
    <section className="relative py-24 md:py-28 bg-[#f7f1e2] text-[#243b2e] overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-12 gap-12 items-center">
        {/* Tekstkolom links */}
        <motion.div
          className="lg:col-span-5"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            {t('title')}
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-[#3b2f1a]/90">
            {t('p1')}
          </p>
          <p className="mt-5 text-lg md:text-xl leading-relaxed text-[#3b2f1a]/90">
            {t('p2')}
          </p>
        </motion.div>

        {/* Collage rechts */}
        <motion.div
          className="lg:col-span-7 grid grid-cols-2 gap-4 relative"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Grote foto links */}
          <div className="row-span-2 relative h-[520px] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/images/classics/collage-main.jpg"
              alt={t('alt1')}
              fill
              className="object-cover object-center transition-transform duration-700 hover:scale-105"
            />
          </div>

          {/* Kleine foto's rechts */}
          <div className="relative h-[250px] rounded-2xl overflow-hidden shadow-md">
            <Image
              src="/images/classics/collage-detail1.jpg"
              alt={t('alt2')}
              fill
              className="object-cover object-center transition-transform duration-700 hover:scale-105"
            />
          </div>

          <div className="relative h-[250px] rounded-2xl overflow-hidden shadow-md">
            <Image
              src="/images/classics/collage-detail2.jpg"
              alt={t('alt3')}
              fill
              className="object-cover object-center transition-transform duration-700 hover:scale-105"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
