import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // Sert directement depuis CDN Vercel sans API d'optimisation
  },
};

export default nextConfig;
