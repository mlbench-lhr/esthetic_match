"use client";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import Image from "next/image";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import ChangePasswordModal from "@/components/auth/account/ChangePasswordModal";
import EditProfileModal from "@/components/auth/account/EditProfileModal";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const { user, logout, updateUser } = useAuth();
  const router = useRouter();

  const displayName =
    user?.name || (user?.email ? user.email.split("@")[0] : "User");
  const displayEmail = user?.email || "";

  function toggleDropdown(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  }

  function closeDropdown() {
    setIsOpen(false);
  }
  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-[color:var(--primary_black)]"
      >
        <span className="mr-3 rounded-full w-11 h-11 overflow-hidden">
          <Image
            width={44}
            height={44}
            src={user?.image || "/images/admin/header/owner.jpg"}
            alt="User"
            className="w-11 h-11 object-cover"
          />
        </span>

        <span className="block mr-1 max-w-[140px] font-medium text-theme-sm truncate">
          {displayName}
        </span>

        <svg
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
            stroke="currentColor"
            className="stroke-[color:var(--secondary_black)]"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="right-0 absolute flex flex-col bg-[color:var(--tertiary_skin)] shadow-theme-lg mt-[17px] p-3 border border-[color:var(--border_muted)] rounded-2xl w-[260px]"
      >
        <div>
          <span className="block font-medium text-[color:var(--primary_black)] text-theme-sm truncate">
            {displayName}
          </span>
          {displayEmail && (
            <span className="block mt-0.5 text-[color:var(--secondary_black)]/80 text-theme-xs truncate">
              {displayEmail}
            </span>
          )}
        </div>

        <ul className="flex flex-col gap-1 pt-4 pb-3 border-[color:var(--border_muted)] border-b">
          <li>
            <DropdownItem
              onItemClick={() => {
                setIsOpen(false);
                setShowEditProfile(true);
              }}
              tag="button"
              className="group flex items-center gap-3 hover:bg-[color:var(--primary_skin)] px-3 py-2 rounded-lg font-medium text-[color:var(--primary_black)] text-theme-sm"
            >
              <svg
                className="fill-[color:var(--secondary_black)] group-hover:fill-[color:var(--primary_black)]"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 14.1526 4.3002 16.1184 5.61936 17.616C6.17279 15.3096 8.24852 13.5955 10.7246 13.5955H13.2746C15.7509 13.5955 17.8268 15.31 18.38 17.6167C19.6996 16.119 20.5 14.153 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5ZM17.0246 18.8566V18.8455C17.0246 16.7744 15.3457 15.0955 13.2746 15.0955H10.7246C8.65354 15.0955 6.97461 16.7744 6.97461 18.8455V18.856C8.38223 19.8895 10.1198 20.5 12 20.5C13.8798 20.5 15.6171 19.8898 17.0246 18.8566ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11.9991 7.25C10.8847 7.25 9.98126 8.15342 9.98126 9.26784C9.98126 10.3823 10.8847 11.2857 11.9991 11.2857C13.1135 11.2857 14.0169 10.3823 14.0169 9.26784C14.0169 8.15342 13.1135 7.25 11.9991 7.25ZM8.48126 9.26784C8.48126 7.32499 10.0563 5.75 11.9991 5.75C13.9419 5.75 15.5169 7.32499 15.5169 9.26784C15.5169 11.2107 13.9419 12.7857 11.9991 12.7857C10.0563 12.7857 8.48126 11.2107 8.48126 9.26784Z"
                  fill=""
                />
              </svg>
              Edit profile
            </DropdownItem>
          </li>

          <li>
            <DropdownItem
              onItemClick={() => {
                setIsOpen(false);
                setShowChangePass(true);
              }}
              tag="button"
              // href="/#"
              className="group flex items-center gap-3 hover:bg-[color:var(--primary_skin)] px-3 py-2 rounded-lg font-medium text-[color:var(--primary_black)] text-theme-sm"
            >
              <Image
                width={20}
                height={20}
                src="/images/admin/header/changepass.svg"
                alt="Change Password"
              />
              <span>Change Password</span>
            </DropdownItem>
          </li>
        </ul>

        <button
          type="button"
          onClick={() => {
            logout();
            router.push("/login");
            closeDropdown();
          }}
          className="group flex items-center gap-3 hover:bg-[color:var(--primary_skin)] mt-3 px-3 py-2 rounded-lg w-full font-medium text-[color:var(--primary_black)] text-theme-sm text-left"
        >
          <svg
            className="fill-[color:var(--secondary_black)] group-hover:fill-[color:var(--primary_black)]"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.1007 19.247C14.6865 19.247 14.3507 18.9112 14.3507 18.497L14.3507 14.245H12.8507V18.497C12.8507 19.7396 13.8581 20.747 15.1007 20.747H18.5007C19.7434 20.747 20.7507 19.7396 20.7507 18.497L20.7507 5.49609C20.7507 4.25345 19.7433 3.24609 18.5007 3.24609H15.1007C13.8581 3.24609 12.8507 4.25345 12.8507 5.49609V9.74501L14.3507 9.74501V5.49609C14.3507 5.08188 14.6865 4.74609 15.1007 4.74609L18.5007 4.74609C18.9149 4.74609 19.2507 5.08188 19.2507 5.49609L19.2507 18.497C19.2507 18.9112 18.9149 19.247 18.5007 19.247H15.1007ZM3.25073 11.9984C3.25073 12.2144 3.34204 12.4091 3.48817 12.546L8.09483 17.1556C8.38763 17.4485 8.86251 17.4487 9.15549 17.1559C9.44848 16.8631 9.44863 16.3882 9.15583 16.0952L5.81116 12.7484L16.0007 12.7484C16.4149 12.7484 16.7507 12.4127 16.7507 11.9984C16.7507 11.5842 16.4149 11.2484 16.0007 11.2484L5.81528 11.2484L9.15585 7.90554C9.44864 7.61255 9.44847 7.13767 9.15547 6.84488C8.86248 6.55209 8.3876 6.55226 8.09481 6.84525L3.52309 11.4202C3.35673 11.5577 3.25073 11.7657 3.25073 11.9984Z"
              fill=""
            />
          </svg>
          Logout
        </button>
      </Dropdown>

      <ChangePasswordModal
        open={showChangePass}
        onClose={() => setShowChangePass(false)}
        onSuccess={() => {
          // optional: force reauth or show toast, etc.
        }}
      />

      <EditProfileModal
        open={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        initial={{
          firstName: (user?.name || "").split(" ")[0] || "",
          lastName: (user?.name || "").split(" ").slice(1).join(" ") || "",
          avatarUrl: user?.image || "",
        }}
        saving={false}
        onSubmit={async ({ firstName, lastName, avatarFile, avatarUrl }) => {
          try {
            const stored = localStorage.getItem("auth");
            const token = stored
              ? (JSON.parse(stored).token as string | null)
              : null;
            if (!token) return;
            const form = new FormData();
            form.set("firstName", firstName);
            form.set("lastName", lastName);
            if (avatarFile) {
              form.set("avatar", avatarFile);
            } else if (!avatarUrl) {
              // if user cleared the image
              form.set("removeAvatar", "true");
            }

            const res = await fetch("/api/auth/update-profile", {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: form,
            });
            if (res.ok) {
              // Update local context storage name for immediate UI reflect
              const auth = stored ? JSON.parse(stored) : {};
              const newName = `${firstName} ${lastName}`
                .replace(/\s+/g, " ")
                .trim();
              let newImage: string | undefined = auth.user?.image;
              try {
                const data = await res.json();
                if (data?.user) {
                  newImage = data.user.image || undefined;
                }
              } catch {}
              if (auth.user) {
                auth.user.name = newName;
                if (newImage !== undefined) auth.user.image = newImage;
              }
              localStorage.setItem("auth", JSON.stringify(auth));
              updateUser({ name: newName, image: newImage });
              setShowEditProfile(false);
              router.refresh();
            }
          } catch {
            // no-op; could show toast
          }
        }}
      />
    </div>
  );
}
