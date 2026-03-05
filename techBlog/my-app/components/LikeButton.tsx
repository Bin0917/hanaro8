'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { toggleLike } from '@/lib/posts.action';

type Props = {
  postId: number;
  userId: number | null;
  initialLikeCount: number;
  initialLiked: boolean;
};

export default function LikeButton({
  postId,
  userId,
  initialLikeCount,
  initialLiked,
}: Props) {
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isLiked, setIsLiked] = useState(initialLiked);

  // biome-ignore lint/correctness/useExhaustiveDependencies: to toggle -> notchage_Errorfix
  useEffect(() => {
    setIsLiked(initialLiked); // initialLiked 반영
    setLikeCount(initialLikeCount); //  initialLikeCount도 같이 반영
  }, [postId, userId, initialLiked, initialLikeCount]);

  const changeLikeState = async () => {
    if (!userId) return;

    // toggleLike가 { likeCount, liked }를 리턴한다고 가정
    const result = await toggleLike(postId, userId);

    setLikeCount(result.likeCount); // result가 숫자가 아니라 객체라서 .likeCount로
    setIsLiked(result.liked); // 서버가 준 liked를 그대로 반영
  };

  return (
    <Button
      onClick={changeLikeState}
      variant="outline"
      className="flex items-center gap-1"
      disabled={userId === null}
      aria-label="좋아요"
    >
      <span>{isLiked ? '❤️' : '🤍'}</span>
      <span>{likeCount}</span>
    </Button>
  );
}
