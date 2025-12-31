import { prisma } from '@/lib/prisma';

// prisma는 generate 해줘야 folder 등 기능을 쓸 수 잇음
async function main() {
  const rs = prisma.folder.upsert;
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('PrismaError>>', e);
    await prisma.$disconnect();
    process.exit(1);
  });

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
