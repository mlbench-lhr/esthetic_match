// app/api/admin/hidden-reviews/[id]/show/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Update the review to set hidden to false (make it visible again)
    await prisma.doctorReview.update({
      where: { id },
      data: { hidden: false },
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[hidden-reviews][SHOW]", e);
    return NextResponse.json(
      { error: "Failed to show review" },
      { status: 500 }
    );
  }
}
