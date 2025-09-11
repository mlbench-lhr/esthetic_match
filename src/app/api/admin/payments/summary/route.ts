import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type MonthlyRow = { monthIndex: number; total: number };
const LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const toNumber = (v: unknown): number => {
  if (typeof v === "number") return Number.isFinite(v) ? v : 0;
  if (typeof v === "string") {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
};
const normalizeMonthly = (val: unknown): MonthlyRow[] =>
  Array.isArray(val)
    ? val
        .map((item): MonthlyRow => {
          const rec = (item ?? {}) as Record<string, unknown>;
          return {
            monthIndex: toNumber(rec["monthIndex"]),
            total: toNumber(rec["total"]),
          };
        })
        .filter((r) => r.monthIndex >= 0 && r.monthIndex < 12)
    : [];

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const year = Number(searchParams.get("year") ?? new Date().getFullYear());

    // Transactions: completed (case-insensitive), same calendar year
    const txRaw: unknown = await prisma.transactionHistory.aggregateRaw({
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $eq: [{ $year: "$createdAt" }, year] },
                { $eq: [{ $toLower: "$status" }, "completed"] },
              ],
            },
          },
        },
        {
          $group: {
            _id: { m: { $month: "$createdAt" } },
            total: { $sum: { $toDouble: "$amount" } },
          },
        },
        {
          $project: {
            _id: 0,
            monthIndex: { $subtract: ["$_id.m", 1] },
            total: 1,
          },
        },
      ],
    });

    // Subscription histories: same year
    const subRaw: unknown = await prisma.subscriptionHistory.aggregateRaw({
      pipeline: [
        { $match: { $expr: { $eq: [{ $year: "$createdAt" }, year] } } },
        {
          $group: {
            _id: { m: { $month: "$createdAt" } },
            total: { $sum: { $toDouble: "$amount" } },
          },
        },
        {
          $project: {
            _id: 0,
            monthIndex: { $subtract: ["$_id.m", 1] },
            total: 1,
          },
        },
      ],
    });

    const txMonthly = normalizeMonthly(txRaw);
    const subMonthly = normalizeMonthly(subRaw);

    const monthly = Array.from({ length: 12 }, () => 0);
    for (const r of txMonthly) monthly[r.monthIndex] += r.total;
    for (const r of subMonthly) monthly[r.monthIndex] += r.total;

    const total = monthly.reduce((a, b) => a + b, 0);
    const now = new Date();
    const idxNow = now.getFullYear() === year ? now.getMonth() : 11;
    const idxPrev = (idxNow + 11) % 12;
    const mom =
      monthly[idxPrev] === 0
        ? monthly[idxNow] > 0
          ? 100
          : 0
        : ((monthly[idxNow] - monthly[idxPrev]) / monthly[idxPrev]) * 100;

    return NextResponse.json({
      labels: LABELS,
      data: monthly,
      total,
      monthOverMonthPct: Number(mom.toFixed(2)),
      currency: "CHF",
      year,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
