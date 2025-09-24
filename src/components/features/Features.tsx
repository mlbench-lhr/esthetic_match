"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function Features() {
  const { t } = useTranslation();

  const leftFeatures = [
    {
      icon: "/images/features/filter.webp",
      title: t("features.features.feature1.title"),
      description: t("features.features.feature1.description"),
      className: "lg:items-start text-center lg:text-left items-center",
    },
    {
      icon: "/images/features/hand.svg",
      title: t("features.features.feature2.title"),
      description: t("features.features.feature2.description"),
      className: "lg:items-start lg:text-left text-center items-center",
    },
  ];

  const rightFeatures = [
    {
      icon: "/images/features/users.webp",
      title: t("features.features.feature3.title"),
      description: t("features.features.feature3.description"),
      className:
        "lg:text-right lg:items-end text-center items-center lg:mt-30 mt-10",
    },
    {
      icon: "/images/features/shield.webp",
      title: t("features.features.feature4.title"),
      description: t("features.features.feature4.description"),
      className: "lg:text-right lg:items-end text-center items-center",
    },
  ];

  return (
    <div className="relative flex lg:flex-row flex-col justify-center lg:items-start items-center w-full max-w-7xl mx-auto ">
      {/* Left side features */}
      <div className="lg:absolute left-0 top-0 lg:space-y-16 space-y-10 w-80 flex flex-col items-center lg:block">
        {leftFeatures.map((feature, index) => (
          <FeatureCard
            key={`left-${index}`}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            className={`${feature.className ?? ""} ${
              index === 1 ? "lg:mt-24" : ""
            }`}
          />
        ))}
      </div>

      {/* Center phone mockup */}
      <div className="relative z-20 hidden lg:block mb-10">
        <Image
          src="/images/features/mobile.webp"
          alt="Aesthetic Match App Interface"
          width={350}
          height={700}
          className="relative z-10"
          priority
        />
      </div>

      {/* Right side features */}
      <div className="lg:absolute right-0 top-0 lg:space-y-16 space-y-10 w-80 flex flex-col items-center lg:block">
        {rightFeatures.map((feature, index) => (
          <FeatureCard
            key={`right-${index}`}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            className={feature.className}
          />
        ))}
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  className = "",
}: {
  icon: string;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col space-x-4 ${className} max-w-[250px]`}>
      <div className="mt-1">
        <div className="w-full h-full bg-opacity-20 rounded flex items-center ">
          <Image src={icon} alt="" width={40} height={40} />
        </div>
      </div>
      <div>
        <h5 className="h5 text-white_primary font-semibold mb-3">{title}</h5>
        <p className="p3 text-white_secondary font-normal leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
