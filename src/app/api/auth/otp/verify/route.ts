import { NextResponse, type NextRequest } from "next/server";
import { PrismaClient, type User } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json();
    if (!email || !otp)
      return NextResponse.json(
        { error: "Email and OTP required" },
        { status: 400 }
      );
    if (!/^[0-9]{6}$/.test(otp))
      return NextResponse.json(
        { error: "Invalid OTP format" },
        { status: 400 }
      );

    const user: User | null = await prisma.user.findUnique({
      where: { email },
    });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    if (!user.otp || !user.otpExpiresAt)
      return NextResponse.json({ error: "No OTP requested" }, { status: 400 });

    const now = new Date();
    if (new Date(user.otpExpiresAt) < now)
      return NextResponse.json({ error: "OTP expired" }, { status: 400 });

    const valid = await bcrypt.compare(otp, user.otp);
    if (!valid)
      return NextResponse.json({ error: "Invalid OTP" }, { status: 401 });

    // mark verified and clear otp fields
    await prisma.user.update({
      where: { email },
      data: {
        isVerified: true,
        otp: null,
        otpExpiresAt: null,
        otpSentAt: null,
      },
    });

    // set a short-lived cookie (10 minutes) so the reset page can read the email
    const res = NextResponse.json({ message: "OTP verified" });
    const maxAge = 60 * 10; // 10 minutes
    res.headers.append(
      "Set-Cookie",
      `reset_email=${encodeURIComponent(
        email
      )}; Path=/; Max-Age=${maxAge}; SameSite=Lax`
    );
    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
