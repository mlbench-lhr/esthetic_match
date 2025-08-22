import { NextResponse, type NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    if (!email || !password)
      return NextResponse.json(
        { error: "Email and new password required" },
        { status: 400 }
      );

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    // require that the user has completed OTP verification
    if (!user.isVerified)
      return NextResponse.json({ error: "OTP not verified" }, { status: 403 });

    const hashed = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { email },
      data: {
        password: hashed,
        isVerified: false,
        otp: null,
        otpExpiresAt: null,
        otpSentAt: null,
      },
    });

    return NextResponse.json({ message: "Password updated" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
