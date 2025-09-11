// app/api/admin/metrics/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

function buildLast12MonthKeys(): { keys: string[]; start: Date } {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - 11, 1); // first day 11 months ago
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
    const startYM = start.getFullYear() * 100 + (start.getMonth() + 1); // e.g., 202508

    // ---- overall totals
    const [totalPatients, totalMedicalOpinions] = await Promise.all([
      prisma.patient.count(),
      prisma.medicalOpinion.count(),
    ]);

    // ---- patients per month (last 12) using numeric ym
    const patientsAggRaw: unknown = await prisma.patient.aggregateRaw({
      pipeline: [
        {
          $addFields: {
            ym: {
              $add: [
                { $multiply: [{ $year: "$createdAt" }, 100] },
                { $month: "$createdAt" },
              ],
            },
          },
        },
        { $match: { ym: { $gte: startYM } } },
        { $group: { _id: "$ym", count: { $sum: 1 } } },
        {
          $project: {
            _id: 0,
            y: { $floor: { $divide: ["$_id", 100] } },
            m: { $mod: ["$_id", 100] },
            count: 1,
          },
        },
        { $sort: { y: 1, m: 1 } },
      ],
    });

    type AggRow = { y: number; m: number; count: number };
    const patientsAgg: AggRow[] = Array.isArray(patientsAggRaw)
      ? (patientsAggRaw as Record<string, unknown>[]).map((r) => ({
          y: Number(r.y),
          m: Number(r.m),
          count: Number(r.count),
        }))
      : [];

    const patientMap = new Map<string, number>();
    for (const r of patientsAgg) {
      const key = `${r.y}-${String(r.m).padStart(2, "0")}`;
      patientMap.set(key, r.count);
    }
    const totalPatientsMonthly = keys.map((k) => patientMap.get(k) ?? 0);

    // ---- medical opinions per month (last 12) using numeric ym
    const opinionsAggRaw: unknown = await prisma.medicalOpinion.aggregateRaw({
      pipeline: [
        {
          $addFields: {
            ym: {
              $add: [
                { $multiply: [{ $year: "$createdAt" }, 100] },
                { $month: "$createdAt" },
              ],
            },
          },
        },
        { $match: { ym: { $gte: startYM } } },
        { $group: { _id: "$ym", count: { $sum: 1 } } },
        {
          $project: {
            _id: 0,
            y: { $floor: { $divide: ["$_id", 100] } },
            m: { $mod: ["$_id", 100] },
            count: 1,
          },
        },
        { $sort: { y: 1, m: 1 } },
      ],
    });

    const opinionsAgg: AggRow[] = Array.isArray(opinionsAggRaw)
      ? (opinionsAggRaw as Record<string, unknown>[]).map((r) => ({
          y: Number(r.y),
          m: Number(r.m),
          count: Number(r.count),
        }))
      : [];

    const opinionsMap = new Map<string, number>();
    for (const r of opinionsAgg) {
      const key = `${r.y}-${String(r.m).padStart(2, "0")}`;
      opinionsMap.set(key, r.count);
    }
    const totalMedicalOpinionsMonthly = keys.map(
      (k) => opinionsMap.get(k) ?? 0
    );

    return NextResponse.json({
      totalPatients,
      totalPatientsMonthly,
      totalMedicalOpinions,
      totalMedicalOpinionsMonthly,
      labels: keys,
    });
  } catch (e) {
    console.error("[metrics]", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
