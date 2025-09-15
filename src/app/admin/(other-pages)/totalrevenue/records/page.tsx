"use client";
import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import useSWR, { type Fetcher } from "swr";
import RevenueRecordCard, {
  RevenueRecord,
} from "@/components/admin/Revenue/RevenueRecordCard";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

// ----- API types -----
type ServerRecord = {
  id: string;
  amount: number;
  status: string;
  createdAt: string;
  doctor: { name: string; image: string | null };
  ownerShare: number;
  doctorShare: number;
};
type RecordsResponse = {
  items: ServerRecord[];
  total: number;
  pages: number;
  currency?: string;
};

// tuple key: [url, token]
type Key = readonly [url: string, token: string];

// typed fetcher for tuple key
const fetchWithKey: Fetcher<RecordsResponse, Key> = async ([url, tok]) => {
  const res = await fetch(url, { headers: { Authorization: `Bearer ${tok}` } });
  if (!res.ok) throw new Error("Failed to load revenue records");
  return res.json();
};

function RevenueRecordsPageInner() {
  const sp = useSearchParams();
  const router = useRouter();

  const page = Math.max(1, Number(sp.get("page") ?? 1));
  const pageSize = 9;

  const { token } = useAuth();

  const key: Key | null = token
    ? ([
        `/api/admin/revenue/records?page=${page}&pageSize=${pageSize}`,
        token,
      ] as const)
    : null;

  // Note: only 2 generics so SWR uses the overload that accepts `null` keys
  const { data } = useSWR<RecordsResponse, Error>(key, fetchWithKey);

  const items: RevenueRecord[] = (data?.items ?? []).map((it, i) => ({
    seq: (page - 1) * pageSize + i + 1,
    id: it.id,
    amount: it.amount,
    status: it.status,
    createdAt: it.createdAt,
    doctor: it.doctor,
    ownerShare: it.ownerShare,
    doctorShare: it.doctorShare,
  }));

  const next = () => router.push(`?page=${page + 1}`);
  const prev = () => router.push(`?page=${Math.max(1, page - 1)}`);

  return (
    <div className="gap-4 md:gap-6 grid grid-cols-12">
      <div className="flex justify-between items-center col-span-12">
        <h1 className="font-semibold text-black_secondary text-2xl">
          Revenue Records
        </h1>
        <Link
          href="/admin/totalrevenue"
          className="text-black_secondary/70 text-sm hover:underline"
        >
          ← Back to revenue
        </Link>
      </div>

      <div className="gap-4 md:gap-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 col-span-12">
        {items.map((rec) => (
          <RevenueRecordCard key={rec.id} rec={rec} />
        ))}
      </div>

      <div className="flex justify-between items-center col-span-12 mt-2 text-sm">
        <button
          onClick={prev}
          disabled={page <= 1}
          className="disabled:opacity-50 px-3 py-1 border rounded-md"
        >
          Prev
        </button>
        <div>
          Page {page} {data?.pages ? `of ${data.pages}` : ""}
        </div>
        <button
          onClick={next}
          disabled={!!data && page >= (data.pages ?? 1)}
          className="disabled:opacity-50 px-3 py-1 border rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default function RevenueRecordsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RevenueRecordsPageInner />
    </Suspense>
  );
}
