const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({
  log: ['query'],
});

prisma.$on("query", (event) => {
  const queryEvent = event;

  console.log("Query:", queryEvent.query);
  console.log("Params:", queryEvent.params);
  console.log("Duration:", queryEvent.duration + "ms");
});

async function main() {
  // Your Prisma Client queries go here
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
