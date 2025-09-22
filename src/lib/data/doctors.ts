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
        sub_clicks: true,
        pay_clicks: true,
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
      sub_clicks: true,
      pay_clicks: true,
      verified: true,
      bio: true,
      experience: true,
      location: true,
      specializations: true,
      medicalSpecialty: true,
      brandTechnique: true,
      verificationDocs: true,
      procedures: true,
    },
  });
  return doc;
}

export type DoctorReviewRow = {
  id: string;
  userName?: string;
  rating: number;
  comment: string;
  hidden: boolean;
  createdAt: Date;
};

export async function getDoctorReviewsByDoctor({
  doctorId,
  page,
  pageSize,
}: {
  doctorId: string;
  page: number;
  pageSize: number;
}) {
  const skip = Math.max(0, (page - 1) * pageSize);

  type ReviewSelect = {
    id: string;
    rating: number;
    comment: string;
    hidden: boolean;
    createdAt: Date;
    user?: { userName: string | null } | null;
  };

  const [totalRaw, itemsRaw] = await Promise.all([
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (prisma as any).doctorReview.count({ where: { doctorId } }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (prisma as any).doctorReview.findMany({
      where: { doctorId },
      orderBy: { createdAt: "desc" },
      skip,
      take: pageSize,
      select: {
        id: true,
        rating: true,
        comment: true,
        hidden: true,
        createdAt: true,
        user: { select: { userName: true } },
      },
    }),
  ]);

  const total: number = Number(totalRaw ?? 0);
  const items = (itemsRaw ?? []) as ReviewSelect[];

  const rows: DoctorReviewRow[] = items.map((r: ReviewSelect) => ({
    id: r.id,
    userName: r.user?.userName ?? undefined,
    rating: r.rating,
    comment: r.comment,
    hidden: r.hidden,
    createdAt: r.createdAt,
  }));

  return { rows, total, page, pageSize };
}

export async function getDoctorRating(doctorId: string) {
  // Prefer Prisma aggregate if the DoctorReview model exists
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const agg = await (prisma as any).doctorReview.aggregate({
      _avg: { rating: true },
      _count: { rating: true },
      where: { doctorId },
    });

    const avg = typeof agg?._avg?.rating === "number" ? agg._avg.rating : 0;
    const count =
      typeof agg?._count?.rating === "number" ? agg._count.rating : 0;
    return { avg, count };
  } catch {
    // Fallback to raw aggregation (works even without Prisma model)
    // Use $toString on the stored doctorId to compare against the string id
    const res = (await prisma.$runCommandRaw({
      aggregate: "doctorreviews",
      pipeline: [
        { $match: { $expr: { $eq: [{ $toString: "$doctorId" }, doctorId] } } },
        { $group: { _id: null, avg: { $avg: "$rating" }, cnt: { $sum: 1 } } },
      ],
      cursor: {},
    })) as unknown as {
      cursor?: { firstBatch?: { avg?: number; cnt?: number }[] };
    };

    const row = res?.cursor?.firstBatch?.[0];
    return {
      avg: typeof row?.avg === "number" ? row.avg : 0,
      count: typeof row?.cnt === "number" ? row.cnt : 0,
    };
  }
}
