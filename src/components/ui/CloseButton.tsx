"use client";
import React from "react";
import { useSidebar } from "@/context/SidebarContext";
import { FaTimes } from "react-icons/fa";

const CloseButton: React.FC = () => {
  const { isMobileOpen, toggleMobileSidebar } = useSidebar();

  // Only show close button when sidebar is open on mobile
  if (!isMobileOpen) return null;

  return (
    <button
      onClick={toggleMobileSidebar}
      className="lg:hidden top-4 right-4 absolute hover:bg-gray-100 p-2 rounded-md transition-colors duration-200 cursor-pointer"
      aria-label="Close menu"
    >
      <FaTimes className="w-6 h-6 text-primary" />
    </button>
  );
};

export default CloseButton;
