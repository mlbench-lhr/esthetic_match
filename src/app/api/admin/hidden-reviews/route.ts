// app/api/admin/hidden-reviews/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Fetch raw reviews without strict relation includes to avoid errors when related docs are missing
    const reviews = await prisma.doctorReview.findMany({
      where: { hidden: true },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        doctorId: true,
        userId: true,
        comment: true,
        createdAt: true,
      },
    });

    const doctorIds = Array.from(new Set(reviews.map((r) => r.doctorId)));
    const userIds = Array.from(new Set(reviews.map((r) => r.userId)));

    const [doctors, users] = await Promise.all([
      doctorIds.length
        ? prisma.doctor.findMany({
            where: { id: { in: doctorIds } },
            select: { id: true, firstName: true, lastName: true },
          })
        : Promise.resolve([]),
      userIds.length
        ? prisma.patient.findMany({
            where: { id: { in: userIds } },
            select: { id: true, userName: true },
          })
        : Promise.resolve([]),
    ]);

    const doctorMap = new Map(
      doctors.map((d) => [
        d.id,
        `${d.firstName ?? ""} ${d.lastName ?? ""}`.trim(),
      ])
    );
    const userMap = new Map(users.map((u) => [u.id, u.userName]));

    // Shape for UI with graceful fallbacks
    const data = reviews.map((r) => ({
      id: r.id,
      doctorName: doctorMap.get(r.doctorId) || "Unknown Doctor",
      patientName: userMap.get(r.userId) || "Unknown User",
      comment: r.comment,
      createdAt: r.createdAt,
    }));

    return NextResponse.json({ data });
  } catch (e) {
    console.error("[hidden-reviews][GET]", e);
    return NextResponse.json(
      { error: "Failed to load reviews" },
      { status: 500 }
    );
  }
}
