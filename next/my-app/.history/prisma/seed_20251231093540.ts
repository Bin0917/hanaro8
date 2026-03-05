import { prisma } from '@/lib/prisma';

// prisma는 generate 해줘야 folder 등 기능을 쓸 수 잇음
async function main() {
  const folder = await prisma.folder.upsert({
    where: { title: 'JS/TS' },
    update: {},
    create: { title: 'JS/TS' },
  });

  console.log(folder);
  for (const { name, title } of data) {
  }
}

const data = [
  {
    name: 'hong',
    title: 'post1',
  },
  {
    name: 'kim',
    title: 'post2',
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
