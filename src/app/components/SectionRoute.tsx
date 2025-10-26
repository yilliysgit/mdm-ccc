// components/SectionRoute.tsx
"use client";

// Kies de package die je gebruikt (één van de twee):
import { MapTrifold, Mountains, NavigationArrow } from "@phosphor-icons/react";
// import { MapTrifold, Mountains, NavigationArrow } from "phosphor-react";

type Stop = { title: string; desc: string };

const STOPS: Stop[] = [
  { title: "Agadir",    desc: "Start aan de oceaan" },
  { title: "Tafraoute", desc: "Granietrotsen & oases" },
  { title: "Atlas",     desc: "Bergpassen & kasbahs" },
  { title: "Marrakech", desc: "Finale & gala" },
];

export default function SectionRoute(): JSX.Element {
  return (
    <section className="relative bg-[#f6f3ea]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-14">
        <div className="mb-8 flex items-center gap-2">
          <MapTrifold size={18} className="text-emerald-800" />
          <h2 className="text-2xl md:text-3xl font-serif text-emerald-900">Route & etappes</h2>
        </div>

        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10">
          <div className="relative rounded-2xl bg-white/70 p-6 shadow-sm border border-neutral-200">
            <div className="absolute -left-6 top-10 h-40 w-40 rounded-full bg-emerald-900/10 blur-2xl" aria-hidden />
            <ol className="relative">
              {STOPS.map((s: Stop, i: number) => (
                <li key={s.title} className="relative pl-8 pb-6 last:pb-0">
                  <span className="absolute left-0 top-1 h-4 w-4 rounded-full bg-emerald-800" />
                  {i < STOPS.length - 1 && (
                    <span className="absolute left-[7px] top-4 h-full w-[2px] bg-emerald-200" aria-hidden />
                  )}
                  <h3 className="font-medium text-emerald-900">{s.title}</h3>
                  <p className="text-sm text-neutral-700">{s.desc}</p>
                </li>
              ))}
            </ol>
          </div>

          <ul className="grid sm:grid-cols-2 gap-4">
            <li className="rounded-xl bg-white/80 p-4 shadow-sm border border-neutral-200 flex items-start gap-3">
              <Mountains size={20} className="text-emerald-800 mt-0.5" />
              <div>
                <p className="font-medium text-emerald-900">Atlaspassen</p>
                <p className="text-sm text-neutral-700">Stuurmanswegen met adembenemende vergezichten.</p>
              </div>
            </li>
            <li className="rounded-xl bg-white/80 p-4 shadow-sm border border-neutral-200 flex items-start gap-3">
              <NavigationArrow size={20} className="text-emerald-800 mt-0.5" />
              <div>
                <p className="font-medium text-emerald-900">GPX & regularity</p>
                <p className="text-sm text-neutral-700">Lichte proefelementen voor wie wil — fun boven alles.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
