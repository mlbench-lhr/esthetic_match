import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { signToken } from "@/lib/auth";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const internalSecret = process.env.INTERNAL_SECRET || "dev_internal_secret";
  const headerSecret = request.headers.get("x-internal-secret");

  if (headerSecret !== internalSecret) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const { email, password, name } = body;

  if (!email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }

  const hashed = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      email,
      name: name || "Admin",
      password: hashed,
      role: "admin",
    },
  });

  const token = signToken({ id: newUser.id, email: newUser.email });

  return NextResponse.json({
    user: { id: newUser.id, email: newUser.email, name: newUser.name },
    token,
  });
}
