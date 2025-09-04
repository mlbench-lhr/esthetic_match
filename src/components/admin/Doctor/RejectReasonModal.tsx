"use client";

import React, { useState } from "react";
import Text from "@/components/ui/TextUser";
import Button from "@/components/ui/ButtonUser";
import { cn } from "@/utils";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => Promise<void> | void;
  className?: string;
};

export default function RejectReasonModal({
  open,
  onClose,
  onSubmit,
  className,
}: Props) {
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    if (!reason.trim()) {
      setErr("Please enter a reason.");
      return;
    }
    try {
      setSubmitting(true);
      await onSubmit(reason.trim());
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="z-[999] fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div
        className={cn(
          "bg-white_primary shadow-md p-6 rounded-2xl w-full max-w-lg",
          className
        )}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <Text
            as="h3"
            className="font-bold text-[22px] text-primary_black md:text-[26px]"
          >
            Reason For Rejection
          </Text>
          <button
            onClick={onClose}
            className="hover:bg-primary_skin p-1 rounded-full text-secondary"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block font-semibold text-primary_black text-sm">
            Reason
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Add reason"
            rows={5}
            className="bg-white_primary p-3 border focus:border-secondary border-black_secondary/10 rounded-xl focus:outline-none w-full text-secondary_black/90 placeholder:text-secondary_black/60"
          />
          {err && <p className="text-red text-sm">{err}</p>}

          <Button
            type="submit"
            disabled={submitting}
            className="bg-black_secondary hover:bg-black_tertiary mt-2 rounded-xl w-full h-[48px] text-primary"
          >
            {submitting ? "Saving..." : "Done"}
          </Button>
        </form>
      </div>
    </div>
  );
}
