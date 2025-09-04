import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    // Authorization: Bearer <token>
    const auth = req.headers.get("authorization") || "";
    const token = auth?.startsWith("Bearer ") ? auth.slice(7).trim() : null;
    const decoded = token ? verifyToken(token) : null;
    if (!decoded) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id, clinicName, about } = (await req.json()) as {
      id: string;
      clinicName: string;
      about?: string;
    };

    if (!id || !clinicName?.trim()) {
      return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
    }

    // TODO: add your admin auth/authorization here

    const updated = await prisma.doctor.update({
      where: { id },
      data: {
        clinicName: clinicName.trim(),
        bio: (about ?? "").trim(),
      },
      select: { id: true },
    });

    return NextResponse.json({ ok: true, id: updated.id });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
