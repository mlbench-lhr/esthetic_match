"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";

interface TreatmentCardProps {
  imageSrc: string;
  title: string;
  detail: string;
}

const TreatmentCard: React.FC<TreatmentCardProps> = ({
  imageSrc,
  title,
  detail,
}) => {
  const { t } = useTranslation();
  return (
    <div className="relative lg:w-[300px] lg:h-[420px] w-[280px] h-[300px] rounded-2xl overflow-hidden group cursor-pointer">
      <Image src={imageSrc} alt={title} fill className="object-cover" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 transition-opacity " />
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 text-white group overflow-hidden">
        {/* Top label */}
        <div className="flex flex-col justify-start">
          <span className="p4 font-bold uppercase"> {t("services.words.treatments")}</span>
          <div className="space-y-4">
            <div className="text-30 font-normal">
              <p className="leading-tight">{title}</p>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="relative h-[80px] ">
          {/* Content that slides up on hover - includes both Details label and detail text */}
          <div
            className="
        absolute left-0 right-0 bottom-0 text-center
        translate-y-0 transition-all duration-500
        group-hover:-translate-y-6
        px-2 space-y-2
      "
          >
            {/* <p className="text-14 font-semibold uppercase tracking-widest">
              {t("services.words.details")}
            </p> */}
            <div className="text-16 hidden group-hover:block transition-opacity duration-500">
              {detail}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentCard;
