"use client";
import React from "react";
import Badge from "@/components/ui/badge/Badge";
import { ArrowDownIcon, ArrowUpIcon, Box, Users } from "lucide-react";

export const EcommerceMetrics = () => {
  return (
    <div className="gap-4 md:gap-6 grid grid-cols-1 sm:grid-cols-2">
      {/* <!-- Metric Item Start --> */}
      <div className="bg-[#F6F1EB] p-5 md:p-6 border border-gray-200 dark:border-gray-800 rounded-2xl">
        <div className="flex justify-center items-center bg-gray-100 rounded-full w-12 h-12">
          <Users className="size-6 text-gray-800" />
        </div>

        <div className="flex justify-between items-end mt-5">
          <div>
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              Customers
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              3,782
            </h4>
          </div>
          <Badge color="success">
            <ArrowUpIcon />
            11.01%
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="bg-white dark:bg-white/[0.03] p-5 md:p-6 border border-gray-200 dark:border-gray-800 rounded-2xl">
        <div className="flex justify-center items-center bg-gray-100 rounded-full w-12 h-12">
          <Box className="text-gray-800" />
        </div>
        <div className="flex justify-between items-end mt-5">
          <div>
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              Orders
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              5,359
            </h4>
          </div>

          <Badge color="error">
            <ArrowDownIcon className="text-error-500" />
            9.05%
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
};
