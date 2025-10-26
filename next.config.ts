// next.config.ts
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // 🔧 FORCEER WEBPACK (niet Turbopack)
  // Dit lost Sanity build problemen op
  
  transpilePackages: ['sanity'],
  
  webpack: (config, { isServer }) => {
    // Sanity fixes
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }
    
    // Verhoog memory limit voor grote bundles
    config.optimization = {
      ...config.optimization,
      moduleIds: 'deterministic',
    };
    
    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
    ],
  },
};

export default withNextIntl(nextConfig);