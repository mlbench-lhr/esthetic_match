"use client";

import { useTranslation } from "react-i18next";

export default function HeaderSection() {
  const { t } = useTranslation();

  return (
    <div className="text-center mb-8">
      <p className="text-cyan_primary text-xs font-medium tracking-widest uppercase mb-8">
        {t("features.header.smalltitle")}
      </p>

      <h1 className="text-white h3 font-bold leading-tight max-w-6xl mx-auto mb-4">
        {t("features.header.title")}
      </h1>

      <p className="text-white h3 font-light opacity-90 max-w-6xl mx-auto">
        {t("features.header.subtitle")}
      </p>
    </div>
  );
}
