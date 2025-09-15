"use client";
import dynamic from "next/dynamic";
import useSWR from "swr";
import type { ApexOptions } from "apexcharts";
import { useMemo } from "react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
const fetcher = (u: string) => fetch(u).then((r) => r.json());

export default function RevenueBar({ year }: { year?: number }) {
  const { data } = useSWR<{ labels: string[]; monthly: number[] }>(
    `/api/admin/revenue/summary${year ? `?year=${year}` : ""}`,
    fetcher
  );

  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        type: "bar",
        height: 320,
        toolbar: { show: false },
        fontFamily: "Outfit, sans-serif",
      },
      plotOptions: { bar: { columnWidth: "45%", borderRadius: 6 } },
      dataLabels: { enabled: false },
      grid: { borderColor: "#eee", strokeDashArray: 4 },
      xaxis: {
        categories: data?.labels ?? [],
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        labels: {
          formatter: (v) => (v >= 1000 ? `${Math.round(v / 1000)}k` : `${v}`),
        },
      },
      colors: ["#0f1f33"], // deep navy
    }),
    [data?.labels]
  );

  return (
    <div className="bg-secondary_skin p-5 md:p-6 border border-black/5 rounded-2xl h-full xl:min-h-[350px]">
      <div className="mb-2 font-semibold text-black_secondary text-2xl">
        Revenue
      </div>
      <div className="flex-1 h-full min-h-[320px]">
        <ReactApexChart
          type="bar"
          //   height={320}
          options={options}
          series={[{ name: "Revenue", data: data?.monthly ?? [] }]}
          height="100%"
        />
      </div>
    </div>
  );
}
