"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Image from "next/image";
import Link from "next/link";
import { Pagination } from "antd";
import { useRouter, useSearchParams } from "next/navigation";

export type PatientRow = {
  id: string;
  name: string; // userName
  email: string;
  image?: string | null;
  createdAt: string;
  appointments: number; // count of medical opinions
};

const dateFmt = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
  timeZone: "UTC",
});

export default function PatientTable({
  rows,
  total,
  page,
  pageSize,
  onPageChange,
}: {
  rows: PatientRow[];
  total: number;
  page: number;
  pageSize: number;
  onPageChange?: (p: number) => void;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (p: number) => {
    if (onPageChange) return onPageChange(p);
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("page", String(p));
    params.set("pageSize", String(pageSize));
    router.push(`?${params.toString()}`);
  };

  if (total === 0) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <Image
            src="/images/admin/noimage.svg"
            alt="No Patients Added Yet"
            width={300}
            height={150}
            className="opacity-80 mx-auto mb-6 w-auto h-40"
          />
          <p className="text-gray-600 text-base">No Patients Added Yet!!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.05] rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-white/[0.05] border-b">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-theme-xs text-start"
              >
                Patient Name
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-theme-xs text-start"
              >
                Email Address
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-theme-xs text-start"
              >
                Added On
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-theme-xs text-start"
              >
                Appointments
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-theme-xs text-start"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {rows.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="px-5 sm:px-6 py-4 text-start">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full w-10 h-10 overflow-hidden">
                      <Image
                        width={40}
                        height={40}
                        src={p.image || "/images/user/user-17.jpg"}
                        alt={p.name}
                      />
                    </div>
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm">
                        {p.name}
                      </span>
                      <span className="block text-gray-500 text-theme-xs">
                        #{p.id.slice(-5)}
                      </span>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm text-start">
                  {p.email}
                </TableCell>

                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm text-start">
                  {dateFmt.format(new Date(p.createdAt))}
                </TableCell>

                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm text-start">
                  {p.appointments.toString().padStart(2, "0")}
                </TableCell>

                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm text-start">
                  <Link
                    href={`/admin/allpatients/${p.id}`}
                    className="underline"
                  >
                    View Details
                  </Link>
                </TableCell>
              </TableRow>
            ))}

            {rows.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="px-5 py-10 text-gray-500 text-theme-sm text-center"
                >
                  No Patients
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end p-4">
        <Pagination
          align="end"
          current={page}
          defaultCurrent={1}
          total={total}
          pageSize={pageSize}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
}
