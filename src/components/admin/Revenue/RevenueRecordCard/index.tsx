"use client";
import { CalendarDays, CreditCard } from "lucide-react";

const money = (n: number, c = "CHF") =>
  new Intl.NumberFormat("en-CH", {
    style: "currency",
    currency: c,
    maximumFractionDigits: 0,
  }).format(n);

export type RevenueRecord = {
  seq: number; // display number like #001
  id: string;
  amount: number;
  status: "completed" | "incompleted" | string;
  createdAt: string;
  doctor: { name: string; image: string | null };
  ownerShare: number;
  doctorShare: number;
};

export default function RevenueRecordCard({
  rec,
  currency = "CHF",
}: {
  rec: RevenueRecord;
  currency?: string;
}) {
  const badge =
    rec.status === "completed"
      ? { text: "Paid", bg: "bg-emerald-100", fg: "text-emerald-700" }
      : { text: "Unpaid", bg: "bg-rose-100", fg: "text-rose-700" };

  const idText = `#${String(rec.seq).padStart(3, "0")}`;
  const dt = new Date(rec.createdAt);
  const dateStr = dt.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  const initials = rec.doctor.name
    .split(" ")
    .map((s) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="bg-[var(--secondary_skin)] p-5 border border-black/10 rounded-2xl">
      <div className="flex items-center gap-2">
        <span className="bg-black/10 px-2 py-1 rounded-md font-semibold text-black/70 text-xs">
          {idText}
        </span>
        <span className="text-secondary_black/60 text-xs">Appointment</span>
        <span
          className={`ml-auto text-xs px-2 py-1 rounded-full ${badge.bg} ${badge.fg}`}
        >
          {badge.text}
        </span>
      </div>

      <div className="space-y-4 mt-4">
        {/* doctor */}
        <div className="flex items-center gap-3">
          <div className="flex justify-center items-center bg-[#0f1f33] rounded-full w-9 h-9 text-white text-sm">
            {initials}
          </div>
          <div>
            <div className="font-medium text-black_secondary">
              {rec.doctor.name}
            </div>
            <div className="text-secondary_black/60 text-xs">Doctor</div>
          </div>
        </div>

        {/* date & method */}
        <div className="flex items-center gap-4 text-secondary_black/70 text-sm">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4" /> {dateStr}
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <CreditCard className="w-4 h-4" /> Card
          </div>
        </div>

        {/* amount */}
        <div className="flex justify-between items-center">
          <div className="text-secondary_black/60 text-sm">Total Amount</div>
          <div className="font-semibold text-black_secondary text-lg">
            {money(rec.amount, currency)}
          </div>
        </div>

        {/* split */}
        <div className="gap-3 grid grid-cols-2 bg-[#0f1f33] mt-2 p-3 rounded-xl text-white">
          <div>
            <div className="opacity-80 text-xs">
              Owner ( {Math.round(100 * (rec.ownerShare / rec.amount))}% )
            </div>
            <div className="font-semibold">
              {money(rec.ownerShare, currency)}
            </div>
          </div>
          <div>
            <div className="opacity-80 text-xs">
              Doctor ( {Math.round(100 * (rec.doctorShare / rec.amount))}% )
            </div>
            <div className="font-semibold">
              {money(rec.doctorShare, currency)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
