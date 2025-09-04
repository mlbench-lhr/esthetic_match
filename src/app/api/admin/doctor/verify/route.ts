/* eslint-disable @typescript-eslint/no-explicit-any */
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

    const { id, verified, reason } = (await req.json()) as {
      id: string;
      verified: number; // 2 = accepted, 3 = rejected
      reason?: string;
    };

    if (!id || typeof verified !== "number") {
      return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
    }

    if (verified === 3) {
      // Reject – reason required, and set rejection fields
      if (!reason || !reason.trim()) {
        return NextResponse.json(
          { message: "Reason is required" },
          { status: 400 }
        );
      }
      const doc = await prisma.doctor.update({
        where: { id },
        data: {
          verified: 3,
          rejectionReason: reason.trim(),
          rejectedAt: new Date(),
        } as any,
        select: { id: true },
      });
      return NextResponse.json({ ok: true, id: doc.id });
    }

    if (verified === 2) {
      // Accept – clear any rejection fields
      const doc = await prisma.doctor.update({
        where: { id },
        data: { verified: 2, rejectionReason: null, rejectedAt: null } as any,
        select: { id: true },
      });
      return NextResponse.json({ ok: true, id: doc.id });
    }

    // Other states if you use them
    const doc = await prisma.doctor.update({
      where: { id },
      data: { verified },
      select: { id: true },
    });
    return NextResponse.json({ ok: true, id: doc.id });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
