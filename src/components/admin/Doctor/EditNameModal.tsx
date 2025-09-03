"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Text from "@/components/ui/TextUser";
import Button from "@/components/ui/ButtonUser";
import Input from "@/components/ui/InputUser";

type Props = {
  open: boolean;
  onClose: () => void;
  doctorId: string;
  firstName: string;
  lastName: string;
  image?: string | null; // show only (no update)
  onSaved?: () => void; // e.g. router.refresh
};

export default function EditNameModal({
  open,
  onClose,
  doctorId,
  firstName,
  lastName,
  image,
  onSaved,
}: Props) {
  const [fname, setFname] = useState(firstName);
  const [lname, setLname] = useState(lastName);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setFname(firstName);
      setLname(lastName);
      setErr(null);
    }
  }, [open, firstName, lastName]);

  if (!open) return null;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);

    if (!fname.trim() || !lname.trim()) {
      setErr("First and last name are required.");
      return;
    }

    try {
      setSaving(true);
      const res = await fetch("/api/admin/doctor/update-name", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          id: doctorId,
          firstName: fname.trim(),
          lastName: lname.trim(),
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.message || "Failed to update");
      }
      onClose();
      onSaved?.();
    } catch (e: unknown) {
      setErr((e as Error)?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="z-[999] fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white_primary shadow-md p-6 rounded-2xl w-full max-w-sm">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <Text
            as="h3"
            className="font-bold text-[22px] text-primary_black md:text-[26px]"
          >
            Edit Profile
          </Text>
          <button
            onClick={onClose}
            className="hover:bg-primary_skin p-1 rounded-full text-secondary"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Avatar (display only) */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="bg-primary_skin rounded-full w-[96px] h-[96px] overflow-hidden">
              <Image
                src={image || "/images/admin/doctor/user.svg"}
                alt="Doctor"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
            {/* small edit-dot look-alike badge (display only) */}
            {/* <span className="inline-flex -top-1 -right-1 absolute justify-center items-center bg-secondary rounded-full w-6 h-6 text-[12px] text-white_primary">
              ✎
            </span> */}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 font-bold text-primary_black text-xs">
              First Name
            </label>
            <Input
              id="fname"
              name="firstName"
              type="text"
              placeholder="Enter First Name"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 font-bold text-primary_black text-xs">
              Last Name
            </label>
            <Input
              id="lname"
              name="lastName"
              type="text"
              placeholder="Enter Last Name"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
            />
          </div>

          {err && <p className="text-red text-sm">{err}</p>}

          <Button
            type="submit"
            disabled={saving}
            className="bg-black_secondary hover:bg-black_tertiary mt-2 rounded-xl w-full h-[48px] text-primary"
          >
            {saving ? "Updating..." : "Update"}
          </Button>
        </form>
      </div>
    </div>
  );
}
