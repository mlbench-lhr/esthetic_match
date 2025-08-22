"use client";
import React from "react";
import Button from "./ButtonUser";
import { useRouter } from "next/navigation";
import Image from "next/image";

export const ResetModel = () => {
  const router = useRouter();
  return (
    <>
      <div className="flex h-screen">
        {/* Left Panel */}
        <div className="hidden md:flex flex-col justify-center items-center bg-[#1C2431] px-10 w-1/2 text-white">
          <div className="text-center">
            {/* Logo */}
            <div className="flex justify-center items-center mb-6">
              <Image
                src="/images/auth/authlogo.svg"
                alt="Logo"
                width={120}
                height={120}
              />
            </div>
            <h1 className="mb-2 font-bold text-4xl">
              Welcome to Esthetic Match!
            </h1>
            <p className="max-w-md text-[#FAF9F780] text-[14px] md:text-[16px]">
              Access your Esthetic Match dashboard to easily view and manage
              patient, clinic, and doctor profiles.
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div
          className={`flex justify-center items-center bg-[#F4E9DF] w-full md:w-1/2`}
        >
          <div className="flex flex-col items-center bg-white shadow-md p-8 rounded-md w-[490px]">
            <Image
              src="/images/auth/passupdated.svg"
              alt="Logo"
              width={170}
              height={170}
            />
            <h2 className="mt-10 mb-4 font-semibold text-4xl text-center">
              Password Updated
            </h2>
            <Button
              type="submit"
              variant="primary"
              onClick={() => router.push("/login")}
              className="bg-[#2A2A2A] hover:bg-[#1C2431] mt-10 w-full text-[#F4E9DC] transition-colors cursor-pointer"
            >
              Back To Login
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
