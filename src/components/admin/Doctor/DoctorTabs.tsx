"use client";

import { useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/utils";
import Text from "@/components/ui/TextUser";
import { Pagination } from "antd";

export type DocFile = {
  id: string;
  name: string; // e.g., "Mymedical Degree.Png"
  sizeLabel?: string; // e.g., "156kb"
  href: string; // download/view url
  icon?: string; // optional icon path
};

export type AppointmentRow = {
  id: string;
  patientName: string;
  title: string; // Type (e.g., "Consultation", "Medical Opinion")
  procedure: string | null;
  status: "booked" | "completed" | "cancelled";
  amount: number;
  currency?: string; // e.g., "CHF"
  consultationDate: Date;
};

const numFmt = new Intl.NumberFormat("en-US");
// dateFmt reserved for future date display

export default function DoctorTabs({
  documents,
  appointments,
  totalAppointments,
  page,
  pageSize,
  onPageChange,
  monthlyClicks,
  location,
}: {
  documents: DocFile[];
  appointments: AppointmentRow[];
  totalAppointments: number;
  page: number;
  pageSize: number;
  onPageChange?: (p: number) => void;
  monthlyClicks?: number;
  location?: string | null;
}) {
  const [tab, setTab] = useState<"docs" | "appts">("docs");

  const handlePageChange = (p: number) => {
    onPageChange?.(p);
  };

  const handleDownload = async (
    e: MouseEvent<HTMLAnchorElement>,
    f: DocFile
  ) => {
    e.preventDefault();
    try {
      const res = await fetch(f.href, { credentials: "include" });
      if (!res.ok) throw new Error(`Download failed: ${res.status}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = f.name || "download";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      // Fallback: open in new tab if direct download not allowed (e.g., cross-origin without CORS/headers)
      window.open(f.href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section className="bg-tertiary_skin p-4 sm:p-5 md:p-6 border border-secondary_skin rounded-3xl w-full">
      {/* Tabs */}
      <div className="flex items-center gap-6 border-secondary_skin border-b">
        <button
          className={cn(
            "-mb-px py-2",
            tab === "docs"
              ? "text-primary_black font-semibold border-b-2 border-secondary"
              : "text-secondary_black/70"
          )}
          onClick={() => setTab("docs")}
        >
          <Text as="h4" className="text-inherit">
            Documents
          </Text>
        </button>

        <button
          className={cn(
            "-mb-px py-2",
            tab === "appts"
              ? "text-primary_black font-semibold border-b-2 border-secondary"
              : "text-secondary_black/70"
          )}
          onClick={() => setTab("appts")}
        >
          <Text as="h4" className="text-inherit">
            Appointment History
          </Text>
        </button>
      </div>

      {/* Content */}
      {tab === "docs" ? (
        <div className="pt-4 sm:pt-5">
          <div className="space-y-3 sm:space-y-4 max-w-2xl">
            {documents.map((f) => (
              <div
                key={f.id}
                className="flex justify-between items-center bg-primary_skin p-3 sm:p-4 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="flex justify-center items-center bg-secondary rounded-xl w-10 h-10">
                    <Image
                      src={f.icon || "/images/admin/doctor/doc.svg"}
                      alt=""
                      width={20}
                      height={20}
                    />
                  </div>
                  <div className="min-w-0">
                    <Text as="p1" className="text-primary_black truncate">
                      {f.name}
                    </Text>
                    {f.sizeLabel && (
                      <Text as="p2" className="text-secondary_black/70">
                        {f.sizeLabel}
                      </Text>
                    )}
                  </div>
                </div>

                <Link
                  href={f.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  onClick={(e) => handleDownload(e, f)}
                  className="inline-flex justify-center items-center rounded-xl w-9 h-9"
                  aria-label="Download"
                >
                  <Image
                    src="/images/admin/doctor/download.svg"
                    alt="Download"
                    width={18}
                    height={18}
                  />
                </Link>
              </div>
            ))}
          </div>

          {/* Meta (Monthly Clicks + Location) */}
          <div className="space-y-3 mt-5 sm:mt-6">
            {typeof monthlyClicks === "number" && (
              <div className="flex items-center gap-2">
                <Text as="p1" className="text-primary_black">
                  Monthly Clicks :
                </Text>
                <Text as="p1" className="text-primary_black">
                  {numFmt.format(monthlyClicks)}
                </Text>
                {/* <button
                  className="inline-flex justify-center items-center bg-primary rounded-full w-5 h-5 text-primary_black"
                  aria-label="Add"
                  type="button"
                >
                  +
                </button> */}
              </div>
            )}

            {location && (
              <div className="flex items-center gap-2">
                <Text as="p1" className="text-primary_black">
                  Location:
                </Text>
                <Text as="p1" className="text-secondary_black/80">
                  {location}
                </Text>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="pt-4 sm:pt-5">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="border-secondary_skin border-b">
                  <TableRow>
                    <TableCell
                      isHeader
                      className="px-4 py-3 text-primary_black text-theme-xs"
                    >
                      Patient Name
                    </TableCell>
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
                      Status
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-4 py-3 text-primary_black text-theme-xs"
                    >
                      Charges
                    </TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-secondary_skin">
                  {appointments.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="px-4 py-3 text-secondary_black/80 text-theme-sm">
                        {r.patientName}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-secondary_black/80 text-theme-sm">
                        {r.title}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-secondary_black/80 text-theme-sm">
                        {r.procedure ?? "—"}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-secondary_black/80 text-theme-sm capitalize">
                        {r.status}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-secondary_black/80 text-theme-sm">
                        {r.amount} {r.currency ?? ""}
                      </TableCell>
                    </TableRow>
                  ))}
                  {appointments.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="px-4 py-8 text-secondary_black/70 text-center"
                      >
                        No appointments
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
          <div className="flex justify-end p-4">
            <Pagination
              current={page}
              defaultCurrent={1}
              total={totalAppointments}
              pageSize={pageSize}
              onChange={handlePageChange}
              showSizeChanger={false}
              hideOnSinglePage={false}
            />
          </div>
        </>
      )}
    </section>
  );
}
