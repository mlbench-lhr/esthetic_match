"use client";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  const handleClick = () => {
    toggleDropdown();
    setNotifying(false);
  };
  return (
    <div className="relative">
      <button
        className="relative flex justify-center items-center bg-[#F4E9DC] hover:bg-[#F4E9DC] border border-gray-200 dark:border-gray-800 rounded-full w-11 h-11 text-gray-500 hover:text-gray-700 dark:hover:text-white dark:text-gray-400 transition-colors dropdown-toggle"
        onClick={handleClick}
      >
        <span
          className={`absolute right-0 top-0.5 z-10 h-2 w-2 rounded-full bg-orange-400 ${
            !notifying ? "hidden" : "flex"
          }`}
        >
          <span className="inline-flex absolute bg-orange-400 opacity-75 rounded-full w-full h-full animate-ping"></span>
        </span>
        <Image
          width={25}
          height={25}
          className=""
          src="/images/admin/header/notification.svg"
          alt="Logo"
        />
      </button>
      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="-right-[240px] lg:right-0 absolute flex flex-col bg-white dark:bg-gray-dark shadow-theme-lg mt-[17px] p-3 border border-gray-200 dark:border-gray-800 rounded-2xl w-[350px] sm:w-[361px] h-[480px]"
      >
        <div className="flex justify-between items-center mb-3 pb-3 border-gray-100 dark:border-gray-700 border-b">
          <h5 className="font-semibold text-gray-800 dark:text-gray-200 text-lg">
            Notification
          </h5>
          <button
            onClick={toggleDropdown}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 dark:text-gray-400 transition dropdown-toggle"
          >
            <svg
              className="fill-current"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
        <ul className="flex flex-col h-auto overflow-y-auto custom-scrollbar">
          {/* Example notification items */}
          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex gap-3 hover:bg-gray-100 dark:hover:bg-white/5 p-3 px-4.5 py-3 border-gray-100 dark:border-gray-800 border-b rounded-lg"
            >
              <span className="block z-1 relative rounded-full w-full max-w-10 h-10">
                <Image
                  width={40}
                  height={40}
                  src="/images/admin/header/user-02.jpg"
                  alt="User"
                  className="rounded-full w-full overflow-hidden"
                />
                <span className="right-0 bottom-0 z-10 absolute bg-success-500 border-[1.5px] border-white dark:border-gray-900 rounded-full w-full max-w-2.5 h-2.5"></span>
              </span>

              <span className="block">
                <span className="block space-x-1 mb-1.5 text-gray-500 text-theme-sm dark:text-gray-400">
                  <span className="font-medium text-gray-800 dark:text-white/90">
                    Terry Franci
                  </span>
                  <span>requests permission to change</span>
                  <span className="font-medium text-gray-800 dark:text-white/90">
                    Project - Nganter App
                  </span>
                </span>

                <span className="flex items-center gap-2 text-gray-500 text-theme-xs dark:text-gray-400">
                  <span>Project</span>
                  <span className="bg-gray-400 rounded-full w-1 h-1"></span>
                  <span>5 min ago</span>
                </span>
              </span>
            </DropdownItem>
          </li>

          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex gap-3 hover:bg-gray-100 dark:hover:bg-white/5 p-3 px-4.5 py-3 border-gray-100 dark:border-gray-800 border-b rounded-lg"
            >
              <span className="block z-1 relative rounded-full w-full max-w-10 h-10">
                <Image
                  width={40}
                  height={40}
                  src="/images/admin/header/user-03.jpg"
                  alt="User"
                  className="rounded-full w-full overflow-hidden"
                />
                <span className="right-0 bottom-0 z-10 absolute bg-success-500 border-[1.5px] border-white dark:border-gray-900 rounded-full w-full max-w-2.5 h-2.5"></span>
              </span>

              <span className="block">
                <span className="block space-x-1 mb-1.5 text-gray-500 text-theme-sm dark:text-gray-400">
                  <span className="font-medium text-gray-800 dark:text-white/90">
                    Alena Franci
                  </span>
                  <span> requests permission to change</span>
                  <span className="font-medium text-gray-800 dark:text-white/90">
                    Project - Nganter App
                  </span>
                </span>

                <span className="flex items-center gap-2 text-gray-500 text-theme-xs dark:text-gray-400">
                  <span>Project</span>
                  <span className="bg-gray-400 rounded-full w-1 h-1"></span>
                  <span>8 min ago</span>
                </span>
              </span>
            </DropdownItem>
          </li>

          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex gap-3 hover:bg-gray-100 dark:hover:bg-white/5 p-3 px-4.5 py-3 border-gray-100 dark:border-gray-800 border-b rounded-lg"
              href="#"
            >
              <span className="block z-1 relative rounded-full w-full max-w-10 h-10">
                <Image
                  width={40}
                  height={40}
                  src="/images/admin/header/user-04.jpg"
                  alt="User"
                  className="rounded-full w-full overflow-hidden"
                />
                <span className="right-0 bottom-0 z-10 absolute bg-success-500 border-[1.5px] border-white dark:border-gray-900 rounded-full w-full max-w-2.5 h-2.5"></span>
              </span>

              <span className="block">
                <span className="block space-x-1 mb-1.5 text-gray-500 text-theme-sm dark:text-gray-400">
                  <span className="font-medium text-gray-800 dark:text-white/90">
                    Jocelyn Kenter
                  </span>
                  <span>requests permission to change</span>
                  <span className="font-medium text-gray-800 dark:text-white/90">
                    Project - Nganter App
                  </span>
                </span>

                <span className="flex items-center gap-2 text-gray-500 text-theme-xs dark:text-gray-400">
                  <span>Project</span>
                  <span className="bg-gray-400 rounded-full w-1 h-1"></span>
                  <span>15 min ago</span>
                </span>
              </span>
            </DropdownItem>
          </li>

          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex gap-3 hover:bg-gray-100 dark:hover:bg-white/5 p-3 px-4.5 py-3 border-gray-100 dark:border-gray-800 border-b rounded-lg"
              href="#"
            >
              <span className="block z-1 relative rounded-full w-full max-w-10 h-10">
                <Image
                  width={40}
                  height={40}
                  src="/images/admin/header/user-05.jpg"
                  alt="User"
                  className="rounded-full w-full overflow-hidden"
                />
                <span className="right-0 bottom-0 z-10 absolute bg-error-500 border-[1.5px] border-white dark:border-gray-900 rounded-full w-full max-w-2.5 h-2.5"></span>
              </span>

              <span className="block">
                <span className="block space-x-1 mb-1.5 text-gray-500 text-theme-sm dark:text-gray-400">
                  <span className="font-medium text-gray-800 dark:text-white/90">
                    Brandon Philips
                  </span>
                  <span> requests permission to change</span>
                  <span className="font-medium text-gray-800 dark:text-white/90">
                    Project - Nganter App
                  </span>
                </span>

                <span className="flex items-center gap-2 text-gray-500 text-theme-xs dark:text-gray-400">
                  <span>Project</span>
                  <span className="bg-gray-400 rounded-full w-1 h-1"></span>
                  <span>1 hr ago</span>
                </span>
              </span>
            </DropdownItem>
          </li>

          <li>
            <DropdownItem
              className="flex gap-3 hover:bg-gray-100 dark:hover:bg-white/5 p-3 px-4.5 py-3 border-gray-100 dark:border-gray-800 border-b rounded-lg"
              onItemClick={closeDropdown}
            >
              <span className="block z-1 relative rounded-full w-full max-w-10 h-10">
                <Image
                  width={40}
                  height={40}
                  src="/images/admin/header/user-02.jpg"
                  alt="User"
                  className="rounded-full w-full overflow-hidden"
                />
                <span className="right-0 bottom-0 z-10 absolute bg-success-500 border-[1.5px] border-white dark:border-gray-900 rounded-full w-full max-w-2.5 h-2.5"></span>
              </span>

              <span className="block">
                <span className="block space-x-1 mb-1.5 text-gray-500 text-theme-sm dark:text-gray-400">
                  <span className="font-medium text-gray-800 dark:text-white/90">
                    Terry Franci
                  </span>
                  <span>requests permission to change</span>
                  <span className="font-medium text-gray-800 dark:text-white/90">
                    Project - Nganter App
                  </span>
                </span>

                <span className="flex items-center gap-2 text-gray-500 text-theme-xs dark:text-gray-400">
                  <span>Project</span>
                  <span className="bg-gray-400 rounded-full w-1 h-1"></span>
                  <span>5 min ago</span>
                </span>
              </span>
            </DropdownItem>
          </li>

          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex gap-3 hover:bg-gray-100 dark:hover:bg-white/5 p-3 px-4.5 py-3 border-gray-100 dark:border-gray-800 border-b rounded-lg"
            >
              <span className="block z-1 relative rounded-full w-full max-w-10 h-10">
                <Image
                  width={40}
                  height={40}
                  src="/images/admin/header/user-03.jpg"
                  alt="User"
                  className="rounded-full w-full overflow-hidden"
                />
                <span className="right-0 bottom-0 z-10 absolute bg-success-500 border-[1.5px] border-white dark:border-gray-900 rounded-full w-full max-w-2.5 h-2.5"></span>
              </span>

              <span className="block">
                <span className="block space-x-1 mb-1.5 text-gray-500 text-theme-sm dark:text-gray-400">
                  <span className="font-medium text-gray-800 dark:text-white/90">
                    Alena Franci
                  </span>
                  <span>requests permission to change</span>
                  <span className="font-medium text-gray-800 dark:text-white/90">
                    Project - Nganter App
                  </span>
                </span>

                <span className="flex items-center gap-2 text-gray-500 text-theme-xs dark:text-gray-400">
                  <span>Project</span>
                  <span className="bg-gray-400 rounded-full w-1 h-1"></span>
                  <span>8 min ago</span>
                </span>
              </span>
            </DropdownItem>
          </li>

          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex gap-3 hover:bg-gray-100 dark:hover:bg-white/5 p-3 px-4.5 py-3 border-gray-100 dark:border-gray-800 border-b rounded-lg"
            >
              <span className="block z-1 relative rounded-full w-full max-w-10 h-10">
                <Image
                  width={40}
                  height={40}
                  src="/images/admin/header/user-04.jpg"
                  alt="User"
                  className="rounded-full w-full overflow-hidden"
                />
                <span className="right-0 bottom-0 z-10 absolute bg-success-500 border-[1.5px] border-white dark:border-gray-900 rounded-full w-full max-w-2.5 h-2.5"></span>
              </span>

              <span className="block">
                <span className="block space-x-1 mb-1.5 text-gray-500 text-theme-sm dark:text-gray-400">
                  <span className="font-medium text-gray-800 dark:text-white/90">
                    Jocelyn Kenter
                  </span>
                  <span>requests permission to change</span>
                  <span className="font-medium text-gray-800 dark:text-white/90">
                    Project - Nganter App
                  </span>
                </span>

                <span className="flex items-center gap-2 text-gray-500 text-theme-xs dark:text-gray-400">
                  <span>Project</span>
                  <span className="bg-gray-400 rounded-full w-1 h-1"></span>
                  <span>15 min ago</span>
                </span>
              </span>
            </DropdownItem>
          </li>

          <li>
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex gap-3 hover:bg-gray-100 dark:hover:bg-white/5 p-3 px-4.5 py-3 border-gray-100 dark:border-gray-800 border-b rounded-lg"
              href="#"
            >
              <span className="block z-1 relative rounded-full w-full max-w-10 h-10">
                <Image
                  width={40}
                  height={40}
                  src="/images/admin/header/user-05.jpg"
                  alt="User"
                  className="rounded-full overflow-hidden"
                />
                <span className="right-0 bottom-0 z-10 absolute bg-error-500 border-[1.5px] border-white dark:border-gray-900 rounded-full w-full max-w-2.5 h-2.5"></span>
              </span>

              <span className="block">
                <span className="block space-x-1 mb-1.5 text-gray-500 text-theme-sm dark:text-gray-400">
                  <span className="font-medium text-gray-800 dark:text-white/90">
                    Brandon Philips
                  </span>
                  <span>requests permission to change</span>
                  <span className="font-medium text-gray-800 dark:text-white/90">
                    Project - Nganter App
                  </span>
                </span>

                <span className="flex items-center gap-2 text-gray-500 text-theme-xs dark:text-gray-400">
                  <span>Project</span>
                  <span className="bg-gray-400 rounded-full w-1 h-1"></span>
                  <span>1 hr ago</span>
                </span>
              </span>
            </DropdownItem>
          </li>
          {/* Add more items as needed */}
        </ul>
        <Link
          href="/"
          className="block bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 mt-3 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg font-medium text-gray-700 dark:text-gray-400 text-sm text-center"
        >
          View All Notifications
        </Link>
      </Dropdown>
    </div>
  );
}
