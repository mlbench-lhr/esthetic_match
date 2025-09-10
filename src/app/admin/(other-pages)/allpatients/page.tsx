import { use } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import PatientBreadcrumb from "@/components/common/PageBreadCrumbPatients";
import PatientTable, { PatientRow } from "@/components/tables/PatientTable";
import { getPatients } from "@/lib/data/patients";

export default function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = use(searchParams);

  const page = Number(sp.page ?? 1);
  const pageSize = Number(sp.pageSize ?? 10);
  const q = Array.isArray(sp.q) ? sp.q.join(" ") : sp.q ?? "";

  const json = use(getPatients({ page, pageSize, search: q }));

  const rows: PatientRow[] = json.data.map((p) => ({
    id: p.id,
    name: p.userName,
    email: p.email,
    image: p.image ?? null,
    createdAt:
      p.createdAt instanceof Date
        ? p.createdAt.toISOString()
        : String(p.createdAt),
    appointments: p.appointments ?? 0,
  }));

  return (
    <>
      <PatientBreadcrumb
        pageTitle="All Patients"
        total={json.total}
        defaultSearch={q}
        pageSize={String(pageSize)}
      />

      {/* No tabs and no add button for Patients */}
      <div className="space-y-6">
        <ComponentCard title="All Patients">
          <PatientTable
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
