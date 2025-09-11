"use client";

import { useSidebar } from "@/context/SidebarContext";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import HamburgerMenu from "@/components/ui/HamburgerMenu";
import { usePathname } from "next/navigation";
import React from "react";
import Header from "@/components/admin/Header";
import { SWRConfig } from "swr";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const pathname = usePathname();

  const hideSidebarRoutes = [
    "/annotations/cell-segmentation",
    "/annotations/cell-segmentation/",
  ];

  const hideSidebarPrefixes = ["/annotations/cell-segmentation/"];

  const shouldHideSidebar =
    hideSidebarRoutes.includes(pathname) ||
    hideSidebarPrefixes.some((prefix) => pathname.startsWith(prefix));

  const sidebarMargin = shouldHideSidebar
    ? "ml-0"
    : isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  return (
    <div className="flex min-h-screen">
      {!shouldHideSidebar && (
        <>
          <HamburgerMenu />
          <AppSidebar />
          <Backdrop />
        </>
      )}

      <main
        className={`flex-1 transition-all duration-300 ease-in-out ${sidebarMargin} ${
          shouldHideSidebar ? "pt-0" : "pt-0 lg:pt-0"
        } bg-primary`}
      >
        <SWRConfig value={{ fetcher: (u) => fetch(u).then((r) => r.json()) }}>
          <div className="flex justify-center min-h-screen">
            <div className="px-4 sm:px-6 w-screen md:w-full">
              <Header />
              {children}
            </div>
          </div>
        </SWRConfig>
      </main>
    </div>
  );
}
