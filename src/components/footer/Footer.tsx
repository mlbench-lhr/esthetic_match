"use client";

import React from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="text-white max-w-7xl mx-auto">
      <div className="container mx-auto py-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* App Section */}
          <div>
            <h3 className="h3 font-light">{t("footer.app.title")}</h3>
            <h4 className="h3 font-light mb-8">{t("footer.app.learn")}</h4>
            <div className="space-y-4 flex flex-col">
              <span
                onClick={() => scrollToSection("faqs")}
                className="p2 cursor-pointer"
              >
                {t("footer.app.links.faqs")}
              </span>
              <span
                onClick={() => scrollToSection("about")}
                className="p2 cursor-pointer"
              >
                {t("footer.app.links.about")}
              </span>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="h2 font-light mb-8">{t("footer.contact.title")}</h3>
            <div className="space-y-4">
              <p className="p2">{t("footer.contact.email")}</p>
              <p className="p2">{t("footer.contact.location")}</p>
            </div>
            {/* Social Media Icons */}
            <div className="flex lg:justify-start gap-6 mt-2 -ml-2">
              {[
                { name: "instagram", url: " https://www.instagram.com/estheticmatch?" },
                // { name: "twitter", url: "https://twitter.com/yourprofile" },
                // { name: "facebook", url: "https://facebook.com/yourprofile" },
                // { name: "youtube", url: "https://youtube.com/yourchannel" },
                // { name: "tiktok", url: "https://www.tiktok.com/@yourprofile" },
              ].map((platform) => (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 hover:opacity-70 transition-opacity"
                  aria-label={platform.name}
                >
                  <Image
                    src={`/images/footer/${platform.name}.webp`}
                    alt={platform.name}
                    width={32}
                    height={32}
                    className="w-full h-full"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Logo Section */}
          <div className="flex justify-start lg:justify-end">
            <div className="text-right">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/footer/logo.svg"
                  alt={t("footer.logo.alt")}
                  width={50}
                  height={50}
                />
                <span className="h5 font-extrabold">
                  <h5>
                    {t("footer.logo.text")}
                  </h5>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-16 mb-8  max-w-screen-xl mx-auto grid lg:grid-cols-3 items-center">
          {/* Left placeholder */}
          <div></div>

          {/* Social Media Icons
          <div className="flex lg:justify-center gap-6">
            {[
              { name: "instagram", url: " https://www.instagram.com/estheticmatch?" },
              // { name: "twitter", url: "https://twitter.com/yourprofile" },
              // { name: "facebook", url: "https://facebook.com/yourprofile" },
              // { name: "youtube", url: "https://youtube.com/yourchannel" },
              // { name: "tiktok", url: "https://www.tiktok.com/@yourprofile" },
            ].map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 hover:opacity-70 transition-opacity"
                aria-label={platform.name}
              >
                <Image
                  src={`/images/footer/${platform.name}.webp`}
                  alt={platform.name}
                  width={32}
                  height={32}
                  className="w-full h-full"
                />
              </a>
            ))}
          </div> */}


          {/* Copyright */}
          <div className="lg:text-center lg:mt-0 mt-5">
            <p className="text-sm whitespace-nowrap">
              {t("footer.copyright")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
