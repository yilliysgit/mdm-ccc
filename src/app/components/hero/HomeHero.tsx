'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { ArrowRight, MapPin, Calendar, Users } from '@phosphor-icons/react';

export default function Hero() {
  const t = useTranslations('Hero');

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* === BACKGROUND IMAGE === */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/test5.jpg"
          alt="Classic car journey through Sahara"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={90}
        />
        {/* Darker gradient voor betere leesbaarheid */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      </div>

      {/* === DECORATIVE ELEMENTS === */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-terra-500/5 blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-olive-500/5 blur-3xl rounded-full" />

      {/* === CONTENT === */}
      <div className="container-wide relative z-10 py-32 md:py-40">
        <div className="max-w-6xl mx-auto">
          {/* Subtitle */}
          <div className="mb-6 animate-fade-in">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium shadow-lg">
              <MapPin size={16} weight="duotone" />
              {t('subtitle')}
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-display font-serif font-bold text-white mb-6 animate-slide-in-left leading-tight max-w-5xl drop-shadow-2xl">
            {t('title')}
          </h1>

          {/* Description - LICHTER GEMAAKT */}
          <p className="text-body-lg text-white/90 mb-10 max-w-3xl animate-slide-in-left [animation-delay:100ms] leading-relaxed drop-shadow-lg">
            {t('description')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-16 animate-slide-in-left [animation-delay:200ms]">
            <Link href="/events" className="btn btn-primary group shadow-2xl">
              {t('discoverEvents')}
              <ArrowRight size={20} weight="bold" className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/about" className="btn btn-outline-light shadow-lg">
              {t('readManifest')}
            </Link>
          </div>

          {/* Stats/Features - VERBETERD MET GLASSMORPHISM */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl animate-fade-in [animation-delay:300ms]">
            {/* Stat 1 */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 p-6 hover:from-white/15 hover:to-white/10 transition-all duration-300 shadow-xl">
              <div className="absolute top-0 right-0 w-20 h-20 bg-terra-500/20 blur-2xl rounded-full" />
              <div className="relative flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-terra-500/30 backdrop-blur-sm flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Calendar size={28} weight="duotone" className="text-terra-300" />
                </div>
                <div>
                  <div className="text-3xl font-serif font-bold text-white drop-shadow-lg">15+</div>
                  <div className="text-sm text-white/80">{t('stats.years')}</div>
                </div>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 p-6 hover:from-white/15 hover:to-white/10 transition-all duration-300 shadow-xl">
              <div className="absolute top-0 right-0 w-20 h-20 bg-olive-500/20 blur-2xl rounded-full" />
              <div className="relative flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-olive-500/30 backdrop-blur-sm flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Users size={28} weight="duotone" className="text-olive-300" />
                </div>
                <div>
                  <div className="text-3xl font-serif font-bold text-white drop-shadow-lg">500+</div>
                  <div className="text-sm text-white/80">{t('stats.participants')}</div>
                </div>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 p-6 hover:from-white/15 hover:to-white/10 transition-all duration-300 shadow-xl">
              <div className="absolute top-0 right-0 w-20 h-20 bg-sand-400/20 blur-2xl rounded-full" />
              <div className="relative flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-sand-400/30 backdrop-blur-sm flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <MapPin size={28} weight="duotone" className="text-sand-200" />
                </div>
                <div>
                  <div className="text-3xl font-serif font-bold text-white drop-shadow-lg">3000km</div>
                  <div className="text-sm text-white/80">{t('stats.journey')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === SCROLL INDICATOR === */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2 backdrop-blur-sm">
          <div className="w-1 h-3 bg-white/60 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}