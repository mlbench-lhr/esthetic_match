import { use } from "react";
import DoctorHeaderCard from "@/components/admin/Doctor/DoctorHeaderCard";
import DoctorTabsClient from "@/components/admin/Doctor/DoctorTabsClient";
import { getDoctorById } from "@/lib/data/doctors";
import { getMedicalOpinionsByDoctor } from "@/lib/data/medicalOpinions";
import { notFound } from "next/navigation";

export default function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { id } = use(params);
  const sp = use(searchParams);

  const page = Math.max(
    1,
    Number(Array.isArray(sp.page) ? sp.page[0] : sp.page) || 1
  );
  const pageSize = Math.max(
    1,
    Number(Array.isArray(sp.pageSize) ? sp.pageSize[0] : sp.pageSize) || 10
  );

  const doc = use(getDoctorById(id));
  if (!doc) return notFound();

  const documents = (doc.verificationDocs ?? []).map((d, idx) => ({
    id: `${doc.id}-${idx}`,
    name: d?.name ?? `Document ${idx + 1}`,
    href: d?.link ?? "#",
  }));

  const opinions = use(
    getMedicalOpinionsByDoctor({
      doctorId: id,
      page,
      pageSize,
    })
  );

  return (
    <div className="flex flex-col gap-y-9">
      <DoctorHeaderCard
        id={doc.id}
        name={`${doc.firstName} ${doc.lastName}`}
        email={doc.email}
        image={doc.image ?? undefined}
        addedOn={doc.createdAt}
        verified={doc.verified}
      />

      <DoctorTabsClient
        documents={documents}
        appointments={opinions.rows.map((o) => ({
          id: o.id,
          patientName: o.patientName,
          title: "Medical Opinion",
          procedure: o.procedure,
          status:
            o.status === "completed"
              ? "completed"
              : o.status === "rejected"
              ? "cancelled"
              : "booked",
          amount: o.charges,
          currency: o.currency,
          consultationDate: o.createdAt,
        }))}
        totalAppointments={opinions.total}
        page={opinions.page}
        pageSize={opinions.pageSize}
        monthlyClicks={doc.clicks ?? 0}
        location={doc.location ?? null}
      />
    </div>
  );
}
