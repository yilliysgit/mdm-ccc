// components/SocialButtons.tsx
"use client";

import {
  InstagramLogo,
  FacebookLogo,
  YoutubeLogo,
} from "@phosphor-icons/react";

interface SocialButtonsProps {
  className?: string;
  size?: number;   // icon size in pixels (default 20)
  weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
}

export function SocialButtons({
  className = "",
  size = 24,
  weight = "regular",
}: SocialButtonsProps) {
  const socials = [
    {
      name: "Instagram",
      href: "https://instagram.com/marocainsdumonde",
      Icon: InstagramLogo,
    },
    {
      name: "Facebook",
      href: "https://facebook.com/marocainsdumonde",
      Icon: FacebookLogo,
    },
    {
      name: "YouTube",
      href: "https://youtube.com/@marocainsdumonde",
      Icon: YoutubeLogo,
    },
  ] as const;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socials.map(({ name, href, Icon }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 text-stone-700 hover:text-emerald-800 transition-colors rounded-lg hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
          aria-label={name}
          title={name}
        >
          <Icon size={size} weight={weight} aria-hidden="true" />
          <span className="sr-only">{name}</span>
        </a>
      ))}
    </div>
  );
}
