// runPrismaQuery.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  try {
    const packages = await prisma.packages.findMany();
    console.log('Packages:', packages);
  } catch (error) {
    console.error('Error fetching packages:', error);
  } finally {
    await prisma.$disconnect();
  }
}

run();
