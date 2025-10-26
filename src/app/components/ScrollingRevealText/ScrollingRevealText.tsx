// components/ScrollingRevealText.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from '@/i18n/routing'

type Cta = {
  label: string;
  href: string;
  external?: boolean;
  className?: string;
  variant?: "primary" | "secondary";
};

type Props = {
  title?: string;
  lines: string[];

  // animatie tuning
  durationMs?: number;   // standaard 900
  staggerMs?: number;    // standaard 110
  enterRatio?: number;   // 0..1 zichtbaar voordat hij "aan" gaat (default .75)
  exitRatio?: number;    // 0..1 wanneer hij weer "uit" mag (default .40)

  // styling
  className?: string;
  titleClass?: string;
  lineClass?: string;

  // CTA als “laatste regel”
  ctaAsLine?: boolean;
  ctaPrimary?: Cta;
  ctaSecondary?: Cta;
};

export default function ScrollingRevealText({
  title,
  lines,
  durationMs = 900,
  staggerMs = 110,
  enterRatio = 0.75,
  exitRatio = 0.4,
  className = "",
  titleClass = "text-5xl md:text-6xl lg:text-7xl font-black text-stone-900 leading-tight mb-16",
  lineClass = "text-2xl md:text-3xl lg:text-4xl text-stone-800 font-semibold leading-relaxed",
  ctaAsLine = false,
  ctaPrimary,
  ctaSecondary,
}: Props) {
  // refs voor elke regel
  const lineRefs = useRef<Array<HTMLParagraphElement | null>>([]);
  const setLineRef = (i: number) => (el: HTMLParagraphElement | null) => {
    lineRefs.current[i] = el;
  };

  // sentinel aan de top om te weten of we "voorbij het begin" zijn
  const topSentinelRef = useRef<HTMLDivElement | null>(null);
  const [pastStart, setPastStart] = useState(false);

  // zichtbaarheid en “ooit gezien”
  const [ready, setReady] = useState(false); // rAF-gate zodat transitions kunnen starten
  const [visible, setVisible] = useState<boolean[]>(
    () => new Array(lines.length).fill(false)
  );
  const [seen, setSeen] = useState<boolean[]>(
    () => new Array(lines.length).fill(false)
  );

  const reduceMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
    []
  );

  // 0) rAF-gate (2 frames) zodat we niet vóór de eerste paint “aan” zetten
  useEffect(() => {
    const id1 = requestAnimationFrame(() => {
      const id2 = requestAnimationFrame(() => setReady(true));
      return () => cancelAnimationFrame(id2);
    });
    return () => cancelAnimationFrame(id1);
  }, []);

  // 1) Top-sentinel: we zijn “voorbij” de start wanneer de sentinel NIET intersecteert
  useEffect(() => {
    const el = topSentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        // sentinel uit beeld = we zijn voorbij het begin
        setPastStart(!entry.isIntersecting);
      },
      {
        root: null,
        // Door de negatieve bottom margin moet de sentinel echt “uit zicht” zijn.
        rootMargin: "0px 0px -90% 0px",
        threshold: 0,
      }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // 2) Regels observeren (functionele updates om stale state te voorkomen)
  useEffect(() => {
    if (reduceMotion) {
      setVisible(new Array(lines.length).fill(true));
      setSeen(new Array(lines.length).fill(true));
      return;
    }
    if (!ready) return;
    if (lineRefs.current.filter(Boolean).length !== lines.length) return;

    const thresholds = Array.from({ length: 21 }, (_, i) => i / 20);

    const io = new IntersectionObserver(
      (entries) => {
        setVisible((prev) => {
          const next = [...prev];
          const toMarkSeen: number[] = [];

          for (const e of entries) {
            const idx = parseInt(
              (e.target as HTMLElement).dataset.index || "-1",
              10
            );
            if (isNaN(idx)) continue;

            const r = e.intersectionRatio;
            if (!prev[idx] && r >= enterRatio) {
              next[idx] = true;
              toMarkSeen.push(idx);
            }
            if (prev[idx] && r < exitRatio) {
              next[idx] = false;
            }
          }

          if (toMarkSeen.length) {
            setSeen((prevSeen) => {
              const s = [...prevSeen];
              for (const i of toMarkSeen) s[i] = true;
              return s;
            });
          }

          return next;
        });
      },
      { root: null, rootMargin: "-5% 0px -30% 0px", threshold: thresholds }
    );

    lineRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [ready, lines.length, enterRatio, exitRatio, reduceMotion]);

  // 3) CTA logic — toon pas als alle regels ooit gezien zijn én we voorbij de start zijn
  const allSeen = seen.length > 0 && seen.every(Boolean);
  const ctaShow = ready && allSeen && pastStart;

  return (
    <section className={`relative mx-auto max-w-6xl px-6 py-16 md:py-24 ${className}`}>
      {/* onzichtbare, maar betrouwbare sentinel bovenaan */}
      <div
        ref={topSentinelRef}
        aria-hidden
        className="absolute top-0 left-0 h-64 w-px"
      />

      {title && <h2 className={`mb-12 ${titleClass}`}>{title}</h2>}

      <div className="space-y-6">
        {lines.map((line, i) => {
          const show = ready && visible[i];
          return (
            <p
              key={i}
              ref={setLineRef(i)}
              data-index={i}
              className={[
                lineClass,
                "leading-relaxed will-change-transform transition-all",
                show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              ].join(" ")}
              style={{
                transitionDuration: `${durationMs}ms`,
                transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
                transitionDelay: show ? `${i * staggerMs}ms` : "0ms",
              }}
            >
              {line}
            </p>
          );
        })}

        {/* CTA als 'laatste regel' */}
        {ctaAsLine && (ctaPrimary || ctaSecondary) && (
          <div
            className={[
              "flex flex-wrap gap-6 transition-all",
              ctaShow
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4 pointer-events-none",
            ].join(" ")}
            style={{
              transitionDuration: `${durationMs}ms`,
              transitionTimingFunction: "cubic-bezier(.22,.61,.36,1)",
              // kleine buffer na de laatste stagger
              transitionDelay: ctaShow
                ? `${lines.length * staggerMs + 150}ms`
                : "0ms",
            }}
          >
            {ctaPrimary && (
              <Link
                href={ctaPrimary.href}
                target={ctaPrimary.external ? "_blank" : undefined}
                rel={ctaPrimary.external ? "noopener noreferrer" : undefined}
                className={`px-8 md:px-10 py-4 md:py-5 bg-green-700 hover:bg-green-800 text-white text-lg md:text-xl font-bold rounded-full transition-all shadow-2xl hover:shadow-xl hover:scale-105 ${ctaPrimary.className || ""}`}
              >
                {ctaPrimary.label}
              </Link>
            )}
            {ctaSecondary && (
              <Link
                href={ctaSecondary.href}
                target={ctaSecondary.external ? "_blank" : undefined}
                rel={ctaSecondary.external ? "noopener noreferrer" : undefined}
                className={`px-8 md:px-10 py-4 md:py-5 bg-white hover:bg-amber-50 text-stone-900 text-lg md:text-xl font-bold rounded-full border border-stone-300 hover:border-green-700 transition-all shadow-xl hover:shadow-2xl hover:scale-105 ${ctaSecondary.className || ""}`}
              >
                {ctaSecondary.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
