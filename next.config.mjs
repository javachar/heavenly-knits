// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // lo que ya tenías…
  // ejemplo:
  experimental: { optimizeCss: true },
  images: {
    // solo si algún día usas next/image con dominios externos
    remotePatterns: [
      { protocol: 'https', hostname: '**.cdninstagram.com' },
      { protocol: 'https', hostname: 'scontent.cdninstagram.com' },
    ],
  },
};

export default nextConfig;
