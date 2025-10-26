'use client';

import { useTranslations } from 'next-intl';
import { NavLink } from "./NavLink";

export function Navigation() {
  const t = useTranslations('Navigation');  // ← PascalCase!
  
  const navigationItems = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/events', label: t('events') },
    { href: '/partners', label: t('partners') },
    { href: '/gallery', label: t('gallery') },
    { href: '/stories', label: t('stories') },
    { href: '/news', label: t('news') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <nav className="hidden lg:block">
      <ul className="flex items-center gap-8 text-sm font-semibold text-stone-800">
        {navigationItems.map((item) => (
          <li key={item.href}>
            <NavLink href={item.href}>{item.label}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}