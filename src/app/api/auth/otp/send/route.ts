import { NextResponse, type NextRequest } from "next/server";
import { PrismaClient, type User } from "@prisma/client";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email)
      return NextResponse.json({ error: "Email required" }, { status: 400 });

    const user: User | null = await prisma.user.findUnique({
      where: { email },
    });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const now = new Date();
    const resendCooldown = 60; // seconds
    if (user.otpSentAt) {
      const diff = (now.getTime() - new Date(user.otpSentAt).getTime()) / 1000;
      if (diff < resendCooldown) {
        return NextResponse.json(
          {
            error: "Resend cooldown",
            nextAllowedIn: Math.ceil(resendCooldown - diff),
          },
          { status: 429 }
        );
      }
    }

    // generate 6-digit OTP
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const hashed = await bcrypt.hash(otp, 10);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await prisma.user.update({
      where: { email },
      data: { otp: hashed, otpExpiresAt: expiresAt, otpSentAt: now },
    });

    // send email if config exists
    const { EMAIL_USER, EMAIL_PASS } = process.env;
    if (EMAIL_USER && EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: { user: EMAIL_USER, pass: EMAIL_PASS },
        });
        await transporter.sendMail({
          from: EMAIL_USER,
          to: email,
          subject: "Your OTP code",
          text: `Your OTP: ${otp} (valid 10 minutes)`,
        });
      } catch (e) {
        console.error("Email send failed:", e);
      }
    } else {
      // fallback: log OTP to server console (for dev)
      console.log(`OTP for ${email}: ${otp}`);
    }

    return NextResponse.json({ message: "OTP sent", resendCooldown });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
