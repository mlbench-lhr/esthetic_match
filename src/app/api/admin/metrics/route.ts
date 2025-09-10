import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

function buildLast12MonthKeys(): { keys: string[]; start: Date } {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - 11, 1);
  const keys: string[] = [];
  for (let i = 0; i < 12; i++) {
    const d = new Date(start.getFullYear(), start.getMonth() + i, 1);
    const y = d.getFullYear();
    const m = (d.getMonth() + 1).toString().padStart(2, "0");
    keys.push(`${y}-${m}`);
  }
  return { keys, start };
}

export async function GET(req: NextRequest) {
  try {
    const auth = req.headers.get("authorization") || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7).trim() : null;
    const decoded = token
      ? (verifyToken(token) as { id?: string } | null)
      : null;
    if (!decoded?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { keys, start } = buildLast12MonthKeys();

    // Totals (overall)
    const [totalPatients, totalMedicalOpinions] = await Promise.all([
      prisma.patient.count(),
      prisma.medicalOpinion.count(),
    ]);

    // Monthly patients counts (last 12 months)
    const patientsAgg = (await prisma.patient.aggregateRaw({
      pipeline: [
        { $match: { createdAt: { $gte: start } } },
        {
          $group: {
            _id: { y: { $year: "$createdAt" }, m: { $month: "$createdAt" } },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.y": 1, "_id.m": 1 } },
      ],
    })) as unknown as Array<{ _id: { y: number; m: number }; count: number }>;

    const patientMap = new Map<string, number>();
    for (const r of patientsAgg) {
      const key = `${r._id.y}-${String(r._id.m).padStart(2, "0")}`;
      patientMap.set(key, r.count);
    }
    const patientsMonthly = keys.map((k) => patientMap.get(k) ?? 0);

    // Monthly medical opinions counts (last 12 months)
    const opinionsAgg = (await prisma.medicalOpinion.aggregateRaw({
      pipeline: [
        { $match: { createdAt: { $gte: start } } },
        {
          $group: {
            _id: { y: { $year: "$createdAt" }, m: { $month: "$createdAt" } },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.y": 1, "_id.m": 1 } },
      ],
    })) as unknown as Array<{ _id: { y: number; m: number }; count: number }>;

    const opinionsMap = new Map<string, number>();
    for (const r of opinionsAgg) {
      const key = `${r._id.y}-${String(r._id.m).padStart(2, "0")}`;
      opinionsMap.set(key, r.count);
    }
    const medicalOpinionsMonthly = keys.map((k) => opinionsMap.get(k) ?? 0);

    return NextResponse.json({
      totalPatients,
      totalPatientsMonthly: patientsMonthly,
      totalMedicalOpinions,
      totalMedicalOpinionsMonthly: medicalOpinionsMonthly,
      labels: keys,
    });
  } catch (e) {
    console.error("[metrics]", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
