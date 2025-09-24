"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import TreatmentCarousel from "./TreatmentCarousel";
import NavigationButton from "./NavigationButton";

interface Treatment {
  id: number;
  imageSrc: string;
  title: string;
  detail: string;
}

function Services() {
  const { t } = useTranslation();

  // Build treatments array dynamically from translations
  const treatments: Treatment[] = [
    {
      id: 1,
      imageSrc: "/images/services/image1.webp",
      title: t("services.treatments.1.title"),
      detail: t("services.treatments.1.detail"),
    },
    {
      id: 2,
      imageSrc: "/images/services/image2.webp",
      title: t("services.treatments.2.title"),
      detail: t("services.treatments.2.detail"),
    },
    {
      id: 3,
      imageSrc: "/images/services/image3.webp",
      title: t("services.treatments.3.title"),
      detail: t("services.treatments.3.detail"),
    },
    {
      id: 4,
      imageSrc: "/images/services/image4.webp",
      title: t("services.treatments.4.title"),
      detail: t("services.treatments.4.detail"),
    },
    {
      id: 5,
      imageSrc: "/images/services/image5.webp",
      title: t("services.treatments.5.title"),
      detail: t("services.treatments.5.detail"),
    },
    {
      id: 6,
      imageSrc: "/images/services/image6.webp",
      title: t("services.treatments.6.title"),
      detail: t("services.treatments.6.detail"),
    },
    {
      id: 7,
      imageSrc: "/images/services/image7.webp",
      title: t("services.treatments.7.title"),
      detail: t("services.treatments.7.detail"),
    },
    {
      id: 8,
      imageSrc: "/images/services/image8.webp",
      title: t("services.treatments.8.title"),
      detail: t("services.treatments.8.detail"),
    },
  ];

  return (
    <div id="services" className=" bg-gray-50 py-20">
      <div className="max-w-[1480px] mx-auto px-8">
        {/* Header */}
        <div className="mb-16 flex lg:flex-row flex-col justify-between items-center">
          <h1 className="h1 font-light text-black_primary mb-4">
            {t("services.header")}
          </h1>
          <div className="flex gap-2">
            <NavigationButton
              src="/images/services/left_chevron.svg"
              className="custom-prev"
            />
            <NavigationButton
              src="/images/services/right_chevron.svg"
              className="custom-next"
            />
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <TreatmentCarousel treatments={treatments} />
        </div>
      </div>
    </div>
  );
}

export default Services;
