"use client";
import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "@/components/ui/ButtonUser";
import Input from "@/components/ui/InputUser";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type FormValues = {
  email: string;
  password: string;
};

const ForgotPassword = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [emailValue, setEmailValue] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const router = useRouter();

  const inputRefs = useRef<HTMLInputElement[]>([]);
  const handleChange = (value: string, index: number) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData("text").trim();
    if (pasteData.length === 6 && /^\d+$/.test(pasteData)) {
      const newOtp = pasteData.split("");
      setOtp(newOtp);
      inputRefs.current[5]?.focus();
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    // send OTP
    setEmailValue(data.email);
    fetch("/api/auth/otp/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: data.email }),
    }).then(async (res) => {
      let json;
      try {
        json = await res.json();
      } catch {
        toast.error(
          "Server error - please ensure the development server is running"
        );
        return;
      }
      if (!res.ok) {
        toast.error(json.error || "Failed to send OTP");
        if (json.nextAllowedIn) {
          setResendTimer(json.nextAllowedIn);
          setResendDisabled(true);
        }
        return;
      }
      toast.success("OTP sent to your email (check console if in dev)");
      setResendDisabled(true);
      setResendTimer(json.resendCooldown || 60);
    });
  };

  useEffect(() => {
    if (!resendDisabled) return;
    if (resendTimer <= 0) {
      setResendDisabled(false);
      return;
    }
    const t = setInterval(() => setResendTimer((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [resendDisabled, resendTimer]);

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length !== 6) return toast.error("Enter full 6-digit OTP");
    const res = await fetch("/api/auth/otp/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailValue, otp: code }),
    });
    let json;
    try {
      json = await res.json();
    } catch {
      return toast.error(
        "Server error - please ensure the development server is running"
      );
    }
    if (!res.ok) return toast.error(json.error || "OTP verify failed");
    toast.success("OTP verified — you can now reset your password");
    router.push("/resetpassword");
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
            Forgot Password?
          </h2>
          <p className="mb-6 sm:mb-10 text-gray-500 text-xs sm:text-sm text-center">
            Enter the email address linked to your account, and we’ll send you a
            link to reset your password.
          </p>

          {/* Email Input */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="block mb-1 sm:mb-2 font-bold text-[#000000] text-xs sm:text-sm">
                Email Address
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
                className="border-[#0000001A] rounded-full w-full text-[#00000080] placeholder:text-[#00000080]"
              />
              {errors.email && (
                <p className="text-red-500 text-xs sm:text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Send OTP */}
            <div className="mt-3 sm:mt-5 text-left">
              <button
                type="submit"
                disabled={resendDisabled}
                className={`text-[#16263D] text-xs sm:text-sm cursor-pointer underline ${
                  resendDisabled ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                {resendDisabled ? `Resend in ${resendTimer}s` : "Send OTP"}
              </button>
            </div>
          </form>

          {/* OTP Inputs */}
          <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => {
                  if (el) inputRefs.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) =>
                  handleChange(e.target.value.replace(/[^0-9]/g, ""), i)
                }
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !otp[i] && i > 0) {
                    inputRefs.current[i - 1]?.focus();
                  }
                }}
                onPaste={handlePaste}
                className="mt-6 mb-8 sm:mb-12 border border-[#0D0F2B1A] focus:border-[#2A2A2A] rounded-lg sm:rounded-xl md:rounded-2xl focus:outline-none w-[32px] sm:w-[36px] md:w-[40px] h-[32px] sm:h-[36px] md:h-[40px] text-[#0D0F2B80] text-[12px] sm:text-[16px] md:text-[19px] text-center"
              />
            ))}
          </div>

          {/* Verify Button */}
          <Button
            type="button"
            variant="primary"
            onClick={handleVerify}
            className="bg-[#2A2A2A] hover:bg-[#1C2431] mt-6 sm:mt-9 w-full text-[#F4E9DC] transition-colors cursor-pointer"
          >
            Verify
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
