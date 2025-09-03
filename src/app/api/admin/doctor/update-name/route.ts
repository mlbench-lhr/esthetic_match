import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { id, firstName, lastName } = (await req.json()) as {
      id: string;
      firstName: string;
      lastName: string;
    };

    if (!id || !firstName?.trim() || !lastName?.trim()) {
      return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
    }

    // TODO: add your admin auth/authorization here

    const updated = await prisma.doctor.update({
      where: { id },
      data: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      },
      select: { id: true },
    });

    return NextResponse.json({ ok: true, id: updated.id });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
