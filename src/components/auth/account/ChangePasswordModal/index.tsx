"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useForm } from "react-hook-form";
import Input from "@/components/ui/InputUser";
import Button from "@/components/ui/ButtonUser";
import Image from "next/image";
import { toast } from "react-toastify";

type FormValues = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function ChangePasswordModal({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();
  const { token } = useAuth();

  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  if (!open) return null;

  const onSubmit = async (data: FormValues) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (data.newPassword.length < 6) {
      toast.error("Password should be at least 6 characters");
      return;
    }

    try {
      if (!token) {
        toast.error("Not authorized. Please login again");
        return;
      }
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        }),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error(json?.error || "Unable to update password");
        return;
      }

      toast.success("Password updated");
      onClose();
      onSuccess?.();
    } catch {
      toast.error("Server error");
    }
  };

  return (
    <div
      className="z-[100] fixed inset-0 flex justify-center items-center"
      aria-modal="true"
      role="dialog"
    >
      {/* backdrop */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close modal backdrop"
        className="absolute inset-0 bg-black/30"
      />

      {/* modal */}
      <div className="relative bg-white_primary shadow-theme-lg p-5 rounded-3xl w-[92%] max-w-[400px]">
        {/* header */}
        <div className="relative flex justify-center items-center mb-2">
          <h3 className="font-semibold text-primary_black text-lg text-center">
            Change Password
          </h3>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="inline-flex right-0 absolute justify-center items-center hover:bg-primary_skin rounded-full w-8 h-8"
          >
            <Image
              src="/images/admin/header/close.svg"
              width={16}
              height={16}
              alt="Close"
            />
          </button>
        </div>

        {/* form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-4">
          {/* Old Password */}
          <div>
            <label className="block mb-2 font-semibold text-primary_black text-sm">
              Old Password
            </label>
            <Input
              id="oldPassword"
              type="password"
              placeholder="Enter Old Password"
              withIcon
              className="border-black_secondary/10 rounded-full w-full text-secondary_black/80 placeholder:text-secondary_black/80"
              {...register("oldPassword", {
                required: "Old password is required",
              })}
            />
            {errors.oldPassword && (
              <p className="mt-1 text-red text-xs">
                {errors.oldPassword.message}
              </p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label className="block mb-2 font-semibold text-primary_black text-sm">
              New Password
            </label>
            <Input
              id="newPassword"
              type="password"
              placeholder="Enter new password"
              withIcon
              className="border-black_secondary/10 rounded-full w-full text-secondary_black/80 placeholder:text-secondary_black/80"
              {...register("newPassword", {
                required: "New password is required",
              })}
            />
            {errors.newPassword && (
              <p className="mt-1 text-red text-xs">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block mb-2 font-semibold text-primary_black text-sm">
              Confirm New Password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your new password"
              withIcon
              className="border-black_secondary/10 rounded-full w-full text-secondary_black/80 placeholder:text-secondary_black/80"
              {...register("confirmPassword", {
                required: "Please confirm your new password",
              })}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-red text-xs">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#0E1A2B] hover:bg-[#0E1A2B]/90 mt-6 rounded-full w-full h-12 text-white_primary"
          >
            {isSubmitting ? "Updating..." : "Update"}
          </Button>
        </form>
      </div>
    </div>
  );
}
