import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const EMAIL = process.env.ADMIN_EMAIL;
  const PASSWORD = process.env.ADMIN_PASSWORD;
  const PHONE = process.env.ADMIN_PHONE;
  const passwordHash = await bcrypt.hash(PASSWORD, 10);


  if(!EMAIL || !PASSWORD || !PHONE){
    throw new Error('Admin credentials is missing')
  }

  const alreadyExists = await prisma.user.findUnique({
    where: {
      email: EMAIL
    }
  });

  if(alreadyExists) return;
  
  await prisma.user.create({
    data: {
      email: EMAIL,
      password: passwordHash,
      phone: PHONE,
      warnings_preferences: "email",
      role: "admin",
    },
  });

  console.log("admin created sucessfully");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
