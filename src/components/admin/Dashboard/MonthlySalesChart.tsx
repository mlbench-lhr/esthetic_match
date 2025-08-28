"use client";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import { EllipsisVertical } from "lucide-react";

// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function MonthlySalesChart() {
  const options: ApexOptions = {
    colors: ["#465fff"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 180,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "39%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
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
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",
    },
    yaxis: {
      title: {
        text: undefined,
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    fill: {
      opacity: 1,
    },

    tooltip: {
      x: {
        show: false,
      },
      y: {
        formatter: (val: number) => `${val}`,
      },
    },
  };
  const series = [
    {
      name: "Sales",
      data: [168, 385, 201, 298, 187, 195, 291, 110, 215, 390, 280, 112],
    },
  ];
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div className="bg-white dark:bg-white/[0.03] px-5 sm:px-6 pt-5 sm:pt-6 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-800 dark:text-white/90 text-lg">
          Monthly Sales
        </h3>

        <div className="inline-block relative">
          <button onClick={toggleDropdown} className="dropdown-toggle">
            {/* <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" /> */}
            <EllipsisVertical />
          </button>
          <Dropdown
            isOpen={isOpen}
            onClose={closeDropdown}
            className="p-2 w-40"
          >
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg w-full font-normal text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 dark:text-gray-400 text-left"
            >
              View More
            </DropdownItem>
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg w-full font-normal text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 dark:text-gray-400 text-left"
            >
              Delete
            </DropdownItem>
          </Dropdown>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="-ml-5 pl-2 min-w-[650px] xl:min-w-full">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={180}
          />
        </div>
      </div>
    </div>
  );
}
