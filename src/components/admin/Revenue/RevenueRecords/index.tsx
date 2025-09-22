"use client";
import useSWR, { type Fetcher } from "swr";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import RevenueRecordCard, { RevenueRecord } from "../RevenueRecordCard";

// API types
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
  pages?: number;
  currency?: string;
};

// tuple key type
type Key = readonly [url: string, token: string];

// typed fetcher for a tuple key
const fetchWithKey: Fetcher<RecordsResponse, Key> = async ([url, tok]) => {
  const res = await fetch(url, { headers: { Authorization: `Bearer ${tok}` } });
  if (!res.ok) throw new Error("Failed to load revenue records");
  return res.json();
};

export default function RevenueRecords() {
  const { token } = useAuth();

  const key: Key | null = token
    ? (["/api/admin/revenue/records?page=1&pageSize=3", token] as const)
    : null;

  // ⬇️ note: only 2 generics; lets SWR pick the overload that accepts `null`
  const { data } = useSWR<RecordsResponse, Error>(key, fetchWithKey);

  const items: RevenueRecord[] = (data?.items ?? []).map((it, i) => ({
    seq: i + 1,
    id: it.id,
    amount: it.amount,
    status: it.status,
    createdAt: it.createdAt,
    doctor: it.doctor,
    ownerShare: it.ownerShare,
    doctorShare: it.doctorShare,
  }));

  return (
    <div className="col-span-12">
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold text-black_secondary text-2xl">
          Revenue Records
        </h2>
        <Link
          href="/admin/totalrevenue/records"
          className="text-black_secondary/70 text-sm hover:underline"
        >
          See all →
        </Link>
      </div>

      <div className="gap-4 md:gap-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {items.map((rec) => (
          <RevenueRecordCard key={rec.id} rec={rec} />
        ))}
      </div>
    </div>
  );
}
