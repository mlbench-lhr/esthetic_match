"use client";

import { Pagination } from "antd";
import Text from "@/components/ui/TextUser";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { cn } from "@/utils";
import type { PatientBookingRow as BookingRow } from "@/lib/data/patients";

export default function PatientBookings({
  rows,
  total,
  page,
  pageSize,
  onPageChange,
}: {
  rows: BookingRow[];
  total: number;
  page: number;
  pageSize: number;
  onPageChange?: (p: number) => void;
}) {
  const handlePageChange = (p: number) => onPageChange?.(p);

  return (
    <section className="bg-tertiary_skin p-4 sm:p-5 md:p-6 border border-secondary_skin rounded-3xl w-full">
      {/* Header (simple, no tabs) */}
      <div className={cn("pb-2 border-secondary_skin border-b")}>
        <Text as="h4" className="text-primary_black">
          Booking History
        </Text>
      </div>

      {/* Table */}
      <div className="pt-4 sm:pt-5">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="border-secondary_skin border-b">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-4 py-3 text-primary_black text-theme-xs"
                >
                  Type
                </TableCell>
                <TableCell
                  isHeader
                  className="px-4 py-3 text-primary_black text-theme-xs"
                >
                  Procedure
                </TableCell>
                <TableCell
                  isHeader
                  className="px-4 py-3 text-primary_black text-theme-xs"
                >
                  Requested on
                </TableCell>
                <TableCell
                  isHeader
                  className="px-4 py-3 text-primary_black text-theme-xs"
                >
                  Appointment with
                </TableCell>
                <TableCell
                  isHeader
                  className="px-4 py-3 text-primary_black text-theme-xs"
                >
                  Status
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-secondary_skin">
              {rows.map((r) => {
                const d = new Date(r.requestedOn);
                const requested = isNaN(d.getTime())
                  ? "—"
                  : new Intl.DateTimeFormat("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }).format(d); // e.g., 20 Aug 2025

                return (
                  <TableRow key={r.id}>
                    <TableCell className="px-4 py-3 text-secondary_black/80 text-theme-sm">
                      {r.type}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-secondary_black/80 text-theme-sm">
                      {r.procedure ?? "—"}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-secondary_black/80 text-theme-sm">
                      {requested}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-secondary_black/80 text-theme-sm">
                      {r.appointmentWith}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-secondary_black/80 text-theme-sm">
                      {r.status}
                    </TableCell>
                  </TableRow>
                );
              })}

              {rows.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="px-4 py-8 text-secondary_black/70 text-center"
                  >
                    No bookings
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-end p-4">
        <Pagination
          current={page}
          defaultCurrent={1}
          total={total}
          pageSize={pageSize}
          onChange={handlePageChange}
          showSizeChanger={false}
          hideOnSinglePage={false}
        />
      </div>
    </section>
  );
}
