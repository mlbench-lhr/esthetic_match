import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const year = Number(searchParams.get("year") ?? new Date().getFullYear());

    const start = new Date(year, 0, 1);
    const end = new Date(year + 1, 0, 1);

    // All completed transactions (no doctorId filter)
    const txMonthly = (await prisma.transactionHistory.aggregateRaw({
      pipeline: [
        {
          $match: { status: "completed", createdAt: { $gte: start, $lt: end } },
        },
        {
          $group: {
            _id: { m: { $month: "$createdAt" } },
            total: { $sum: "$amount" },
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
    })) as unknown as Array<{ monthIndex: number; total: number }>;

    // All subscription top-ups (no doctorId filter)
    const subMonthly = (await prisma.subscriptionHistory.aggregateRaw({
      pipeline: [
        { $match: { createdAt: { $gte: start, $lt: end } } },
        {
          $group: {
            _id: { m: { $month: "$createdAt" } },
            total: { $sum: "$amount" },
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
    })) as unknown as Array<{ monthIndex: number; total: number }>;

    // Merge into 12 months
    const monthly = Array.from({ length: 12 }, () => 0);
    for (const r of txMonthly) monthly[r.monthIndex] += r.total ?? 0;
    for (const r of subMonthly) monthly[r.monthIndex] += r.total ?? 0;

    const total = monthly.reduce((a, b) => a + b, 0);

    // Month-over-month (%), using current month of requested year
    const now = new Date();
    const idxNow = now.getFullYear() === year ? now.getMonth() : 11;
    const idxPrev = (idxNow + 11) % 12;
    const current = monthly[idxNow] ?? 0;
    const previous = monthly[idxPrev] ?? 0;
    const mom =
      previous === 0
        ? current > 0
          ? 100
          : 0
        : ((current - previous) / previous) * 100;

    return NextResponse.json({
      labels: LABELS,
      data: monthly,
      total,
      monthOverMonthPct: Number(mom.toFixed(2)),
      currency: "USD",
      year,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
