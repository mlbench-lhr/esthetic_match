"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@/components/ui/ButtonUser";
import Input from "@/components/ui/InputUser";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type FormValues = {
  email?: string;
  newPassword: string;
  confirmPassword: string;
};

const ResetPassword = () => {
  const router = useRouter();
  const [savedEmail, setSavedEmail] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    try {
      const e = localStorage.getItem("reset_email");
      if (e) setSavedEmail(e);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (savedEmail) return;
    try {
      const match = document.cookie.match(/(?:^|; )reset_email=([^;]+)/);
      if (match) setSavedEmail(decodeURIComponent(match[1]));
    } catch {
      // ignore
    }
  }, [savedEmail]);

  const onSubmit = async (data: FormValues) => {
    const email = data.email || savedEmail;
    if (!email)
      return toast.error(
        "Missing email — start the forgot-password flow first"
      );
    if (!data.newPassword || !data.confirmPassword)
      return toast.error("Please enter and confirm your new password");
    if (data.newPassword !== data.confirmPassword)
      return toast.error("Passwords do not match");
    if (data.newPassword.length < 6)
      return toast.error("Password should be at least 6 characters");

    try {
      const res = await fetch("/api/auth/resetpass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: data.newPassword }),
      });
      let json;
      try {
        json = await res.json();
      } catch {
        return toast.error(
          "Server error - please ensure the development server is running"
        );
      }
      if (!res.ok) return toast.error(json.error || "Failed to reset password");
      toast.success("Password updated — please login with your new password");
      // cleanup
      try {
        localStorage.removeItem("reset_email");
      } catch {
        /* ignore */
      }
      setTimeout(() => router.push("/password"), 1200);
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  return (
    <div className="flex md:flex-row flex-col w-full h-screen">
      {/* Left Panel */}
      <div className="hidden md:flex flex-col justify-center items-center bg-[#1C2431] px-6 lg:px-10 w-full md:w-1/2 text-white">
        <div className="max-w-md text-center">
          {/* Logo */}
          <div className="flex justify-center items-center mb-6">
            <Image
              src="/images/auth/authlogo.svg"
              alt="Logo"
              width={120}
              height={120}
            />
          </div>
          <h1 className="mb-2 font-bold text-2xl sm:text-3xl lg:text-4xl">
            Welcome to Esthetic Match!
          </h1>
          <p className="text-[#FAF9F780] text-sm sm:text-base">
            Access your Esthetic Match dashboard to easily view and manage
            patient, clinic, and doctor profiles.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex justify-center items-center bg-[#F4E9DF] px-4 sm:px-6 lg:px-8 w-full md:w-1/2 h-full">
        <div className="bg-white shadow-md p-6 sm:p-8 rounded-md w-full max-w-md">
          <h2 className="mt-4 sm:mt-6 mb-3 sm:mb-4 font-semibold text-2xl sm:text-3xl lg:text-4xl text-center">
            Reset Password?
          </h2>
          <p className="mb-6 sm:mb-10 text-gray-500 text-xs sm:text-sm text-center">
            Enter your new password & confirm password to reset your password
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 sm:space-y-6"
          >
            {/* New Password Input */}
            <div>
              <label className="block mb-1 sm:mb-2 font-bold text-[#000000] text-xs sm:text-sm">
                New Password
              </label>
              <Input
                id="newPassword"
                type="password"
                placeholder="Enter your new password"
                {...register("newPassword", {
                  required: "Password is required",
                })}
                withIcon
                className="border-[#0000001A] rounded-full w-full text-[#00000080] placeholder:text-[#00000080]"
              />
              {errors.newPassword && (
                <p className="text-red-500 text-xs sm:text-sm">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block mb-1 sm:mb-2 font-bold text-[#000000] text-xs sm:text-sm">
                Confirm New Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your new password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                })}
                withIcon
                className="border-[#0000001A] rounded-full w-full text-[#00000080] placeholder:text-[#00000080]"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs sm:text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              className="bg-[#2A2A2A] hover:bg-[#1C2431] mt-10 sm:mt-16 lg:mt-20 w-full text-[#F4E9DC] transition-colors cursor-pointer"
            >
              Continue
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
