"use client";
import React from "react";
import Button from "./ButtonUser";
import { useRouter } from "next/navigation";
import Image from "next/image";

export const ResetModel = () => {
  const router = useRouter();
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
          <p className="text-primary_skin text-sm sm:text-base">
            Access your Esthetic Match dashboard to easily view and manage
            patient, clinic, and doctor profiles.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex justify-center items-center bg-primary px-4 sm:px-6 lg:px-8 w-full md:w-1/2 h-full">
        <div className="flex flex-col items-center bg-white_primary shadow-md p-6 sm:p-8 rounded-md w-full max-w-md">
          <Image
            src="/images/auth/passupdated.svg"
            alt="Password Updated"
            width={170}
            height={170}
          />
          <h2 className="mt-8 sm:mt-10 mb-3 sm:mb-4 font-semibold text-2xl sm:text-3xl lg:text-4xl text-center">
            Password Updated
          </h2>
          <Button
            type="submit"
            variant="primary"
            onClick={() => router.push("/login")}
            className="bg-black_secondary hover:bg-black_tertiary mt-8 sm:mt-10 w-full text-primary transition-colors cursor-pointer"
          >
            Back To Login
          </Button>
        </div>
      </div>
    </div>
  );
};
