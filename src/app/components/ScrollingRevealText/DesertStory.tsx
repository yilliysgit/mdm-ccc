// components/DesertStory.tsx
"use client";

import ScrollingRevealText from "./ScrollingRevealText";

type Cta = {
  label: string;
  href: string;
  external?: boolean;
  className?: string;
  variant?: "primary" | "secondary";
};

type Props = {
  title: string;
  lines: string[];
  primaryCta?: Cta;
  secondaryCta?: Cta;
};

export default function DesertStory({
  title,
  lines,
  primaryCta,
  secondaryCta,
}: Props) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* lichte grain/vignet (optioneel, kan je weghalen) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-multiply"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,.18) 0%, rgba(0,0,0,0) 60%), url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.7' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='.35'/></svg>\")",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 py-24 md:py-32 lg:py-40">
        <ScrollingRevealText
          title={title}
          lines={lines}
          durationMs={900}
          staggerMs={120}
          enterRatio={0.75}
          exitRatio={0.4}
          className="p-0"
          titleClass="text-5xl md:text-6xl lg:text-7xl font-black text-stone-900 leading-tight mb-16"
          lineClass="text-2xl md:text-3xl lg:text-4xl text-stone-800 font-semibold leading-relaxed"
          ctaAsLine
          ctaPrimary={primaryCta}
          ctaSecondary={secondaryCta}
        />
      </div>

      {/* zachte curve onderaan */}
      <svg
        className="relative block w-full text-white translate-y-1"
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
<path fill="transparent" d="M0,180 C140,20 00,140 1440,50 L1440,90 L0,90 Z" />
      </svg>
    </section>
  );
}
