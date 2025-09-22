'use client'
import { useTranslation } from "react-i18next";
import DownloadButton from "../hero/DownloadButton";
import Image from "next/image";

function Left() {
  const { t } = useTranslation();

  return (
    <div className="max-w-[530px]">
      <div>
        <div className="h1 text-black-secondary">
          <h1 className="font-bold">{t("about.title")}</h1>
          <p className="font-light">{t("about.subtitle")}</p>
        </div>
        <p className="p2 text-black_tertiary mb-5">{t("about.description")}</p>
        <DownloadButton text={t("about.download_button")} className="py-4 rounded-xl" />
      </div>

      <div className="flex flex-col mt-10 gap-5">
        <div>
          <Image src="/images/need/patient.webp" width={30} height={30} alt="Patient" />
          <h3 className="h3 text-black_secondary">{t("about.patient.title")}</h3>
          <p>{t("about.patient.line1")}</p>
          <p>{t("about.patient.line2")}</p>
        </div>

        <div>
          <Image src="/images/need/practitioner.webp" width={30} height={30} alt="Practitioner" />
          <h3 className="h3 text-black_secondary">{t("about.practitioner.title")}</h3>
          <p>{t("about.practitioner.line1")}</p>
          <p>{t("about.practitioner.line2")}</p>
        </div>
      </div>
    </div>
  );
}

export default Left;
