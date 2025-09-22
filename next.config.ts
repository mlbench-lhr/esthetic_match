import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr"],
  },
  images: { domains: ["res.cloudinary.com"] },

  env: {
    NEXT_PUBLIC_PLACES_API_KEY: process.env.PLACES_API_KEY,
  },
};

export default nextConfig;
