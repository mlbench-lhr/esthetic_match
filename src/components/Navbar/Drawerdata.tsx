"use client";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import DownloadButton from "../hero/DownloadButton";
import LanguageSwitcher from "./LanguageSwitcher";

interface NavigationItem {
  name: string;
  id: string;
  current: boolean;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Data = () => {
  const { t } = useTranslation();
  const [navigation, setNavigation] = useState<NavigationItem[]>([]);

  // Get navigation items from translation
  const getNavigationItems = (): NavigationItem[] => {
    const links = t('navbar.links', { returnObjects: true }) as Array<{ name: string; id: string }>;
    return links.map(link => ({
      name: link.name,
      id: link.id,
      current: false
    }));
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const currentNavigation = getNavigationItems();

    const updatedNav = currentNavigation.map((item) => {
      const section = document.getElementById(item.id);
      if (section) {
        const offsetTop = section.offsetTop;
        const offsetHeight = section.offsetHeight;
        const buffer = 150;

        const inView =
          scrollY >= offsetTop - buffer &&
          scrollY < offsetTop + offsetHeight - buffer;

        return { ...item, current: inView };
      }
      return item;
    });

    setNavigation(updatedNav);
  };

  useEffect(() => {
    // Initialize navigation with translated items
    setNavigation(getNavigationItems());
    
    handleScroll(); // run once on mount
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [t]); // Re-run when translation changes
  
  return (
    <div className="rounded-md max-w-sm w-full mx-auto">
      <div className="flex-1 space-y-4 py-1">
        <div className="sm:block">
          <div className="space-y-1 px-5 pt-2 pb-3">
            {navigation.map((item) => (
              <span
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className={classNames(
                  item.current
                    ? "text-black hover:opacity-100"
                    : "hover:text-black hover:opacity-100",
                  "px-2 py-1 text-lg font-normal text-[#A5AEA8] block cursor-pointer"
                )}
                aria-current={item.current ? "page" : undefined}
              >
                {item.name}
              </span>
            ))}
            
            {/* Language Switcher */}
            <div className="px-2 py-3">
              <LanguageSwitcher />
            </div>
            
            <div className="mt-4"></div>
            <DownloadButton 
              text={t('navbar.downloadButton')} 
              className="py-4 rounded-full" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data;