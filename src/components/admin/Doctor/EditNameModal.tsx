"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Text from "@/components/ui/TextUser";
import Button from "@/components/ui/ButtonUser";
import Input from "@/components/ui/InputUser";
import { useAuth } from "@/context/AuthContext";

type Props = {
  open: boolean;
  onClose: () => void;
  doctorId: string;
  about: string;
  clinicName: string;
  image?: string | null;
  onSaved?: () => void;
};

export default function EditNameModal({
  open,
  onClose,
  doctorId,
  about,
  clinicName,
  image,
  onSaved,
}: Props) {
  const { token } = useAuth();
  const [cName, setclinicName] = useState(clinicName);
  const [aboutt, setabout] = useState(about);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setclinicName(clinicName);
      setabout(about);
      setErr(null);
    }
  }, [open, about, clinicName]);

  if (!open) return null;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);

    if (!cName.trim()) {
      setErr("clinic name is required.");
      return;
    }

    if (!token) {
      setErr("Not authorized. Please login again.");
      return;
    }

    try {
      setSaving(true);
      const res = await fetch("/api/admin/doctor/update-name", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          id: doctorId,
          about: aboutt.trim(),
          clinicName: cName.trim(),
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
            Edit Info
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
          </div>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 font-bold text-primary_black text-xs">
              Clinic Name
            </label>
            <Input
              id="cname"
              name="clinicName"
              type="text"
              placeholder="Enter clinic name"
              value={cName}
              onChange={(e) => setclinicName(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 font-bold text-primary_black text-xs">
              About
            </label>
            <textarea
              id="about"
              name="aboutt"
              placeholder="Enter bio/about"
              value={aboutt}
              rows={5}
              className="bg-white_primary p-3 border border-black_secondary/10 rounded-xl focus:outline-none w-full text-secondary_black/90 placeholder:text-secondary_black/60"
              onChange={(e) => setabout(e.target.value)}
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
