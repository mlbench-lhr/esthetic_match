"use client";

import { useState } from "react";
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
  name: string;
  sizeLabel?: string;
  href: string;
  icon?: string;
};

export type GallerySection = {
  section: string;
  items: {
    title?: string | null;
    before?: string | null;
    after?: string | null;
  }[];
};

export type OverviewData = {
  clinicName?: string | null;
  location?: string | null;
  about?: string | null;
  documents: DocFile[];
  medicalSpecialties: string[];
  top3: string[];
  proceduresTags: string[];
  gallery: GallerySection[];
};

export type AppointmentRow = {
  id: string;
  patientName: string;
  title: string;
  procedure: string | null;
  status: "booked" | "completed" | "cancelled";
  amount: number;
  currency?: string;
  consultationDate: Date;
};

// const numFmt = new Intl.NumberFormat("en-US");

export default function DoctorTabs({
  overview,
  // existing props
  appointments,
  totalAppointments,
  page,
  pageSize,
  onPageChange,
}: {
  overview: OverviewData;
  appointments: AppointmentRow[];
  totalAppointments: number;
  page: number;
  pageSize: number;
  onPageChange?: (p: number) => void;
}) {
  const [tab, setTab] = useState<"over" | "appts">("over");

  const handlePageChange = (p: number) => onPageChange?.(p);

  // const handleDownload = async (
  //   e: MouseEvent<HTMLAnchorElement>,
  //   f: DocFile
  // ) => {
  //   e.preventDefault();
  //   try {
  //     const res = await fetch(f.href, { credentials: "include" });
  //     if (!res.ok) throw new Error();
  //     const blob = await res.blob();
  //     const url = URL.createObjectURL(blob);
  //     const a = document.createElement("a");
  //     a.href = url;
  //     a.download = f.name || "download";
  //     document.body.appendChild(a);
  //     a.click();
  //     a.remove();
  //     URL.revokeObjectURL(url);
  //   } catch {
  //     window.open(f.href, "_blank", "noopener,noreferrer");
  //   }
  // };
  function toCloudinaryAttachment(url: string, filename?: string) {
    if (!url.includes("/upload/")) return url;
    const name = filename ? `:${encodeURIComponent(filename)}` : "";
    return url.replace("/upload/", `/upload/fl_attachment${name}/`);
  }

  return (
    <section className="bg-tertiary_skin p-4 sm:p-5 md:p-6 border border-secondary_skin rounded-3xl w-full">
      {/* Tabs */}
      <div className="flex items-center gap-6 border-secondary_skin border-b">
        <button
          className={cn(
            "-mb-px py-2",
            tab === "over"
              ? "text-primary_black font-semibold border-b-2 border-secondary"
              : "text-secondary_black/70"
          )}
          onClick={() => setTab("over")}
        >
          <Text as="h4" className="text-inherit">
            Overview
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

      {tab === "over" ? (
        <div className="space-y-6 pt-4 sm:pt-5">
          <div className="flex justify-between items-start mb-4">
            <Text as="h4" className="text-primary_black">
              Clinic Info
            </Text>
          </div>
          {/* Clinic Info card */}
          <div className="bg-white_primary p-4 sm:p-5 border border-secondary_skin rounded-2xl">
            {/* Name */}
            {overview.clinicName && (
              <div className="mb-2">
                <Text as="p1" className="text-primary_black">
                  <span className="font-semibold">Name:</span>{" "}
                  {overview.clinicName}
                </Text>
              </div>
            )}

            {/* Location */}
            {overview.location && (
              <div className="mb-4">
                <Text as="p1" className="text-primary_black">
                  <span className="font-semibold">Location:</span>{" "}
                  {overview.location}
                </Text>
              </div>
            )}

            {/* About */}
            {overview.about && (
              <div className="mb-6">
                <Text as="p1" className="text-primary_black">
                  <span className="font-semibold">About:</span>
                </Text>
                <Text as="p1" className="text-secondary_black/80">
                  {overview.about}
                </Text>
              </div>
            )}

            {/* Documents */}
            {overview.documents.length > 0 && (
              <div className="mb-6">
                <Text as="h5" className="mb-3 text-primary_black">
                  Documents
                </Text>
                <div className="space-y-3 max-w-2xl">
                  {overview.documents.map((f) => {
                    const downloadHref = toCloudinaryAttachment(f.href, f.name);
                    return (
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
                          <div className="min-w-0 max-w-xs overflow-hidden">
                            <Text
                              as="p1"
                              className="text-primary_black truncate"
                            >
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
                          href={downloadHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          download={f.name}
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
                    );
                  })}
                </div>
              </div>
            )}

            {/* Medical Specialties */}
            {overview.medicalSpecialties.length > 0 && (
              <div className="mb-6">
                <Text as="h5" className="mb-3 text-primary_black">
                  Medical Specialties
                </Text>
                <div className="flex flex-wrap gap-2">
                  {overview.medicalSpecialties.map((s, i) => (
                    <span
                      key={`${s}-${i}`}
                      className="bg-primary_skin px-3 py-1 rounded-full text-[12px] text-primary_black md:text-[14px]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* My Top 03 */}
            {overview.top3.length > 0 && (
              <div className="mb-6">
                <Text as="h5" className="mb-3 text-primary_black">
                  My Top 03
                </Text>
                <div className="flex flex-wrap gap-2">
                  {overview.top3.map((t, i) => (
                    <span
                      key={`${t}-${i}`}
                      className="bg-primary_skin px-3 py-1 rounded-full text-[12px] text-primary_black md:text-[14px]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Procedures tags */}
            {overview.proceduresTags.length > 0 && (
              <div className="mb-6">
                <Text as="h5" className="mb-3 text-primary_black">
                  Procedures
                </Text>
                <div className="flex flex-wrap gap-2">
                  {overview.proceduresTags.map((p, i) => (
                    <span
                      key={`${p}-${i}`}
                      className="bg-primary_skin px-3 py-1 rounded-full text-[12px] text-primary_black md:text-[14px]"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery */}
            {overview.gallery.length > 0 && (
              <div className="mb-2">
                <Text as="h5" className="mb-3 text-primary_black">
                  Gallery
                </Text>

                <div className="space-y-6">
                  {overview.gallery.map((sec) => (
                    <div key={sec.section}>
                      <Text
                        as="p1"
                        className="block mb-3 font-semibold text-primary_black"
                      >
                        {sec.section}
                      </Text>

                      <div className="gap-3 sm:gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                        {sec.items.map((it, idx) => (
                          <div
                            key={`${sec.section}-${idx}`}
                            className="bg-primary_skin p-2 rounded-xl"
                          >
                            {it.title && (
                              <Text
                                as="p2"
                                className="block mb-2 text-secondary_black/80"
                              >
                                {it.title}
                              </Text>
                            )}

                            <div className="gap-2 grid grid-cols-2">
                              {/* before */}
                              {it.before && (
                                <div className="bg-white rounded-lg overflow-hidden">
                                  <Image
                                    src={it.before}
                                    alt="Before"
                                    width={320}
                                    height={240}
                                    className="w-full h-[140px] object-cover"
                                  />
                                </div>
                              )}
                              {/* after */}
                              {it.after && (
                                <div className="bg-white rounded-lg overflow-hidden">
                                  <Image
                                    src={it.after}
                                    alt="After"
                                    width={320}
                                    height={240}
                                    className="w-full h-[140px] object-cover"
                                  />
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* Appointments table (unchanged) */}
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
