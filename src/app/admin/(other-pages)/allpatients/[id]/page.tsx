import { use } from "react";
import PatientHeaderCard from "@/components/admin/Patient/PatientHeaderCard";
import PatientBookingsClient from "@/components/admin/Patient/PatientBookingsClient";
import { notFound } from "next/navigation";

// ⬇️ replace these with your real data functions
import { getPatientById, getPatientBookings } from "@/lib/data/patients";

// Re-export type to keep local usage if needed

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

  const patient = use(getPatientById(id));
  if (!patient) return notFound();

  const bookings = use(getPatientBookings({ patientId: id, page, pageSize }));
  // expected shape: { rows: BookingRow[], total: number, page: number, pageSize: number }

  return (
    <div className="flex flex-col gap-y-9">
      <PatientHeaderCard
        name={patient.userName}
        email={patient.email}
        image={patient.image ?? undefined}
        location={patient.location ?? ""}
        dob={patient.dob}
        addedOn={patient.createdAt}
      />

      <PatientBookingsClient
        rows={bookings.rows}
        total={bookings.total}
        page={bookings.page}
        pageSize={bookings.pageSize}
      />
    </div>
  );
}
