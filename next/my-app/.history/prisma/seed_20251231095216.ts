import { prisma } from '@/lib/prisma';

// prisma는 generate 해줘야 folder 등 기능을 쓸 수 잇음
async function main() {
  const folder = await prisma.folder.upsert({
    where: { title: 'JS/TS' }, // 1. 제목이 'JS/TS'인 폴더가 있는지 찾아봐!
    update: {}, // 2. 있으면? 아무것도 안 하고 그냥 그 데이터를 가져와!
    create: { title: 'JS/TS' }, // 3. 없으면? 새로 만들어!
  });

  console.log(folder);
  for (const { name, title } of data) {
    const email = `${name}@email.com`;
    const rs = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        name,
        email,
        Post: {
          create: {
            folder: folder.id, // 위에서 만든 폴더 ID를 연결!

            title,
            content: title,
          },
        },
      },
    });
    console.log(rs);
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
