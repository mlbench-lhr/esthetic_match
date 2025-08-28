import DemographicCard from "@/components/admin/Dashboard/DemographicCard";
import { EcommerceMetrics } from "@/components/admin/Dashboard/EcommerceMetrics";
import MonthlySalesChart from "@/components/admin/Dashboard/MonthlySalesChart";
import MonthlyTarget from "@/components/admin/Dashboard/MonthlyTarget";
import RecentOrders from "@/components/admin/Dashboard/RecentOrders";
import StatisticsChart from "@/components/admin/Dashboard/StatisticsChart";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Ecommerce() {
  return (
    <div className="gap-4 md:gap-6 grid grid-cols-12">
      <div className="space-y-6 col-span-12 xl:col-span-7">
        <EcommerceMetrics />

        <MonthlySalesChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget />
      </div>

      <div className="col-span-12">
        <StatisticsChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <DemographicCard />
      </div>

      <div className="col-span-12 xl:col-span-7">
        <RecentOrders />
      </div>
    </div>
  );
}
