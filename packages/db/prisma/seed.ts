import bcrypt from "bcryptjs";
import { prisma } from "../src/client.js";

async function main() {
  const existingAdmin = await prisma.user.findUnique({
    where: { email: "admin@example.com" },
  });

  if (!existingAdmin) {
    const password = await bcrypt.hash("Admin@123", 12);

    await prisma.user.create({
      data: {
        name: "Admin User",
        email: "admin@example.com",
        password,
        role: "ADMIN",
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });