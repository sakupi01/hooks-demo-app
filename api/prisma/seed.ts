import { prisma } from "./client";

async function main() {
  await prisma.memo.createMany({
    data: [
      {
        title: "DB is initialized🌟",
      },
      {
        title: "思ったことを",
      },
      {
        title: "つらつらかく",
      },
      {
        title: "匿名やで",
      },
    ],
    skipDuplicates: true,
  });
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
