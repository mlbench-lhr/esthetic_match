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
      createdAt: true,
      updatedAt: true,
    },
  });
  return user;
}
