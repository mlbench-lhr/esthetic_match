// lib/data/doctors.ts (server-only)
import { prisma } from "@/lib/prisma";

export type VerifiedValue = 0 | 1 | 2 | 3;

export async function getDoctors({
  page,
  pageSize,
  search,
  verified,
}: {
  page: number;
  pageSize: number;
  search?: string;
  verified?: VerifiedValue;
}) {
  const where: Record<string, unknown> = {};

  const tokens =
    search
      ?.split(/[,\s]+/)
      .map((s) => s.trim())
      .filter(Boolean) ?? [];
  if (tokens.length) {
    where.OR = tokens.flatMap((t) => [
      { firstName: { contains: t, mode: "insensitive" } },
      { lastName: { contains: t, mode: "insensitive" } },
      { email: { contains: t, mode: "insensitive" } },
      { clinicName: { contains: t, mode: "insensitive" } },
    ]);
  }

  if (verified !== undefined) where.verified = verified;

  const [total, data] = await Promise.all([
    prisma.doctor.count({ where }),
    prisma.doctor.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        image: true,
        clinicName: true,
        createdAt: true,
        clicks: true,
        verified: true,
      },
    }),
  ]);
  return { data, total, page, pageSize };
}

export async function getDoctorById(id: string) {
  // Mongo ObjectId is stored as string in Prisma model
  const doc = await prisma.doctor.findUnique({
    where: { id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      image: true,
      clinicName: true,
      createdAt: true,
      clicks: true,
      verified: true,
      bio: true,
      experience: true,
      location: true,
      specializations: true,
      medicalSpecialty: true,
      brandTechnique: true,
      verificationDocs: true,
    },
  });
  return doc;
}
