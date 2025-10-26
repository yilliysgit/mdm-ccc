// components/SimpleCTA.tsx
"use client";

import { Link } from '@/i18n/routing'
import { ArrowRight } from "@phosphor-icons/react";

type Props = {
  href: string;
  children: React.ReactNode;
  /** "primary" (groen) of "secondary" (outline) */
  variant?: "primary" | "secondary";
  className?: string;
  external?: boolean; // opent in nieuw venster
};

export default function SimpleCTA({
  href,
  children,
  variant = "primary",
  className = "",
  external,
}: Props) {
  const base =
    "inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2";
  const styles =
    variant === "primary"
      ? "bg-emerald-800 text-white hover:bg-emerald-900"
      : "border border-emerald-800 text-emerald-900 hover:bg-emerald-50";

  return (
    <Link
      href={href}
      className={`${base} ${styles} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span>{children}</span>
      <ArrowRight size={18} aria-hidden="true" />
    </Link>
  );
}
