"use client";

import React, { useState } from "react";
import Button from "@/components/ui/ButtonUser";
import { useRouter } from "next/navigation";
import RejectReasonModal from "@/components/admin/Doctor/RejectReasonModal";
import { useAuth } from "@/context/AuthContext";

export default function VerifyButtons({ id }: { id: string }) {
  const router = useRouter();
  const { token } = useAuth();
  const [openReject, setOpenReject] = useState(false);
  const [savingAccept, setSavingAccept] = useState(false);

  const accept = async () => {
    try {
      setSavingAccept(true);
      const res = await fetch("/api/admin/doctor/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        credentials: "include",
        body: JSON.stringify({ id, verified: 2 }),
      });
      if (res.ok) router.refresh();
    } finally {
      setSavingAccept(false);
    }
  };

  const rejectWithReason = async (reason: string) => {
    const res = await fetch("/api/admin/doctor/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      credentials: "include",
      body: JSON.stringify({ id, verified: 3, reason }),
    });
    if (res.ok) {
      setOpenReject(false);
      router.refresh();
    }
  };

  return (
    <>
      <div className="flex md:flex-row flex-col items-center gap-3">
        <Button
          type="button"
          onClick={accept}
          disabled={savingAccept}
          className="bg-black_secondary hover:bg-black_tertiary rounded-md w-full min-w-[100px] text-primary"
        >
          {savingAccept ? "Saving..." : "Accept"}
        </Button>
        <Button
          type="button"
          onClick={() => setOpenReject(true)}
          className="bg-red hover:bg-red/80 rounded-md w-full min-w-[100px] text-primary"
        >
          Reject
        </Button>
      </div>

      <RejectReasonModal
        open={openReject}
        onClose={() => setOpenReject(false)}
        onSubmit={rejectWithReason}
      />
    </>
  );
}
