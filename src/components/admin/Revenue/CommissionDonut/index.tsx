"use client";
import dynamic from "next/dynamic";
import useSWR from "swr";
import type { ApexOptions } from "apexcharts";
import { useMemo } from "react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
const fetcher = (u: string) => fetch(u).then((r) => r.json());
const money = (n: number, c = "CHF") =>
  new Intl.NumberFormat("en-CH", {
    style: "currency",
    currency: c,
    maximumFractionDigits: 0,
  }).format(n);

export default function CommissionDonut({ year }: { year?: number }) {
  const { data } = useSWR<{
    ownerRate: number;
    ownerCommission: number;
    doctorShare: number;
    currency?: string;
  }>(`/api/admin/revenue/summary${year ? `?year=${year}` : ""}`, fetcher);
  const c = data?.currency ?? "CHF";

  const series = [data?.ownerCommission ?? 0, data?.doctorShare ?? 0];

  const options: ApexOptions = useMemo(
    () => ({
      chart: { type: "donut", height: 320 },
      labels: ["Owner Commission", "Doctor's Share"],
      //   legend: { show: false },
      legend: { position: "bottom" },
      colors: ["#F5DCCF", "#0f1f33"],
      dataLabels: { enabled: false },

      // ✅ make tooltip text white
      tooltip: {
        theme: "light",
        style: { fontSize: "12px", color: "#fff" },
        fillSeriesColor: false,
        y: { formatter: (v) => money(v, c) },
      },
    }),
    [c]
  );

  return (
    <div className="bg-secondary_skin p-5 md:p-6 border border-black/5 rounded-2xl h-full xl:min-h-[350px]">
      <div className="mb-2 font-semibold text-black_secondary text-2xl">
        Commission Distribution
      </div>
      <div className="flex-1 xl:pt-4 h-full max-h-[320px]">
        <ReactApexChart
          type="donut"
          // height={320}
          options={options}
          series={series}
          height="100%"
        />
      </div>
      <div className="gap-4 grid grid-cols-2 mt-8 text-secondary_black/80 text-sm">
        <div>
          Owner Commission: <b>{money(series[0], c)}</b>
        </div>
        <div>
          Doctor’s Share (70% - patient transactions):{" "}
          <b>{money(series[1], c)}</b>
        </div>
      </div>
    </div>
  );
}
