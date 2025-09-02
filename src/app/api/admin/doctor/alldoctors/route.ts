// app/api/admin/doctor/alldoctors/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Minimal where type to satisfy TS without depending on Prisma namespace types
type StringFilter = { contains?: string };
type DoctorWhere = {
  OR?: Array<
    | { firstName?: StringFilter }
    | { lastName?: StringFilter }
    | { email?: StringFilter }
    | { clinicName?: StringFilter }
  >;
  verified?: number;
};
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Math.max(parseInt(searchParams.get("page") || "1", 10), 1);
    const pageSize = Math.min(
      Math.max(parseInt(searchParams.get("pageSize") || "10", 10), 1),
      100
    );
    const search = (searchParams.get("search") || "").trim();
    const verified = searchParams.get("verified"); // "0" | "1" | null

    const where: DoctorWhere = {};
    if (search) {
      where.OR = [
        { firstName: { contains: search } },
        { lastName: { contains: search } },
        { email: { contains: search } },
        { clinicName: { contains: search } },
      ];
    }
    if (verified === "0" || verified === "1") {
      where.verified = parseInt(verified, 10);
    }

    const [total, data] = await Promise.all([
      prisma.doctor.count({ where }),
      prisma.doctor.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
        // select the fields you display in the table
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          image: true,
          clinicName: true,
          createdAt: true,
          clicks: true,
          verified: true,
        },
      }),
    ]);

    return NextResponse.json({ data, total, page, pageSize });
  } catch (e) {
    console.error("[GET /api/doctors]", e);
    return NextResponse.json(
      { error: "Failed to load doctors" },
      { status: 500 }
    );
  }
}
