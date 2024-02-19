import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seed() {
  try {
    await prisma.battery.deleteMany();
    await prisma.battery.createMany({
      data: [
        {
          name: "battery 1",
          postCode: 1001,
          totalWatt: 100,
        },
        {
          name: "battery 2",
          postCode: 1002,
          totalWatt: 200,
        },
      ],
    });
  } catch (err) {
    console.log(err);
  }
}

seed();
