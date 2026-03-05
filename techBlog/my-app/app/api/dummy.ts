export const DUMMY_USERS = [
  {
    id: 1,
    email: 'admin@beans.com',
    name: 'Gemmin Teacher',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    isadmin: true,
    // passwd는 보안상 실제 데이터 객체에서는 보통 제외하거나 해시값으로 시뮬레이션합니다.
  },
  {
    id: 2,
    email: 'user1@test.com',
    name: '코딩초보',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1',
    isadmin: false,
  },
];

export const DUMMY_FOLDERS = [
  { id: 1, name: 'JavaScript', slug: 'js' },
  { id: 2, name: 'TypeScript', slug: 'ts' },
  { id: 3, name: 'Next.js', slug: 'nextjs' },
];

export const DUMMY_POSTS = [
  {
    id: 101,
    title: 'Next.js 16의 새로운 라우팅 시스템 이해하기',
    content: 'Next.js 16에서 App Router가 어떻게 진화했는지 알아봅시다...',
    createdAt: new Date('2026-01-01T10:00:00Z'),
    updatedAt: new Date('2026-01-01T10:00:00Z'),
    folderId: 3, // Next.js 폴더
    writerId: 1, // Gemmin Teacher가 작성
  },
  {
    id: 102,
    title: 'TypeScript 기초: 인터페이스 vs 타입 별칭',
    content: '초보자를 위한 타입스크립트 가이드입니다. 무엇을 써야 할까요?',
    createdAt: new Date('2026-01-02T14:30:00Z'),
    updatedAt: new Date('2026-01-02T14:30:00Z'),
    folderId: 2, // TypeScript 폴더
    writerId: 1,
  },
];

export const DUMMY_COMMENTS = [
  {
    id: 1,
    content: '우와, 정리가 너무 잘 되어 있네요! 큰 도움이 되었습니다.',
    createdAt: new Date('2026-01-02T15:00:00Z'),
    postId: 101, // 101번 게시글에 달린 댓글
    writerId: 2, // '코딩초보'가 작성
  },
  {
    id: 2,
    content: '혹시 Next.js 15와 차이점이 더 있을까요?',
    createdAt: new Date('2026-01-02T16:20:00Z'),
    postId: 101,
    writerId: 1, // Gemmin Teacher가 답글 느낌으로 작성
  },
];
