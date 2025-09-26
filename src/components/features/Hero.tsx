"use client";

import { useTranslation } from "react-i18next";
import BackgroundElements from "./BackgroundElements";
import Features from "./Features";
import HeaderSection from "./HeaderSection";
import StoreButtons from "./StoreButtons";

export default function Hero() {
  const { t } = useTranslation();
  return (
    <div className="relative w-full">
      <BackgroundElements />

      <div className="relative z-10 flex flex-col items-center justify-start lg:pt-20 pt-10 px-8">
        <HeaderSection />
        <Features />
        <div className="flex flex-row gap-4 lg:mt-0 mt-10">
          <StoreButtons
            href="#"
            icon="/images/features/playstore.webp"
            topText={t("features.buttons.google.topText")}
            bottomText={t("features.buttons.google.bottomText")}
          />
          <StoreButtons
            href="#"
            icon="/images/features/apple.webp"
            topText={t("features.buttons.apple.topText")}
            bottomText={t("features.buttons.apple.bottomText")}
          />
        </div>
      </div>
    </div>
  )
}