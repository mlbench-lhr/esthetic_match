import { use } from "react";
import Link from "next/link";
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb2";
import BasicTableOne, { DoctorRow } from "@/components/tables/ReadyTable";
import { getDoctors, VerifiedValue } from "@/lib/data/doctors";

const isVerifiedValue = (v: unknown): v is VerifiedValue =>
  typeof v === "number" && (v === 0 || v === 1 || v === 2 || v === 3);

export default function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = use(searchParams);

  const page = Number(sp.page ?? 1);
  const pageSize = Number(sp.pageSize ?? 10);
  const q = Array.isArray(sp.q) ? sp.q.join(" ") : sp.q ?? "";

  const vStr = Array.isArray(sp.verified) ? sp.verified[0] : sp.verified;
  const maybeNum = vStr === undefined ? undefined : Number(vStr);
  const verified = isVerifiedValue(maybeNum) ? maybeNum : undefined;

  const json = use(getDoctors({ page, pageSize, search: q, verified }));

  const rows: DoctorRow[] = json.data.map((d) => ({
    id: d.id,
    name: `${d.firstName} ${d.lastName}`,
    email: d.email,
    image: d.image ?? null,
    createdAt:
      d.createdAt instanceof Date
        ? d.createdAt.toISOString()
        : String(d.createdAt),
    clicks: (d.sub_clicks ?? 0) + (d.pay_clicks ?? 0),
  }));

  const base = new URLSearchParams({ page: "1", pageSize: String(pageSize) });
  if (q) base.set("q", q);

  const allHref = `/admin/alldoctors?${base.toString()}`;
  const approvalHref = (() => {
    const p = new URLSearchParams(base);
    p.set("verified", "1");
    return `/admin/alldoctors?${p.toString()}`;
  })();

  const isApproval = verified === 1;

  return (
    <>
      <PageBreadcrumb
        pageTitle="All Doctors"
        total={json.total}
        defaultSearch={q}
        pageSize={String(pageSize)}
        verified={verified !== undefined ? String(verified) : undefined}
      />

      <div className="flex items-center gap-6 mb-4">
        <Link
          href={allHref}
          className={`text-sm font-medium ${
            !isApproval
              ? "text-gray-800 dark:text-white/90 border-b-2 border-gray-800 pb-1"
              : "text-gray-400 hover:text-gray-700 dark:text-gray-400"
          }`}
        >
          All Doctors
        </Link>
        <Link
          href={approvalHref}
          className={`text-sm font-medium ${
            isApproval
              ? "text-gray-800 dark:text-white/90 border-b-2 border-gray-800 pb-1"
              : "text-gray-400 hover:text-gray-700 dark:text-gray-400"
          }`}
        >
          Approval Request
        </Link>
      </div>

      <div className="space-y-6">
        <ComponentCard title={isApproval ? "Approval Request" : "All Doctors"}>
          <BasicTableOne
            rows={rows}
            total={json.total}
            page={json.page}
            pageSize={json.pageSize}
          />
        </ComponentCard>
      </div>
    </>
  );
}
