"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Input from "../ui/InputUser";
import Button from "../ui/ButtonUser";

type Props = {
  open: boolean;
  onClose: () => void;
};

type FormValues = {
  fname: string;
  lname: string;
  email: string;
  newPassword: string;
};

export default function AddDocModal({ open, onClose }: Props) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    setServerError(null);

    const payload = {
      firstName: data.fname.trim(),
      lastName: data.lname.trim(),
      email: data.email.trim(),
      password: data.newPassword,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/doctor/admin-signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(body?.message || "Failed to add doctor.");
      }

      reset();
      onClose();
      router.refresh(); // refresh the list/count
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : "Request failed.");
    }
  };

  if (!open) return null;

  return (
    <div
      className="z-[999] fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white_primary shadow-md p-6 rounded-md w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-2xl">Add Doctor</h2>
          <button
            onClick={onClose}
            className="hover:bg-gray-100 p-1 rounded-md text-gray-500"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block mb-2 font-bold text-primary_black text-xs">
              First Name
            </label>
            <Input
              id="fname"
              // name="fname"
              placeholder="Enter First Name"
              {...register("fname", { required: "First Name is required" })}
              className="border-primary_black/10 rounded-full w-full text-secondary_black/80 placeholder:text-secondary_black/80"
            />
            {errors.fname && (
              <p className="mt-1 text-red text-xs">{errors.fname.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-bold text-primary_black text-xs">
              Last Name
            </label>
            <Input
              id="lname"
              // name="lname"
              placeholder="Enter Last Name"
              {...register("lname", { required: "Last Name is required" })}
              className="border-primary_black/10 rounded-full w-full text-secondary_black/80 placeholder:text-secondary_black/80"
            />
            {errors.lname && (
              <p className="mt-1 text-red text-xs">{errors.lname.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-bold text-primary_black text-xs">
              Email Address
            </label>
            <Input
              id="email"
              // name="email"
              type="email"
              placeholder="Enter email"
              {...register("email", { required: "Email is required" })}
              className="border-primary_black/10 rounded-full w-full text-secondary_black/80 placeholder:text-secondary_black/80"
            />
            {errors.email && (
              <p className="mt-1 text-red text-xs">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 font-bold text-primary_black text-xs">
              Create Password
            </label>
            <Input
              id="newPassword"
              // name="newPassword"
              type="password"
              placeholder="Enter password"
              withIcon
              {...register("newPassword", { required: "Password is required" })}
              className="border-black_secondary/10 rounded-full w-full text-secondary_black/80 placeholder:text-secondary_black/80"
            />
            {errors.newPassword && (
              <p className="mt-1 text-red text-xs">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {serverError && (
            <p className="text-red text-sm" role="alert">
              {serverError}
            </p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-black_secondary hover:bg-black_tertiary mt-4 rounded-md w-full text-primary cursor-pointer"
          >
            {isSubmitting ? "Saving..." : "Continue"}
          </Button>
        </form>
      </div>
    </div>
  );
}
