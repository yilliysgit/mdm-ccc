"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * RallyMapOverlay - drop-in component for Next.js/React
 *
 * Fastest route to your look: use your existing MAP IMAGE (PNG/JPG) as background
 * and overlay an SVG with an animated dashed route + interactive waypoints.
 *
 * ✅ Pixel-precise layout: give the original image's width/height once
 * ✅ Fully responsive: scales proportionally while keeping hotspot alignment
 * ✅ Tooltips, focus, keyboard nav
 */

export type Waypoint = {
  id: string;
  label: string;
  /** pixel coordinates relative to the ORIGINAL image size */
  x: number;
  y: number;
  description?: string;
};

export default function RallyMapOverlay({
  src,
  alt = "Rally map",
  imgWidth,
  imgHeight,
  waypoints,
  path, // array of waypoint ids in order
}: {
  src: string;
  alt?: string;
  imgWidth: number;
  imgHeight: number;
  waypoints: Waypoint[];
  path: string[];
}) {
  const [active, setActive] = useState<string | null>(path[0] ?? null);

  const wpById = useMemo(() => {
    const m = new Map<string, Waypoint>();
    waypoints.forEach((w) => m.set(w.id, w));
    return m;
  }, [waypoints]);

  const polyline = useMemo(() => {
    return path
      .map((id) => {
        const w = wpById.get(id);
        return w ? `${w.x},${w.y}` : null;
      })
      .filter(Boolean)
      .join(" ");
  }, [path, wpById]);

  return (
    <div className="w-full">
      {/* Aspect-ratio box based on original image dims */}
      <div
        className="relative w-full overflow-hidden rounded-2xl shadow-xl"
        style={{ aspectRatio: `${imgWidth} / ${imgHeight}` }}
      >
        {/* The map image */}
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />

        {/* SVG overlay in pixel coords of original image via viewBox */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox={`0 0 ${imgWidth} ${imgHeight}`}
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          {/* Route line */}
          <motion.polyline
            points={polyline}
            fill="none"
            stroke="#ffffff"
            strokeWidth={6}
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeDasharray="14 14"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            opacity={0.9}
          />

          {/* Waypoint dots */}
          {waypoints.map((w) => (
            <g key={w.id} transform={`translate(${w.x} ${w.y})`}>
              <circle r={10} fill="#0f172a" opacity={0.5} />
              <circle
                r={7}
                fill="#ffffff"
                stroke="#0f172a"
                strokeWidth={2}
              />
            </g>
          ))}
        </svg>

        {/* Click targets & tooltips are HTML to keep it easy to style/access */}
        {waypoints.map((w) => (
          <button
            key={w.id}
            onMouseEnter={() => setActive(w.id)}
            onFocus={() => setActive(w.id)}
            onClick={() => setActive(w.id)}
            className="absolute -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
            style={{ left: `${(w.x / imgWidth) * 100}%`, top: `${(w.y / imgHeight) * 100}%` }}
            aria-label={w.label}
          />
        ))}

        {/* Floating info card */}
        <div className="absolute left-4 right-4 bottom-4 pointer-events-none">
          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="pointer-events-auto max-w-xl backdrop-blur bg-white/10 text-white border border-white/20 rounded-xl p-4 shadow-lg"
              >
                <div className="text-xs uppercase tracking-widest opacity-80">Etappe</div>
                <div className="text-lg font-semibold">
                  {wpById.get(active)?.label}
                </div>
                {wpById.get(active)?.description && (
                  <div className="text-sm opacity-90 mt-1">
                    {wpById.get(active)?.description}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/**
 * USAGE EXAMPLE
 *
 * <RallyMapOverlay
 *   src="/images/rally-map.jpg"           // jouw kaartafbeelding (zoals het voorbeeld)
 *   imgWidth={1536}                         // de originele pixelbreedte van de afbeelding
 *   imgHeight={2368}                        // de originele pixelhoogte
 *   waypoints={[
 *     { id: "dakhla", label: "Dakhla", x: 330, y: 865, description: "Start." },
 *     { id: "guerguerat", label: "Guerguerat", x: 315, y: 1050 },
 *     { id: "nouakchott", label: "Nouakchott", x: 300, y: 1450 },
 *     { id: "dakar", label: "Dakar", x: 285, y: 1950, description: "Finish." },
 *   ]}
 *   path={["dakhla", "guerguerat", "nouakchott", "dakar"]}
 * />
 */
