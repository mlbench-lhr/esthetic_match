// app/api/admin/revenue/records/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

const DOCTOR_TX_RATE = Number(process.env.DOCTOR_TX_RATE ?? 0.7);
const OWNER_TX_RATE = 1 - DOCTOR_TX_RATE;

// ------- small helpers (no any) -------
const asArray = (v: unknown): ReadonlyArray<unknown> =>
  Array.isArray(v) ? v : [];

const num = (v: unknown, d = 0): number => {
  if (typeof v === "number") return Number.isFinite(v) ? v : d;
  if (typeof v === "string") {
    const n = Number(v);
    return Number.isFinite(n) ? n : d;
  }
  return d;
};
const str = (v: unknown, d = ""): string => (typeof v === "string" ? v : d);
const obj = (v: unknown): Record<string, unknown> =>
  v && typeof v === "object" ? (v as Record<string, unknown>) : {};

export async function GET(req: NextRequest) {
  try {
    // ---- auth ----
    const auth = req.headers.get("authorization") || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7).trim() : null;
    const decoded = token
      ? (verifyToken(token) as { id?: string } | null)
      : null;
    if (!decoded?.id)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // ---- query params ----
    const { searchParams } = new URL(req.url);
    const page = Math.max(1, Number(searchParams.get("page") ?? 1));
    const pageSize = Math.min(
      50,
      Math.max(1, Number(searchParams.get("pageSize") ?? 9))
    );
    const skip = (page - 1) * pageSize;

    // only completed consultation fees
    const matchStage = {
      $expr: {
        $and: [
          { $eq: [{ $toLower: "$status" }, "completed"] },
          { $eq: ["$type", "consultation_fee"] },
        ],
      },
    };

    // ---- total count (typed) ----
    const countRaw: unknown = await prisma.transactionHistory.aggregateRaw({
      pipeline: [{ $match: matchStage }, { $count: "total" }],
    });
    let total = 0;
    const countArr = asArray(countRaw);
    if (countArr.length > 0) {
      const first = obj(countArr[0]);
      total = num(first["total"], 0);
    }

    // ---- page data (typed) ----
    const itemsRaw: unknown = await prisma.transactionHistory.aggregateRaw({
      pipeline: [
        { $match: matchStage },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: pageSize },
        {
          $lookup: {
            from: "doctors",
            localField: "doctorId",
            foreignField: "_id",
            as: "doctor",
          },
        },
        { $unwind: { path: "$doctor", preserveNullAndEmptyArrays: true } },
        {
          $project: {
            _id: 1,
            amount: { $toDouble: "$amount" },
            status: 1,
            type: 1,
            createdAt: 1,
            doctor: {
              firstName: "$doctor.firstName",
              lastName: "$doctor.lastName",
              image: "$doctor.image",
            },
          },
        },
      ],
    });

    const rows = asArray(itemsRaw).map(obj);

    const items = rows.map((r) => {
      const id = str(r["_id"]);
      const amount = num(r["amount"]);
      const status = str(r["status"]).toLowerCase();
      const type = str(r["type"]);
      const createdAt = String(r["createdAt"] ?? "");
      const d = obj(r["doctor"]);
      const doctorName =
        [str(d["firstName"]), str(d["lastName"])].filter(Boolean).join(" ") ||
        "Doctor";
      const doctorImage = str(d["image"]) || null;

      const ownerShare = Math.round(amount * OWNER_TX_RATE);
      const doctorShare = amount - ownerShare;

      return {
        id,
        amount,
        status,
        type,
        createdAt,
        doctor: { name: doctorName, image: doctorImage },
        ownerShare,
        doctorShare,
      };
    });

    return NextResponse.json({
      page,
      pageSize,
      total,
      pages: Math.ceil(total / pageSize),
      items,
      currency: "CHF",
      rates: { owner: OWNER_TX_RATE, doctor: DOCTOR_TX_RATE },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
