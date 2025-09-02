"use client";
import React from "react";
import { useSidebar } from "@/context/SidebarContext";
import { FaBars } from "react-icons/fa";

const HamburgerMenu: React.FC = () => {
  const { isMobileOpen, toggleMobileSidebar } = useSidebar();

  // Only show hamburger when sidebar is closed
  if (isMobileOpen) return null;

  return (
    <button
      onClick={toggleMobileSidebar}
      className="hidden top-4 left-4 z-50 fixed bg-white hover:bg-gray-50 shadow-md p-2 border border-gray-200 rounded-md transition-colors duration-200 cursor-pointer"
      aria-label="Open menu"
    >
      <FaBars className="w-6 h-6 text-primary" />
    </button>
  );
};

export default HamburgerMenu;
