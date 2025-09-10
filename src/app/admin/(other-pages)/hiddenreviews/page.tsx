"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Trash2 } from "lucide-react";
import Button from "@/components/ui/ButtonUser";

type Row = {
  id: string;
  doctorName: string;
  patientName: string;
  comment: string;
  createdAt: string;
};

export default function HiddenReviewsPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const [openId, setOpenId] = useState<string | null>(null); // modal review id

  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/admin/hidden-reviews", {
          cache: "no-store",
        });
        const json = await res.json();
        if (!cancel) {
          if (!res.ok) throw new Error(json?.error || "Failed");
          setRows(json.data);
        }
      } catch (e: unknown) {
        if (!cancel) setErr(e instanceof Error ? e.message : "Failed to load");
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => {
      cancel = true;
    };
  }, []);

  const openRow = useMemo(
    () => rows.find((r) => r.id === openId) || null,
    [rows, openId]
  );

  async function onDelete(id: string) {
    const prev = rows;
    setRows(prev.filter((r) => r.id !== id)); // optimistic
    try {
      const res = await fetch(`/api/admin/hidden-reviews/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error || "Delete failed");
      }
    } catch (e: unknown) {
      setRows(prev); // rollback
      alert(e instanceof Error ? e.message : "Delete failed");
    }
  }

  if (loading) {
    return <div className="p-6 text-[var(--secondary_black)]/70">Loading…</div>;
  }

  if (err) {
    return <div className="p-6 text-[var(--red)]">Error: {err}</div>;
  }

  if (rows.length === 0) {
    return (
      <div className="p-6">
        <h1 className="mb-4 font-semibold text-[var(--black_secondary)] text-2xl">
          Hidden Reviews
        </h1>
        <div className="bg-[var(--secondary_skin)] p-8 rounded-xl text-[var(--secondary_black)]/70 text-center">
          No hidden reviews.
        </div>
      </div>
    );
  }

  return (
    <div className="p-0 sm:p-2">
      <h1 className="mb-4 font-semibold text-[var(--black_secondary)] text-2xl">
        Hidden Reviews
      </h1>

      <div className="bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.06] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="border-gray-100 dark:border-white/[0.06] border-b">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-theme-xs text-start"
                >
                  Doctor Name
                </TableCell>
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
                  Comment
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-theme-xs text-start"
                >
                  Created On
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-theme-xs text-start"
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.06]">
              {rows.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="px-5 sm:px-6 py-4 text-start">
                    <span className="block font-medium text-gray-800 text-theme-sm">
                      {r.doctorName}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-700 text-theme-sm text-start">
                    {r.patientName}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-700 text-theme-sm text-start">
                    <span className="line-clamp-1">{r.comment}</span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-700 text-theme-sm text-start">
                    {new Date(r.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-700 text-theme-sm text-start">
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => onDelete(r.id)}
                        className="flex items-center gap-2 bg-red/10 border-1 rounded-full min-w-[90px] max-h-[28px] text-[12px] text-red md:text-[14px] leading-none" // <= tight line-height
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </Button>

                      <Button
                        onClick={() => setOpenId(r.id)}
                        className="flex items-center gap-2 bg-secondary/10 border-1 rounded-full min-w-[90px] max-h-[28px] text-[12px] text-black_secondary md:text-[14px] leading-none"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Show</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {rows.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="px-5 py-10 text-gray-500 text-theme-sm text-center"
                  >
                    No Hidden Reviews
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Modal */}
      {openRow && (
        <div
          className="z-[999] fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpenId(null);
          }}
        >
          <div className="bg-[var(--white_primary)] shadow p-5 rounded-2xl w-full max-w-lg">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-[var(--black_secondary)] text-lg">
                Reviews
              </h3>
              <button
                onClick={() => setOpenId(null)}
                className="hover:bg-[var(--tertiary_skin)] p-1 rounded-full"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <hr
              className="my-4 border-t"
              style={{ borderColor: "rgba(0,0,0,0.08)" }}
            />

            <div className="text-[var(--black_secondary)] text-sm whitespace-pre-line">
              {openRow.comment}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
