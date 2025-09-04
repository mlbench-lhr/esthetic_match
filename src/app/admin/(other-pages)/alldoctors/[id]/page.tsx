import { use } from "react";
import DoctorHeaderCard from "@/components/admin/Doctor/DoctorHeaderCard";
import DoctorTabsClient from "@/components/admin/Doctor/DoctorTabsClient";
import { getDoctorById, getDoctorRating } from "@/lib/data/doctors";
import { getMedicalOpinionsByDoctor } from "@/lib/data/medicalOpinions";
import { notFound } from "next/navigation";

type ProcZone = {
  zone?: string | null;
  beforeImageUrl?: string | null;
  afterImageUrl?: string | null;
};
type BeforeAfter = { bodyPart?: string | null; zones?: ProcZone[] };
type Procedure = {
  procedureType?: string | null;
  beforeAfterPictures?: BeforeAfter[];
};

function buildOverview(
  doc:
    | (Awaited<ReturnType<typeof getDoctorById>> & { procedures?: Procedure[] })
    | null
) {
  const documents = (doc?.verificationDocs ?? []).map((d, idx) => ({
    id: `${doc!.id}-${idx}`,
    name: d?.name ?? `Document ${idx + 1}`,
    href: d?.link ?? "#",
  }));

  const proceduresTags = Array.from(
    new Set(
      (doc?.procedures ?? [])
        .map((p: Procedure) => p?.procedureType)
        .filter(Boolean) as string[]
    )
  );

  const sectionsMap = new Map<
    string,
    { title?: string | null; before?: string | null; after?: string | null }[]
  >();

  (doc?.procedures ?? []).forEach((p: Procedure) => {
    (p?.beforeAfterPictures ?? []).forEach((bap: BeforeAfter) => {
      const body = bap?.bodyPart || "Gallery";
      const arr = sectionsMap.get(body) ?? [];
      (bap?.zones ?? []).forEach((z: ProcZone) => {
        arr.push({
          title: z?.zone ?? null,
          before: z?.beforeImageUrl ?? null,
          after: z?.afterImageUrl ?? null,
        });
      });
      sectionsMap.set(body, arr);
    });
  });

  const gallery = Array.from(sectionsMap.entries()).map(([section, items]) => ({
    section,
    items,
  }));

  return {
    clinicName: doc?.clinicName ?? null,
    location: doc?.location ?? null,
    about: doc?.bio ?? null,
    documents,
    medicalSpecialties: doc?.medicalSpecialty ?? [],
    top3: (doc?.brandTechnique ?? []).slice(0, 3),
    proceduresTags,
    gallery,
  };
}

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

  const rating = use(getDoctorRating(id));
  const opinions = use(
    getMedicalOpinionsByDoctor({ doctorId: id, page, pageSize })
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
        about={doc.bio ?? ""}
        clinicName={doc.clinicName ?? ""}
        experienceYears={doc.experience ?? 0}
        ratingValue={rating.avg}
        ratingCount={rating.count}
      />

      <DoctorTabsClient
        overview={buildOverview(doc)}
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
      />
    </div>
  );
}
