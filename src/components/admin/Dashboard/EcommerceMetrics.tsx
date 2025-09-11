"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Users, UserSquare2, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

/** Simple sparkline (no external libs). Stroke uses currentColor. */
function Sparkline({ points }: { points: number[] }) {
  const w = 180;
  const h = 48;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = Math.max(1, max - min);
  const stepX = w / (points.length - 1);

  const d = points
    .map((p, i) => {
      const x = i * stepX;
      const y = h - ((p - min) / range) * h;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="block">
      <path
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StatCard({
  icon,
  title,
  value,
  sinceLabel = "Since Last Month",
  trend,
  trendColorVar,
  lineColorVar,
  points,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  sinceLabel?: string;
  trend: string;
  trendColorVar: string;
  lineColorVar: string;
  points: number[];
}) {
  return (
    <div
      className="flex justify-between items-center p-5 md:p-6 border rounded-2xl"
      style={{
        background: "var(--secondary_skin)",
        borderColor: "rgba(0,0,0,0.06)",
      }}
    >
      {/* LEFT: icon + text */}
      <div>
        <div
          className="flex justify-center items-center rounded-full w-10 h-10"
          style={{ background: "var(--tertiary_skin)" }}
        >
          <div className="text-secondary">{icon}</div>
        </div>

        <div className="mt-4">
          <div className="text-[13px] text-secondary_black/70">{title}</div>
          <div className="mt-1 font-bold text-black_secondary text-2xl">
            {value}
          </div>
          <div className="mt-1 text-[12px] text-secondary_black/50">
            {sinceLabel}
          </div>
        </div>
      </div>

      {/* RIGHT: sparkline + trend (fixed width, aligned right) */}
      <div className="flex flex-col justify-center items-end ml-auto min-w-[140px] sm:min-w-[180px]">
        <div
          className="w-[140px] sm:w-[180px] h-14 overflow-hidden"
          style={{ color: lineColorVar }}
        >
          <Sparkline points={points && points.length ? points : [0]} />
        </div>

        <div
          className="flex items-center gap-1 mt-2 text-sm"
          style={{ color: trendColorVar }}
        >
          {trendColorVar === "var(--green)" ? (
            <ArrowUpRight className="w-4 h-4" />
          ) : (
            <ArrowDownRight className="w-4 h-4" />
          )}
          {trend}
        </div>
      </div>
    </div>
  );
}

export const EcommerceMetrics = () => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{
    totalPatients: number;
    totalPatientsMonthly: number[];
    totalMedicalOpinions: number;
    totalMedicalOpinionsMonthly: number[];
    labels: string[];
  } | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    async function load() {
      if (!token) {
        setErr("Not authorized");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const res = await fetch("/api/admin/metrics", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || "Failed to load metrics");
        if (active) setData(json);
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Failed to load metrics";
        if (active) setErr(msg);
      } finally {
        if (active) setLoading(false);
      }
    }
    load();
    return () => {
      active = false;
    };
  }, [token]);

  function computeMoMTrend(arr: number[] | undefined): {
    pct: string;
    up: boolean;
  } {
    if (!arr || arr.length < 2) return { pct: "0%", up: true };
    const prev = arr[arr.length - 2] ?? 0;
    const curr = arr[arr.length - 1] ?? 0;
    let pctNum: number;
    if (prev === 0) {
      // Business rule: when previous month is 0, show current * 100%
      pctNum = curr === 0 ? 0 : curr * 100;
    } else {
      pctNum = ((curr - prev) / prev) * 100;
    }
    const pctRounded = Math.round(pctNum);
    return { pct: `${pctRounded}%`, up: pctRounded >= 0 };
  }

  const patientsTrend = useMemo(
    () => computeMoMTrend(data?.totalPatientsMonthly),
    [data]
  );
  const opinionsTrend = useMemo(
    () => computeMoMTrend(data?.totalMedicalOpinionsMonthly),
    [data]
  );

  if (loading) {
    return (
      <div className="text-secondary_black/70 text-sm">Loading metrics…</div>
    );
  }
  if (err || !data) {
    return (
      <div className="text-red-600 text-sm">{err || "Failed to load"}</div>
    );
  }

  return (
    <div className="gap-4 md:gap-6 grid grid-cols-1 sm:grid-cols-2">
      <StatCard
        icon={<Users className="w-5 h-5" />}
        title="Total Patients"
        value={data.totalPatients}
        trend={patientsTrend.pct}
        trendColorVar={patientsTrend.up ? "var(--green)" : "var(--red)"}
        lineColorVar="var(--secondary)"
        points={data.totalPatientsMonthly}
      />

      <StatCard
        icon={<UserSquare2 className="w-5 h-5" />}
        title="Requested Medical Opinions"
        value={data.totalMedicalOpinions}
        trend={opinionsTrend.pct}
        trendColorVar={opinionsTrend.up ? "var(--green)" : "var(--red)"}
        lineColorVar="var(--black_secondary)"
        points={data.totalMedicalOpinionsMonthly}
      />
    </div>
  );
};
