import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    // Expect Authorization: Bearer <token>
    const auth = req.headers.get("authorization") || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7).trim() : null;
    const decoded = token
      ? (verifyToken(token) as { id?: string } | null)
      : null;
    if (!decoded || !decoded.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { oldPassword, newPassword } = (await req.json()) as {
      oldPassword: string;
      newPassword: string;
    };

    if (!oldPassword?.trim() || !newPassword?.trim()) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    // Admin users stored in User model (role admin)
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const valid = await bcrypt.compare(oldPassword, user.password);
    if (!valid) {
      return NextResponse.json(
        { error: "Old password incorrect" },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashed, lastLogin: new Date() },
      select: { id: true },
    });

    return NextResponse.json({ message: "Password updated" });
  } catch (e) {
    console.error("[change-password]", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
