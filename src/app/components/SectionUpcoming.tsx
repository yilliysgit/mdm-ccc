// components/SectionUpcoming.tsx
"use client";
import { Link } from '@/i18n/routing'
import { CalendarBlank, MapPin } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import SimpleCTA from "./layout/header/actions/Ctabutton";

type EventItem = {
  slug: string;
  title: string;
  start: string; // ISO
  end: string;   // ISO
  location: string;
  image: string;
  excerpt: string;
};

const EVENTS: EventItem[] = [
  {
    slug: "mille-maroc-2025",
    title: "Mille Maroc Classic Rally",
    start: "2025-10-11",
    end:   "2025-10-17",
    location: "Agadir → Marrakech",
    image: "/images/events/2025.jpg",
    excerpt: "Van kust naar woestijn en de Atlas — comfort, gastronomie en vriendschap.",
  },
  {
    slug: "experience-eu-2025",
    title: "European Experience",
    start: "2025-06-15",
    end:   "2025-06-20",
    location: "Alpen → Côte d’Azur",
    image: "/images/events/eu.jpg",
    excerpt: "Kastelenroutes en bergpassen als opwarmer richting Marokko.",
  },
];

export default function SectionUpcoming() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-14">
        <div className="mb-8">
          <p className="text-xs tracking-widest uppercase text-emerald-800">Events</p>
          <h2 className="text-2xl md:text-3xl font-serif text-emerald-900">Volgende bijeenkomsten</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {EVENTS.map((e) => (
            <EventCard key={e.slug} item={e} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EventCard({ item }: { item: EventItem }) {
  const [now, setNow] = useState<Date>(new Date());
  useEffect(() => { const id = setInterval(() => setNow(new Date()), 1000); return () => clearInterval(id); }, []);
  const start = new Date(item.start);
  const end = new Date(item.end);
  const secs = Math.max(0, Math.floor((+start - +now) / 1000));
  const d = Math.floor(secs / 86400), h = Math.floor((secs % 86400)/3600), m = Math.floor((secs % 3600)/60), s = secs % 60;

  return (
    <article className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
      <div className="grid md:grid-cols-[1.1fr_1fr]">
        <img src={item.image} alt="" className="h-56 md:h-full w-full object-cover" />
        <div className="p-5 space-y-4">
          <header>
            <h3 className="text-xl font-semibold text-emerald-900">{item.title}</h3>
            <p className="mt-1 text-sm text-neutral-600 flex items-center gap-2">
              <CalendarBlank size={16} />
              {start.toLocaleDateString()} – {end.toLocaleDateString()} •
              <MapPin size={16} /> {item.location}
            </p>
          </header>
          <p className="text-sm text-neutral-700">{item.excerpt}</p>
          <div className="flex items-center gap-5 font-mono text-sm">
            <span>{d}d</span><span>{h}u</span><span>{m}m</span><span>{s.toString().padStart(2,"0")}s</span>
          </div>
          <div className="flex gap-3">
            <SimpleCTA href={`/events/${item.slug}`}>Programma & details</SimpleCTA>
            <SimpleCTA href={`/events/${item.slug}#inschrijven`} variant="secondary">Inschrijven</SimpleCTA>
          </div>
        </div>
      </div>
    </article>
  );
}
