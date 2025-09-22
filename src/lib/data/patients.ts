import { prisma } from "@/lib/prisma";

export async function getPatients({
  page,
  pageSize,
  search,
}: {
  page: number;
  pageSize: number;
  search?: string;
}) {
  const where: Record<string, unknown> = {};

  const tokens =
    search
      ?.split(/[,\s]+/)
      .map((s) => s.trim())
      .filter(Boolean) ?? [];

  if (tokens.length) {
    where.OR = tokens.flatMap((t) => [
      { userName: { contains: t, mode: "insensitive" } },
      { email: { contains: t, mode: "insensitive" } },
      { location: { contains: t, mode: "insensitive" } },
    ]);
  }

  const [total, dataRaw] = await Promise.all([
    prisma.patient.count({ where }),
    prisma.patient.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        userName: true,
        email: true,
        image: true,
        createdAt: true,
      },
    }),
  ]);

  // Count appointments per patient (using MedicalOpinion as "appointments")
  const data = await Promise.all(
    dataRaw.map(async (p) => {
      const cnt = await prisma.medicalOpinion.count({
        where: { userId: p.id },
      });
      return { ...p, appointments: cnt };
    })
  );

  return { data, total, page, pageSize };
}

export async function getPatientById(id: string) {
  const user = await prisma.patient.findUnique({
    where: { id },
    select: {
      id: true,
      userName: true,
      email: true,
      image: true,
      location: true,
      dob: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return user;
}

export async function getRecentPatients(limit = 5) {
  const users = await prisma.patient.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
    select: {
      id: true,
      userName: true,
      email: true,
      image: true,
      createdAt: true,
    },
  });
  return users;
}

export type PatientBookingRow = {
  id: string;
  type: string;
  procedure: string | null;
  requestedOn: Date;
  appointmentWith: string;
  status: "Pending" | "Completed" | "Cancelled";
};

export async function getPatientBookings({
  patientId,
  page,
  pageSize,
}: {
  patientId: string;
  page: number;
  pageSize: number;
}) {
  const skip = Math.max(0, (page - 1) * pageSize);

  // Using MedicalOpinion as booking source
  // First, let's get all medical opinions for this user
  const allOpinions = await prisma.medicalOpinion.findMany({
    where: { userId: patientId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      createdAt: true,
      status: true,
      procedure: true,
      doctorId: true,
    },
  });

  const total = allOpinions.length;
  const paginatedOpinions = allOpinions.slice(skip, skip + pageSize);

  // Now get doctor details for the paginated opinions
  const opinionsWithDoctors = await Promise.all(
    paginatedOpinions.map(async (opinion) => {
      try {
        const doctor = await prisma.doctor.findUnique({
          where: { id: opinion.doctorId },
          select: { firstName: true, lastName: true },
        });
        return { ...opinion, doctor };
      } catch {
        // If doctor not found, return with null doctor
        return { ...opinion, doctor: null };
      }
    })
  );

  const rows: PatientBookingRow[] = opinionsWithDoctors.map((o) => ({
    id: o.id,
    type: "Medical Opinion", // static label
    procedure: o.procedure || null,
    requestedOn: o.createdAt,
    appointmentWith:
      [o.doctor?.firstName, o.doctor?.lastName].filter(Boolean).join(" ") ||
      "Doctor",
    status:
      o.status === "completed"
        ? "Completed"
        : o.status === "rejected"
        ? "Cancelled"
        : "Pending",
  }));

  return { rows, total, page, pageSize };
}
