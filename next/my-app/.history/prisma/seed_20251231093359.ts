import { prisma } from '@/lib/prisma';

// prisma는 generate 해줘야 folder 등 기능을 쓸 수 잇음
async function main() {
  const rs = await prisma.folder.upsert({
    where: { title: 'JS/TS' },
    update: {},
    create: { title: 'JS/TS' },
  });
}

const data = [
  {
    name: 'hong',
    Post: {
      folder: 1,
      title: 'post1',
    },
  },
  {
    name: 'kim',
    Post: {
      folder: 1,
      title: 'post2',
    },
  },
];

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('PrismaError>>', e);
    await prisma.$disconnect();
    process.exit(1);
  });
