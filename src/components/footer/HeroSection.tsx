"use client";

import React from "react";
import Image from "next/image";
import StoreButtons from "../features/StoreButtons";
import { useTranslation } from "react-i18next";

const HeroSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="relative">
      <div className="relative z-10 container py-20 px-6 max-w-[1230px] mx-auto">
        <div className="lg:h-full ">
          {/* Hero Image Container */}
          <div className="relative rounded-3xl overflow-hidden mb-8 shadow-2xl h-[400px] lg:h-full">
            <Image
              src="/images/footer/pic.webp"
              alt={t("footer.altText", { defaultValue: "Skincare consultation" })}
              width={800}
              height={600}
              className="w-full h-full object-cover"
            />

            {/* Overlay Content */}
            <div className="absolute inset-0 bg-opacity-20 flex flex-col justify-end items-start lg:p-8 p-4">
              <h1 className="text-white h1 font-bold mb-4">
                {t("footer.title")}
              </h1>

              <div className="flex lg:flex-row flex-col justify-between w-full">
                <p className="text-white tp2 max-w-lg font-normal">
                  {t("footer.subtitle")}
                </p>

                <div className="flex flex-row gap-4">
                  <StoreButtons
                    href="#"
                    icon="/images/features/playstore.webp"
                    topText={t("footer.buttons.google.topText")}
                    bottomText={t("footer.buttons.google.bottomText")}
                  />
                  <StoreButtons
                    href="#"
                    icon="/images/features/apple.webp"
                    topText={t("footer.buttons.apple.topText")}
                    bottomText={t("footer.buttons.apple.bottomText")}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
