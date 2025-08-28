"use client";
import Image from "next/image";

import CountryMap from "./CountryMap";
import { useState } from "react";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import { EllipsisVertical } from "lucide-react";

export default function DemographicCard() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div className="bg-white dark:bg-white/[0.03] p-5 sm:p-6 border border-gray-200 dark:border-gray-800 rounded-2xl">
      <div className="flex justify-between">
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-white/90 text-lg">
            Customers Demographic
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Number of customer based on country
          </p>
        </div>

        <div className="inline-block relative">
          <button onClick={toggleDropdown} className="dropdown-toggle">
            {/* <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" /> */}
            <EllipsisVertical />
          </button>
          <Dropdown
            isOpen={isOpen}
            onClose={closeDropdown}
            className="p-2 w-40"
          >
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg w-full font-normal text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 dark:text-gray-400 text-left"
            >
              View More
            </DropdownItem>
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg w-full font-normal text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 dark:text-gray-400 text-left"
            >
              Delete
            </DropdownItem>
          </Dropdown>
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-900 my-6 px-4 sm:px-6 py-6 border border-gary-200 dark:border-gray-800 rounded-2xl overflow-hidden">
        <div
          id="mapOne"
          className="-mx-4 sm:-mx-6 -my-6 w-[252px] 2xsm:w-[307px] xsm:w-[358px] md:w-[668px] lg:w-[634px] 2xl:w-[554px] xl:w-[393px] h-[212px] mapOne map-btn"
        >
          <CountryMap />
        </div>
      </div>

      <div className="space-y-5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="items-center rounded-full w-full max-w-8">
              <Image
                width={48}
                height={48}
                src="/images/country/country-01.svg"
                alt="usa"
                className="w-full"
              />
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">
                USA
              </p>
              <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                2,379 Customers
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full max-w-[140px]">
            <div className="block relative bg-gray-200 dark:bg-gray-800 rounded-sm w-full max-w-[100px] h-2">
              <div className="top-0 left-0 absolute flex justify-center items-center bg-brand-500 rounded-sm w-[79%] h-full font-medium text-white text-xs"></div>
            </div>
            <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
              79%
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="items-center rounded-full w-full max-w-8">
              <Image
                width={48}
                height={48}
                className="w-full"
                src="/images/country/country-02.svg"
                alt="france"
              />
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">
                France
              </p>
              <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                589 Customers
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full max-w-[140px]">
            <div className="block relative bg-gray-200 dark:bg-gray-800 rounded-sm w-full max-w-[100px] h-2">
              <div className="top-0 left-0 absolute flex justify-center items-center bg-brand-500 rounded-sm w-[23%] h-full font-medium text-white text-xs"></div>
            </div>
            <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
              23%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
