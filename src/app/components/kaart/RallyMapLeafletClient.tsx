// src/app/components/kaart/RallyMapLeafletClient.tsx
"use client";

import dynamic from "next/dynamic";

const Inner = dynamic(() => import("./RallyMapLeaflet"), {
  ssr: false,
  loading: () => (
    <div className="h-[560px] rounded-2xl bg-slate-100 animate-pulse" />
  ),
});

export default function RallyMapLeafletClient() {
  return <Inner />;
}
