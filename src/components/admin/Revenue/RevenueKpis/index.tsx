"use client";
import useSWR from "swr";
import { TrendingUp } from "lucide-react";

const fetcher = (u: string) => fetch(u).then((r) => r.json());
const money = (n: number, c = "CHF") =>
  new Intl.NumberFormat("en-CH", {
    style: "currency",
    currency: c,
    maximumFractionDigits: 0,
  }).format(n);

function Kpi({
  title,
  value,
  pct,
}: {
  title: string;
  value: string;
  pct: number;
}) {
  return (
    <div className="bg-[var(--secondary_skin)] p-5 md:p-6 border border-black/5 rounded-2xl">
      <div className="flex justify-between items-start">
        <div className="flex justify-center items-center bg-[var(--tertiary_skin)] rounded-full w-9 h-9">
          <TrendingUp className="w-4 h-4 text-[var(--black_secondary)]" />
        </div>
        <span className="bg-black/5 px-2 py-1 rounded-full text-[12px] text-black/70">
          {pct >= 0 ? "↑" : "↓"} {Math.abs(Math.round(pct))}%
        </span>
      </div>
      <div className="mt-4 text-[13px] text-secondary_black/70">{title}</div>
      <div className="mt-1 font-bold text-black_secondary text-2xl">
        {value}
      </div>
    </div>
  );
}

export default function RevenueKpis({ year }: { year?: number }) {
  const { data } = useSWR<{
    total: number;
    ownerCommission: number;
    doctorShare: number;
    momPct: number;
    currency?: string;
  }>(`/api/admin/revenue/summary${year ? `?year=${year}` : ""}`, fetcher);
  const c = data?.currency ?? "CHF";
  return (
    <div className="gap-4 md:gap-6 grid grid-cols-1 md:grid-cols-3">
      <Kpi
        title="Total Revenue"
        value={data ? money(data.total, c) : "—"}
        pct={data?.momPct ?? 0}
      />
      <Kpi
        title="Owners Commission"
        value={data ? money(data.ownerCommission, c) : "—"}
        pct={data?.momPct ?? 0}
      />
      <Kpi
        title="Doctor Payments"
        value={data ? money(data.doctorShare, c) : "—"}
        pct={data?.momPct ?? 0}
      />
    </div>
  );
}
