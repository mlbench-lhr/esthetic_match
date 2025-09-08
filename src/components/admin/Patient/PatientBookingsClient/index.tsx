"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { PatientBookingRow as BookingRow } from "@/lib/data/patients";
import PatientBookings from "../PatientBookings";

export default function PatientBookingsClient({
  rows,
  total,
  page,
  pageSize,
}: {
  rows: BookingRow[];
  total: number;
  page: number;
  pageSize: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onPageChange = (p: number) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("page", String(p));
    params.set("pageSize", String(pageSize));
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <PatientBookings
      rows={rows}
      total={total}
      page={page}
      pageSize={pageSize}
      onPageChange={onPageChange}
    />
  );
}
