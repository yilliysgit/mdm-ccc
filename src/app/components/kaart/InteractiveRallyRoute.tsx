"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Simple data model for the 5 rally stages
const STAGES = [
  {
    id: 1,
    title: "1ère étape : Dakhla → Guerguerat (467 km)",
    desc:
      "Aventure palpitante, avec une nuit en bivouac au Poste frontalier de Guerguerat.",
    coord: { x: 56, y: 34 }, // relative SVG percentage-ish positions
  },
  {
    id: 2,
    title: "2ème étape : Guerguerat → Nouakchott (457 km)",
    desc:
      "Arrivée à Nouakchott, accueil par le Club Classic Car de Nouakchott.",
    coord: { x: 48, y: 58 },
  },
  {
    id: 3,
    title: "3ème étape : Nouakchott → Saint‑Louis (262 km)",
    desc:
      "Dernière étape avant le Sénégal, accueil par la Fédération Sénégalaise des Véhicules Anciens.",
    coord: { x: 43, y: 66 },
  },
  {
    id: 4,
    title: "4ème étape : Grand Prix ‘Route 75’ → Dakar (287 km)",
    desc:
      "Course de régularité vers Dakar, puis rejoignez la capitale sénégalaise.",
    coord: { x: 38, y: 83 },
  },
  {
    id: 5,
    title: "5ème étape : Clôture et hommage à la Route 75",
    desc:
      "Réception à Dakar et visite de la ville. Retour des participants et véhicules ensuite.",
    coord: { x: 36, y: 90 },
  },
];

function Dot({ active }: { active: boolean }) {
  return (
    <motion.circle
      r={active ? 7 : 5}
      className={active ? "fill-white" : "fill-white/80"}
      stroke={active ? "#111827" : "#111827"}
      strokeWidth={2}
      initial={false}
      animate={{ r: active ? 7 : 5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    />
  );
}

export default function InteractiveRallyRoute() {
  const [activeId, setActiveId] = useState<number>(1);
  const active = STAGES.find((s) => s.id === activeId)!;

  return (
    <div className="w-full mx-auto max-w-6xl p-4 sm:p-6">
      <div className="grid lg:grid-cols-2 gap-6 items-stretch">
        {/* MAP PANEL */}
        <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden shadow-xl min-h-[420px]">
          {/* Map-like SVG (stylized West Africa coastline) */}
          <svg
            viewBox="0 0 100 120"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Ocean */}
            <rect x="0" y="0" width="100" height="120" fill="#0f172a" />
            {/* Land mass (stylized) */}
            <path
              d="M30,5 C25,20 22,35 22,50 C22,62 28,72 34,78 C38,82 40,88 38,94 C37,98 38,104 40,108 C42,112 45,114 50,116 C58,119 66,118 72,113 C77,109 80,100 81,91 C83,76 82,63 82,55 C82,48 82,40 81,33 C80,23 77,16 72,11 C65,4 52,2 45,3 C38,4 34,5 30,5 Z"
              fill="#e3a857"
            />

            {/* Dashed route */}
            <path
              d="M56,34 L48,58 L43,66 L38,83 L36,90"
              stroke="#ffffff"
              strokeWidth="1.8"
              fill="none"
              strokeDasharray="2.5 2.5"
            />

            {/* Stage dots */}
            {STAGES.map((s, idx) => (
              <g
                key={s.id}
                transform={`translate(${s.coord.x}, ${s.coord.y})`}
                onMouseEnter={() => setActiveId(s.id)}
                onClick={() => setActiveId(s.id)}
                className="cursor-pointer"
              >
                <Dot active={activeId === s.id} />
                <text
                  x={8}
                  y={4}
                  fontSize={3.5}
                  fill="#fff"
                  className="drop-shadow"
                >
                  {idx === 0 ? "Dakhla" : idx === 1 ? "Nouakchott" : idx >= 3 ? "Dakar" : "Saint‑Louis"}
                </text>
              </g>
            ))}
          </svg>

          {/* Floating card with active stage info */}
          <div className="absolute left-4 right-4 bottom-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.25 }}
                className="backdrop-blur bg-white/10 border border-white/15 text-white rounded-xl p-4 shadow-lg"
              >
                <div className="text-xs uppercase tracking-wider mb-1 opacity-80">Étape {activeId}</div>
                <div className="font-semibold">{active.title}</div>
                <div className="text-sm opacity-90 mt-1">{active.desc}</div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* STAGE LIST */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl sm:text-2xl font-bold">Le parcours du rallye</h2>
            <span className="text-xs bg-slate-100 rounded-full px-3 py-1">Demo interactif</span>
          </div>
          <ol className="space-y-3">
            {STAGES.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => setActiveId(s.id)}
                  className={`w-full text-left rounded-xl p-3 border transition shadow-sm hover:shadow ${
                    activeId === s.id
                      ? "bg-blue-50 border-blue-200"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="text-slate-500 text-xs">Étape {s.id}</div>
                  <div className="font-semibold">{s.title}</div>
                  <div className="text-sm text-slate-600 mt-1">{s.desc}</div>
                </button>
              </li>
            ))}
          </ol>
          <div className="mt-5 flex flex-wrap gap-2 text-sm">
            <span className="px-2 py-1 rounded bg-amber-100 text-amber-900">Morocco</span>
            <span className="px-2 py-1 rounded bg-emerald-100 text-emerald-900">Mauritania</span>
            <span className="px-2 py-1 rounded bg-sky-100 text-sky-900">Sénégal</span>
          </div>
          <p className="mt-4 text-slate-600 text-sm">
            Tip: klik op een etappe om de marker op de kaart te activeren. Dit is een
            vereenvoudigde demo (geen echte geografie), maar het laat zien hoe we
            binnen deze chat een **interactieve** route met uitleg kunnen tonen.
          </p>
        </div>
      </div>
    </div>
  );
}
