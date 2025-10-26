'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function FinalStatement() {
  const t = useTranslations('FinalStatement');

  return (
    <section className="relative py-28 bg-gradient-to-br from-[#f7f1e2] via-[#eadcb9] to-[#d8c37b] text-[#243b2e] overflow-hidden">
      {/* Decoratieve lijnen */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#c9a34f] to-transparent opacity-60" />
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#c9a34f] to-transparent opacity-60" />

      {/* Inhoud */}
      <motion.div
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="font-serif text-5xl md:text-6xl font-bold mb-8 leading-tight tracking-tight">
          {t('title')}
        </h2>

        <p className="text-lg md:text-2xl max-w-3xl mx-auto text-[#3b2f1a]/90 leading-relaxed mb-12">
          {t('subtitle')}
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/inschrijven"
            className="inline-flex items-center gap-2 rounded-full bg-[#243b2e] text-white px-8 py-4 font-semibold text-lg hover:bg-[#2f4a3c] shadow-[0_8px_20px_rgba(36,59,46,0.2)] transition-all"
          >
            {t('primaryCta')}
          </Link>
          <Link
            href="/rallys"
            className="inline-flex items-center gap-2 rounded-full border border-[#243b2e]/30 text-[#243b2e] px-8 py-4 font-semibold text-lg hover:bg-[#243b2e]/10 transition-all"
          >
            {t('secondaryCta')}
          </Link>
        </div>
      </motion.div>

      {/* Signature */}
      <div className="relative mt-20 text-center text-sm uppercase tracking-[0.3em] text-[#3b2f1a]/60">
        {t('tagline')}
      </div>
    </section>
  );
}
