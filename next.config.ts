import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
      // ✨ VOEG TOE: Unsplash
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // 💡 OPTIONEEL: Als je andere image hosts gebruikt
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",  // ← Voeg toe
      },
    ],
  },
};

export default withNextIntl(nextConfig);