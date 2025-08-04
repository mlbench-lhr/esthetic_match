"use client";
import React, { useEffect, useState } from "react";
import DownloadButton from "../hero/DownloadButton";

interface NavigationItem {
  name: string;
  id: string;
  current: boolean;
}

const initialNavigation: NavigationItem[] = [
  { name: "HOME", id: "home", current: false },
  { name: "ABOUT", id: "about", current: false },
  { name: "SERVICES", id: "services", current: false },
  { name: "FAQS", id: "faqs", current: false },
];
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Data = () => {
  const [navigation, setNavigation] =
    useState<NavigationItem[]>(initialNavigation);
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleScroll = () => {
    const scrollY = window.scrollY;

    const updatedNav = initialNavigation.map((item) => {
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
    handleScroll(); // run once on mount
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
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
                  "px-2 py-1 text-lg font-normal text-[#A5AEA8] block"
                )}
                aria-current={item.current ? "page" : undefined}
              >
                {item.name}
              </span>
            ))}
            <div className="mt-4"></div>
            <DownloadButton text="Download App" className="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data;
