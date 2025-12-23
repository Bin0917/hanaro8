import type { PropsWithChildren } from 'react';

export default function CommentsLayout({ children }: PropsWithChildren) {
  return (
    <>
      <h1>이곳은 댓글란입니다~</h1>

      <div>{children}</div>
    </>
  );
}
