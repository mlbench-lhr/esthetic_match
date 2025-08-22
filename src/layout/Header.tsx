import { useState } from "react";
import Image from "next/image";
import { Bell, ChevronDown } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-[#f5ebdf] border-gray-200 border-b w-full">
      <div className="flex justify-end items-center px-6 py-3">
        {/* Profile Section */}
        <div
          className="relative flex items-center gap-2 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <span className="font-medium text-gray-900">Paul Melone</span>
          <ChevronDown className="w-4 h-4 text-gray-600" />
          <Image
            src="/profile.jpg" // Replace with actual image
            alt="profile"
            width={32}
            height={32}
            className="border border-gray-300 rounded-full"
          />
        </div>

        {/* Notification Icon */}
        <button className="relative ml-6">
          <Bell className="w-5 h-5 text-gray-700" />
          {/* Notification badge (optional) */}
          <span className="-top-1 -right-1 absolute bg-red-500 rounded-full w-2 h-2"></span>
        </button>

        {/* Dropdown Menu */}
        {open && (
          <div className="top-14 right-6 absolute bg-white shadow-lg py-2 rounded-lg w-40">
            <button className="block hover:bg-gray-100 px-4 py-2 w-full text-left">
              Profile
            </button>
            <button className="block hover:bg-gray-100 px-4 py-2 w-full text-left">
              Settings
            </button>
            <button className="block hover:bg-gray-100 px-4 py-2 w-full text-left">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
