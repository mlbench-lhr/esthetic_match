import { prisma } from "@/lib/prisma";

export type MedicalOpinionRow = {
  id: string;
  patientName: string; // resolve via join with User if needed
  procedure: string;
  status: "pending" | "accepted" | "rejected" | "completed";
  charges: number;
  currency?: string;
  createdAt: Date;
};

export async function getMedicalOpinionsByDoctor({
  doctorId,
  page,
  pageSize,
}: {
  doctorId: string;
  page: number;
  pageSize: number;
}) {
  const skip = Math.max(0, (page - 1) * pageSize);

  type MongoCountResult = { n?: number; ok?: number };
  type MongoAggregateResult<T> = { cursor?: { firstBatch?: T[] } };

  // Count matching docs
  const countRes = (await prisma.$runCommandRaw({
    count: "medicalopinions",
    query: {
      $expr: { $eq: [{ $toString: "$doctorId" }, doctorId] },
    },
  })) as unknown as MongoCountResult;
  const total: number = typeof countRes?.n === "number" ? countRes.n : 0;

  // Page of documents
  const aggRes = (await prisma.$runCommandRaw({
    aggregate: "medicalopinions",
    pipeline: [
      { $match: { $expr: { $eq: [{ $toString: "$doctorId" }, doctorId] } } },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: pageSize },
      // join patient (users collection) to get userName
      {
        $lookup: {
          from: "users",
          let: { uid: "$userId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: [{ $toString: "$_id" }, { $toString: "$$uid" }],
                },
              },
            },
            { $project: { _id: 0, userName: 1 } },
          ],
          as: "user",
        },
      },
      { $unwind: { path: "$user", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 0,
          id: { $toString: "$_id" },
          procedure: 1,
          charges: 1,
          status: 1,
          createdAt: 1,
          patientName: "$user.userName",
          currency: 1,
        },
      },
    ],
    cursor: {},
  })) as unknown as MongoAggregateResult<{
    id: string;
    procedure: string;
    charges: number;
    status: MedicalOpinionRow["status"];
    createdAt: Date | string;
    patientName?: string;
    currency?: string;
  }>;

  const docs = aggRes?.cursor?.firstBatch ?? [];

  const rows: MedicalOpinionRow[] = docs.map((m) => ({
    id: String(m.id),
    patientName: m.patientName ?? "—",
    procedure: m.procedure,
    status: m.status,
    charges: Number(m.charges ?? 0),
    currency: m.currency ?? "CHF",
    createdAt: new Date(m.createdAt),
  }));

  return { rows, total, page, pageSize };
}
