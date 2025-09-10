// app/api/admin/hidden-reviews/[id]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.doctorReview.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[hidden-reviews][DELETE]", e);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
