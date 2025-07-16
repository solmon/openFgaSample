import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  // Seed Users
  const users = await prisma.user.createMany({
    data: [
      { email: 'alice@example.com', name: 'Alice', region: 'US' },
      { email: 'bob@example.com', name: 'Bob', region: 'EU' },
      { email: 'carol@example.com', name: 'Carol', region: 'APAC' },
    ],
    skipDuplicates: true,
  });

  // Seed Orders and OrderItems
  const alice = await prisma.user.findUnique({ where: { email: 'alice@example.com' } });
  if (alice) {
    const order = await prisma.order.create({
      data: {
        userId: alice.id,
        orderItems: {
          create: [
            { product: 'Laptop', quantity: 1, price: 1200.0 },
            { product: 'Mouse', quantity: 2, price: 25.0 },
          ],
        },
      },
    });
  }

  const bob = await prisma.user.findUnique({ where: { email: 'bob@example.com' } });
  if (bob) {
    await prisma.order.create({
      data: {
        userId: bob.id,
        orderItems: {
          create: [
            { product: 'Keyboard', quantity: 1, price: 75.0 },
          ],
        },
      },
    });
  }

  console.log('Seed data created.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
