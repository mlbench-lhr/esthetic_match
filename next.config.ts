import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  i18n: {
    defaultLocale: "en",
    locales: ["en", "fr"],
  },
  images: { domains: ["res.cloudinary.com"] },
};

export default nextConfig;
