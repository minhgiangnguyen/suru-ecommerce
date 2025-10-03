// import { PrismaClient } from '@prisma/client';
// import * as bcrypt from 'bcrypt';

// const prisma = new PrismaClient();

// async function main() {
//   const adminPasswordHash = await bcrypt.hash('admin123', 10);
//   await prisma.user.upsert({
//     where: { username: 'admin' },
//     update: {},
//     create: { username: 'admin', passwordHash: adminPasswordHash, role: 'admin' },
//   });

//   const product1 = await prisma.product.create({
//     data: {
//       name: 'Suzu Cup',
//       favicon: 'https://example.com/favicon1.png',
//       topbarColor: '#ff6b6b',
//       description: 'A beautiful ceramic cup.',
//       category: 'Kitchen',
//       price: 20,
//       salePercent: 10,
//     },
//   });

//   const product2 = await prisma.product.create({
//     data: {
//       name: 'Suzu Plate',
//       favicon: 'https://example.com/favicon2.png',
//       topbarColor: '#4dabf7',
//       description: 'A stylish plate.',
//       category: 'Kitchen',
//       price: 15,
//       salePercent: 5,
//     },
//   });

//   await prisma.productImage.createMany({
//     data: [
//       { productId: product1.id, imageUrl: 'https://picsum.photos/seed/p1-1/600/400', position: 'first' },
//       { productId: product1.id, imageUrl: 'https://picsum.photos/seed/p1-2/600/400', position: 'slide' },
//       { productId: product2.id, imageUrl: 'https://picsum.photos/seed/p2-1/600/400', position: 'first' },
//     ],
//   });

//   // Features are now stored as JSON in Product model
//   // Quantity labels removed as they're not in current schema

//   await prisma.review.createMany({
//     data: [
//       { productId: product1.id, authorName: 'Alice', rating: 5, comment: 'Love this cup!' },
//       { productId: product1.id, authorName: 'Bob', rating: 4, comment: 'Nice quality.' },
//     ],
//   });
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });


