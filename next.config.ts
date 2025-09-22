import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: { domains: ["res.cloudinary.com"] },

  env: {
    NEXT_PUBLIC_PLACES_API_KEY: process.env.PLACES_API_KEY,
  },
};

export default nextConfig;
