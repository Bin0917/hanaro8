import { prisma } from '@/lib/prisma';
import { encryptPassword } from '@/lib/validator';

async function main() {
  const hashed = await encryptPassword('1234');

  await prisma.folder.createMany({
    data: [
      { title: 'JS/TS', readcnt: 0 },
      { title: 'Next', readcnt: 0 },
    ],
  });
  const folders = await prisma.folder.findMany();

  for (const { name, title } of data) {
    const email = `${name}@email.com`;
    const rs = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        name,
        email,
        Post: { create: { folder: 1, title, content: title } },
      },
    });
    console.log('🚀 ~ rs:', rs);
  }

  // 폴더 게시글 갯수
  for (const folder of folders) {
    const cnt = await prisma.post.count({ where: { folder: folder.id } });
    await prisma.folder.update({
      where: { id: folder.id },
      data: { readcnt: cnt },
    });
  }

  await prisma.user.create({
    data: {
      email: 'test@test.com',
      name: '테스트유저',
      passwd: hashed,
      isadmin: false,
    },
  });
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
