import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['nl', 'fr', 'en'],
  defaultLocale: 'nl'
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);