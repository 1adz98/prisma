import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // .....You will write your Prisma client here

  const user = await prisma.user.findMany({
    where: {
      name: "Ardi",
    },
    orderBy: {
      age: "asc",
    },
  });

  // const user = await prisma.user.createMany({
  //   data: [
  //     {
  //       name: "Andi",
  //       email: "andindreca@gmail.com",
  //       age: 28,
  //       isAdmin: false,
  //     },
  //     {
  //       name: "Ledian",
  //       email: "mucaraku@gmail.com",
  //       age: 21,
  //       isAdmin: false,
  //     },
  //   ],
  // });

  console.log(user);
}

main()
  .catch((e) => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
