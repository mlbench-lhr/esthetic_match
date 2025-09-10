import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";

/**
 * EditProfileModal
 * - Accessible modal dialog (esc/overlay click close)
 * - Avatar: upload via button, drag & drop, or paste from clipboard
 * - Preview + remove/reset
 * - Validates file type & size; exposes selected file via onSubmit
 *
 * TailwindCSS required.
 */
export default function EditProfileModal({
  open,
  initial = { firstName: "", lastName: "", avatarUrl: "" },
  saving = false,
  onClose,
  onSubmit,
}: {
  open: boolean;
  initial?: { firstName?: string; lastName?: string; avatarUrl?: string };
  saving?: boolean;
  onClose: () => void;
  onSubmit: (data: {
    firstName: string;
    lastName: string;
    avatarFile?: File | null;
    avatarUrl?: string | null; // preview URL
  }) => void;
}) {
  const [firstName, setFirstName] = useState(initial.firstName || "");
  const [lastName, setLastName] = useState(initial.lastName || "");
  const [error, setError] = useState<string | null>(null);

  const [avatarObjectUrl, setAvatarObjectUrl] = useState<string | null>(
    initial.avatarUrl || null
  );
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Clean up object URLs
  useEffect(() => {
    return () => {
      if (avatarObjectUrl && avatarObjectUrl.startsWith("blob:")) {
        URL.revokeObjectURL(avatarObjectUrl);
      }
    };
  }, [avatarObjectUrl]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const accept = "image/png,image/jpeg,image/webp,image/gif";
  const maxBytes = 5 * 1024 * 1024; // 5MB

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) {
        setError("Please choose an image file (png, jpg, webp, gif).");
        return;
      }
      if (file.size > maxBytes) {
        setError("Image must be 5MB or smaller.");
        return;
      }
      setError(null);
      setAvatarFile(file);
      const url = URL.createObjectURL(file);
      setAvatarObjectUrl((prev) => {
        if (prev && prev.startsWith("blob:")) URL.revokeObjectURL(prev);
        return url;
      });
    },
    [maxBytes]
  );

  // Paste image support
  useEffect(() => {
    if (!open) return;
    const onPaste = (e: ClipboardEvent) => {
      if (!e.clipboardData) return;
      const item = Array.from(e.clipboardData.items).find((i) =>
        i.type.startsWith("image/")
      );
      if (item) {
        const file = item.getAsFile();
        if (file) handleFile(file);
      }
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [open, handleFile]);

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  }

  function onPickClick() {
    fileInputRef.current?.click();
  }

  function onRemoveAvatar() {
    setAvatarFile(null);
    setAvatarObjectUrl(null);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) {
      setError("First and last name are required.");
      return;
    }
    onSubmit({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      avatarFile,
      avatarUrl: avatarObjectUrl,
    });
  }

  if (!open) return null;

  return (
    <div
      className="z-[999] fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-profile-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="bg-white shadow-md p-6 rounded-2xl w-full max-w-sm"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h3
            id="edit-profile-title"
            className="font-bold text-[22px] text-neutral-900 md:text-[26px]"
          >
            Edit Profile
          </h3>
          <button
            onClick={onClose}
            className="hover:bg-neutral-100 p-1 rounded-full text-neutral-500"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <div
            className="relative"
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
          >
            <div className="bg-neutral-100 rounded-full ring-1 ring-black/5 w-[96px] h-[96px] overflow-hidden">
              {avatarObjectUrl ? (
                // Circle masked preview
                <Image
                  src={avatarObjectUrl}
                  alt="Avatar preview"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="place-items-center grid w-full h-full text-neutral-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-10 h-10"
                  >
                    <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm-7 9a7 7 0 1114 0H5z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Pencil / actions */}
            <div className="-right-1 -bottom-1 absolute flex gap-1">
              <button
                type="button"
                onClick={onPickClick}
                className="inline-flex justify-center items-center bg-neutral-900 shadow rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 w-8 h-8 text-white"
                title="Change photo"
                aria-label="Change photo"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0L8.288 11.999l-.69 3.105a1 1 0 001.196 1.196l3.105-.69 9.731-9.731a2.625 2.625 0 000-3.71zM5.25 5.25A2.25 2.25 0 003 7.5v11.25A2.25 2.25 0 005.25 21h11.25A2.25 2.25 0 0018.75 18.75V12a.75.75 0 00-1.5 0v6.75a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V7.5a.75.75 0 01.75-.75H12a.75.75 0 000-1.5H5.25z" />
                </svg>
              </button>
              {avatarObjectUrl && (
                <button
                  type="button"
                  onClick={onRemoveAvatar}
                  className="inline-flex justify-center items-center bg-white hover:bg-neutral-50 rounded-full ring-1 ring-black/10 w-8 h-8 text-neutral-600"
                  title="Remove photo"
                  aria-label="Remove photo"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.5 4.478v.022H21a.75.75 0 010 1.5h-1.05l-1.3 11.047A3.75 3.75 0 0114.92 21H9.08a3.75 3.75 0 01-3.73-3.953L4.05 6H3a.75.75 0 010-1.5h4.5a3 3 0 013-3h3a3 3 0 013 3H21a.75.75 0 010 1.5h-4.5v-.022A1.5 1.5 0 0015 3h-3a1.5 1.5 0 00-1.5 1.478zM8.22 8.22a.75.75 0 011.06 0L12 10.94l2.72-2.72a.75.75 0 111.06 1.06L13.06 12l2.72 2.72a.75.75 0 11-1.06 1.06L12 13.06l-2.72 2.72a.75.75 0 11-1.06-1.06L10.94 12 8.22 9.28a.75.75 0 010-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept={accept}
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f);
              }}
            />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block mb-2 font-bold text-neutral-900 text-xs">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Enter First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-white p-3 border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 w-full text-neutral-800 placeholder:text-neutral-500"
              autoComplete="given-name"
            />
          </div>

          <div>
            <label className="block mb-2 font-bold text-neutral-900 text-xs">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Enter Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-white p-3 border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900 w-full text-neutral-800 placeholder:text-neutral-500"
              autoComplete="family-name"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={saving}
            className="bg-neutral-900 hover:bg-neutral-800 disabled:opacity-60 mt-2 rounded-2xl w-full h-[48px] font-medium text-white"
          >
            {saving ? "Updating..." : "Update"}
          </button>
        </form>

        {/* Helper */}
        <p className="mt-3 text-neutral-500 text-xs text-center">
          Tip: Drop, paste, or choose an image. Max 5MB.
        </p>
      </div>
    </div>
  );
}
