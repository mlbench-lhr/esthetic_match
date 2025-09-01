"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Button from "@/components/ui/ButtonUser";
import Input from "@/components/ui/InputUser";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    setErrorMsg(null);
    setLoading(true);
    try {
      await auth.login(data.email, data.password);
      toast.success("Login successful", { position: "top-right" });
      router.push("/admin/dashboard");
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setErrorMsg(message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex md:flex-row flex-col w-full h-screen">
      {/* Left Panel */}
      <div className="hidden md:flex flex-col justify-center items-center bg-[url('/images/login/login-bg.png')] bg-cover bg-center px-6 lg:px-10 w-full md:w-1/2 text-white">
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
          <p className="text-tertiary_skin/50 text-sm sm:text-base">
            Access your Esthetic Match dashboard to easily view and manage
            patient, clinic, and doctor profiles.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex justify-center items-center bg-primary px-4 sm:px-6 lg:px-8 w-full md:w-1/2 h-full">
        <div className="bg-white shadow-md p-6 sm:p-8 rounded-md w-full max-w-md">
          <h2 className="mt-4 sm:mt-6 mb-3 sm:mb-4 font-semibold text-2xl sm:text-3xl lg:text-4xl text-center">
            Sign In
          </h2>
          <p className="mb-6 sm:mb-10 text-gray-500 text-xs sm:text-sm text-center">
            Please enter your details.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 sm:space-y-6"
          >
            {/* Email Input */}
            <div>
              <label className="block mb-1 sm:mb-2 font-bold text-primary_black text-xs sm:text-sm">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
                className="border-primary_black/10 rounded-full w-full text-secondary_black/80 placeholder:text-secondary_black/80"
              />
              {errors.email && (
                <p className="text-red text-xs sm:text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label className="block mb-1 sm:mb-2 font-bold text-primary_black text-xs sm:text-sm">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
                withIcon
                className="border-primary_black/10 rounded-full w-full text-secondary_black/80 placeholder:text-secondary_black/80"
              />
              {errors.password && (
                <p className="text-red text-xs sm:text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="text-left">
              <Link
                href="/forgotpassword"
                className="mt-3 sm:mt-5 text-secondary text-xs sm:text-sm hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <p className="text-red text-xs sm:text-sm">{errorMsg}</p>
            )}

            {/* Login Button */}
            <Button
              type="submit"
              variant="primary"
              className="bg-secondary hover:bg-secondary/80 mt-6 sm:mt-9 w-full text-white_primary transition-colors cursor-pointer"
            >
              {loading ? "Signing in..." : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
