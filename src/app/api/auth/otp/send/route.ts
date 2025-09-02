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
    const resendCooldown = 60;
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

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const hashed = await bcrypt.hash(otp, 10);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.user.update({
      where: { email },
      data: { otp: hashed, otpExpiresAt: expiresAt, otpSentAt: now },
    });

    const html = `
    <!DOCTYPE html>
    <html lang="en-US">
    <head>
      <meta charset="utf-8" />
    </head>
    <body>
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
    <h2 style="text-align: center; color: #333;">Reset Your Esthetic Match Password</h2>
    <p>Hi <strong>${user.name || "User"}</strong>,</p>
    <p>We received a request to reset your password for <strong>Esthetic Match</strong>. To proceed, please use the One-Time Password (OTP) below:</p>
    
    <div style="text-align: center; margin: 30px 0;">
      <p style="font-size: 18px; margin-bottom: 10px;">Your OTP Is</p>
      <div style="display: inline-block; background: #f4f4f4; padding: 15px 25px; font-size: 28px; font-weight: bold; border-radius: 8px; border: 1px solid #ccc; letter-spacing: 5px;">
        ${otp}
      </div>
    </div>
    
    <p>Thank you for joining Esthetic Match — we're excited to have you on board!</p>
    <hr style="margin: 20px 0;" />
    <p>Contact Support:<br>
    Email: <a href="mailto:estheticmatch@gmail.com">estheticmatch@gmail.com</a></p>
  </div>
  </body>
    </html>
  `;
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
          subject: "Reset Your Esthetic Match Password",
          html,
        });
      } catch (e) {
        console.error("Email send failed:", e);
      }
    } else {
      console.log(`OTP for ${email}: ${otp}`);
    }

    return NextResponse.json({ message: "OTP sent", resendCooldown });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
