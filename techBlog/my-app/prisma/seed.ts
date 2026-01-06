import { prisma } from '@/lib/prisma';
import { encryptPassword } from '@/lib/validator';

async function main() {
  // 0) 개발용 초기화(원하면 주석 처리)
  // FK cascade가 걸려 있어도, 안전하게 자식 -> 부모 순으로 지우는 편이 무난함.
  await prisma.like.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.folder.deleteMany();

  // 1) 폴더 생성
  const folderTitles = ['JS/TS', 'Next', 'React', 'Prisma'] as const;

  await prisma.folder.createMany({
    data: folderTitles.map((title) => ({ title, readcnt: 0 })),
  });

  const folders = await prisma.folder.findMany({
    where: { title: { in: [...folderTitles] } },
  });

  const folderIdByTitle = new Map(folders.map((f) => [f.title, f.id]));

  // 2) 테스트 유저(항상 이 유저가 글 쓰게)
  const hashed = await encryptPassword('1234');

  const testUser = await prisma.user.upsert({
    where: { email: 'test@test.com' },
    update: {
      name: '테스트유저',
      isadmin: true,
      // passwd는 굳이 매번 업데이트 안 해도 되면 빼도 됨
      passwd: hashed,
    },
    create: {
      email: 'test@test.com',
      name: '테스트유저',
      passwd: hashed,
      isadmin: true,
    },
  });

  // 3) 폴더별 게시글 1개씩(컨셉/내용 채움)
  const posts = [
    {
      folderTitle: 'JS/TS',
      title: 'JS/TS 컨셉: 실행 컨텍스트·클로저 한 번에 정리',
      content:
        'JS는 “스코프/실행컨텍스트/클로저”를 이해하면 비동기 코드가 덜 무섭다.\n\nTS는 타입을 “완벽히” 만들기보다, 경계(입력/응답/props)에서부터 좁혀가면 유지보수가 쉬워진다.\n\n예: unknown → 타입가드 → union narrowing.',
    },
    {
      folderTitle: 'Next',
      title: 'Next 컨셉: App Router에서 Server/Client 경계 잡기',
      content:
        '데이터 패칭/권한/리다이렉트는 Server 쪽에서 처리하고, UI 인터랙션은 Client 컴포넌트로 분리하는 게 핵심.\n\n스토리북에서도 “서버 의존 없는 View 컴포넌트”만 올리면 훨씬 안정적으로 관리된다.',
    },
    {
      folderTitle: 'React',
      title: 'React 컨셉: 상태 위치와 컴포넌트 분리 전략',
      content:
        '재사용성을 올리려면 상태를 어디에 둘지부터 결정해야 한다.\n\nList/Item 구조는 Container(데이터/액션)와 View(UI)를 분리하면, 테스트/스토리북/리팩터링이 쉬워진다.',
    },
    {
      folderTitle: 'Prisma',
      title: 'Prisma 컨셉: 관계형 모델링과 seed를 “재실행 가능”하게',
      content:
        'seed는 개발 생산성을 위해 같은 데이터를 빠르게 재구성하는 목적이 크다.\n\nUnique 키가 있는 엔티티(User email 등)는 upsert를 쓰고, 나머지는 dev에서는 deleteMany 후 createMany로 단순하게 가는 편이 편하다.',
    },
  ] as const;

  const dataForCreateMany = posts.map((p) => {
    const folderId = folderIdByTitle.get(p.folderTitle);
    if (folderId == null) {
      throw new Error(`Seed error: folder not found: ${p.folderTitle}`);
    }

    return {
      folder: folderId,
      writer: testUser.id,
      title: p.title,
      content: p.content,
    };
  });

  await prisma.post.createMany({ data: dataForCreateMany });

  // 4) 폴더 readcnt = 게시글 수로 갱신
  for (const folder of folders) {
    const cnt = await prisma.post.count({ where: { folder: folder.id } });
    await prisma.folder.update({
      where: { id: folder.id },
      data: { readcnt: cnt },
    });
  }
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
