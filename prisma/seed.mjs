import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const prisma = new PrismaClient();

async function main() {
  const users = [
    { email: "malirazaansari45@gmail.com", name: "M Ali Raza Ansari" },
    { email: "mlbenchpvtltd@gmail.com", name: "MLBench Pvt Ltd" },
  ];

  for (const u of users) {
    const plain = crypto.randomBytes(6).toString("base64url");
    const hashed = await bcrypt.hash(plain, 10);

    await prisma.user.upsert({
      where: { email: u.email },
      update: { password: hashed, name: u.name },
      create: { email: u.email, name: u.name, password: hashed },
    });

    console.log(`Created/Updated ${u.email} -> password: ${plain}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
