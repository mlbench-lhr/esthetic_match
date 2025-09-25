"use client";

import { useTranslation } from "react-i18next";

export default function HeaderSection() {
  const { t } = useTranslation();

  return (
    <div className="text-center mb-8">
      <p className="text-cyan_primary text-xs font-medium tracking-widest uppercase mb-8">
        {t("features.header.smalltitle")}
      </p>

      <h4 className="text-white h4 font-bold leading-tight max-w-6xl mx-auto mb-4">
        {t("features.header.title")}
      </h4>

      <h4 className="text-white h4 font-normal opacity-90 max-w-6xl mx-auto">
        {t("features.header.subtitle")}
      </h4>
    </div>
  );
}
