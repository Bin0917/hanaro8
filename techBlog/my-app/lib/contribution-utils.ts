// count를 level(0-4)로 변환
export function getLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 10) return 3;
  return 4;
}

// 최근 1년 빈 데이터 생성
export function generateEmptyYear() {
  const data = [];
  const today = new Date();

  for (let i = 365; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // 로컬 타임존 고려
    const localDateStr = date.toLocaleDateString('en-CA'); // YYYY-MM-DD

    data.push({
      date: localDateStr,
      count: 0,
      level: 0 as 0 | 1 | 2 | 3 | 4,
    });
  }

  return data;
}

// DB 데이터를 Activity 배열로 변환
export function toActivityData(
  posts: { createdAt: Date }[],
): { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }[] {
  // 날짜별 게시글 수 집계
  const countByDate = new Map<string, number>();

  posts.forEach((post) => {
    const dateStr = post.createdAt.toISOString().split('T')[0];
    countByDate.set(dateStr, (countByDate.get(dateStr) || 0) + 1);
  });

  // 1년치 데이터 생성
  const data = generateEmptyYear();

  // 실제 데이터 채우기
  data.forEach((item) => {
    const count = countByDate.get(item.date) || 0;
    item.count = count;
    item.level = getLevel(count);
  });
  return data;
}
