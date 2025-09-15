import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Row = { monthIndex: number; total: number };
const MONTHS = [
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

const DOCTOR_TX_RATE = Number(process.env.DOCTOR_TX_RATE ?? 0.7); // 70% of transactions to doctors
const OWNER_TX_RATE = 1 - DOCTOR_TX_RATE; // 30% of transactions to owner

const asRows = (val: unknown): Row[] =>
  Array.isArray(val)
    ? val.map((r) => {
        const o = (r ?? {}) as Record<string, unknown>;
        return {
          monthIndex: Number(o.monthIndex ?? 0),
          total: Number(o.total ?? 0),
        };
      })
    : [];

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const year = Number(searchParams.get("year") ?? new Date().getFullYear());

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

    const tx = asRows(txRaw);
    const subs = asRows(subRaw);

    const txMonthly = Array.from({ length: 12 }, () => 0);
    const subsMonthly = Array.from({ length: 12 }, () => 0);
    for (const r of tx) txMonthly[r.monthIndex] += r.total;
    for (const r of subs) subsMonthly[r.monthIndex] += r.total;

    const monthlyDoctor = txMonthly.map((v) => Math.round(v * DOCTOR_TX_RATE));
    const monthlyOwner = txMonthly
      .map((v) => Math.round(v * OWNER_TX_RATE))
      .map((v, i) => v + subsMonthly[i]); // add subscriptions 100% to owner
    const monthlyTotal = txMonthly.map((v, i) => v + subsMonthly[i]);

    // const txTotal = txMonthly.reduce((a, b) => a + b, 0);
    // const subsTotal = subsMonthly.reduce((a, b) => a + b, 0);
    const doctorShare = monthlyDoctor.reduce((a, b) => a + b, 0);
    const ownerCommission = monthlyOwner.reduce((a, b) => a + b, 0);
    const total = monthlyTotal.reduce((a, b) => a + b, 0);

    // MoM based on total revenue
    const now = new Date();
    const idxNow = now.getFullYear() === year ? now.getMonth() : 11;
    const idxPrev = (idxNow + 11) % 12;
    const prev = monthlyTotal[idxPrev] ?? 0;
    const curr = monthlyTotal[idxNow] ?? 0;
    const momPct =
      prev === 0 ? (curr > 0 ? 100 : 0) : ((curr - prev) / prev) * 100;

    // effective rates (for showing % in labels if you want)
    const ownerEffectiveRate = total === 0 ? 0 : ownerCommission / total;
    const doctorEffectiveRate = total === 0 ? 0 : doctorShare / total;

    return NextResponse.json({
      labels: MONTHS,

      // what your current UI uses
      monthly: monthlyTotal,
      total,
      ownerCommission,
      doctorShare,
      momPct: Number(momPct.toFixed(2)),
      currency: "CHF",
      year,

      // extra breakdowns (useful if you want separate charts later)
      monthlyDoctor,
      monthlyOwner,
      txMonthly,
      subsMonthly,
      rates: {
        doctorTxRate: DOCTOR_TX_RATE,
        ownerTxRate: OWNER_TX_RATE,
        effective: {
          owner: Number((ownerEffectiveRate * 100).toFixed(2)),
          doctor: Number((doctorEffectiveRate * 100).toFixed(2)),
        },
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
