import { prisma } from "../src/config/database";
import { seedUsers } from "./seeders/users";

async function main() {
  seedUsers();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
