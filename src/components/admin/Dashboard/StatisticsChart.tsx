"use client";
import dynamic from "next/dynamic";
import useSWR from "swr";
import { useMemo } from "react";
import type { ApexOptions } from "apexcharts";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

// ✅ add a fetcher (or set one globally via <SWRConfig> in layout)
const fetcher = (url: string) => fetch(url).then((r) => r.json());

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

type Api = {
  labels: string[];
  data: number[];
  total: number;
  monthOverMonthPct: number;
  year: number;
  currency?: string;
};

export default function PaymentsReceivedChart({ year }: { year?: number }) {
  const { data } = useSWR<Api>(
    `/api/admin/payments/summary${year ? `?year=${year}` : ""}`,
    fetcher, // 👈 use the fetcher
    { revalidateOnFocus: false } // optional: avoid refetch on tab focus
  );

  const currency = data?.currency ?? "CHF";
  const money = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(n);

  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        type: "area",
        height: 310,
        toolbar: { show: false },
        fontFamily: "Outfit, sans-serif",
      },
      colors: ["#F97316"],
      stroke: { curve: "smooth", width: 2 },
      dataLabels: { enabled: false },
      fill: {
        type: "gradient",
        gradient: { opacityFrom: 0.5, opacityTo: 0, stops: [0, 90, 100] },
      },
      grid: {
        borderColor: "#e5e7eb",
        strokeDashArray: 4,
        yaxis: { lines: { show: true } },
        xaxis: { lines: { show: false } },
      },
      xaxis: {
        categories: data?.labels ?? MONTHS, // 👈 fallback labels
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { style: { fontSize: "12px", colors: "#9ca3af" } },
        tooltip: { enabled: false },
      },
      yaxis: {
        labels: {
          formatter: (v) =>
            v >= 1000
              ? `${currency}${Math.round(v / 1000)}k`
              : `${currency}${v}`,
          style: { fontSize: "12px", colors: ["#9ca3af"] },
        },
      },
      tooltip: { y: { formatter: (v) => money(v) } },
      legend: { show: false },
    }),
    [data?.labels, currency]
  );

  const series = useMemo(
    () => [{ name: "Payments", data: data?.data ?? Array(12).fill(0) }],
    [data?.data]
  );

  return (
    <div className="bg-[#FBF7F3] px-5 sm:px-6 pt-5 sm:pt-6 pb-5 border border-gray-200 rounded-2xl">
      <div className="flex sm:flex-row flex-col sm:justify-between gap-5 mb-6">
        <div className="w-full">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-slate-800 text-lg">
              Payment Received
            </h3>
            <div className="flex items-center gap-3">
              <div className="font-semibold text-slate-900">
                {data ? money(data.total) : "—"}
              </div>
              {data && (
                <span className="bg-slate-900/5 px-2 py-1 rounded-full text-slate-700 text-xs">
                  {data.monthOverMonthPct >= 0 ? "+" : ""}
                  {Math.round(data.monthOverMonthPct)}%
                </span>
              )}
            </div>
          </div>
          <p className="mt-1 text-gray-500 text-theme-sm">
            Year {data?.year ?? new Date().getFullYear()}
          </p>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[1000px] xl:min-w-full">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={310}
          />
        </div>
      </div>
    </div>
  );
}
