'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { deleteComment } from '@/lib/posts.action';

type Props = {
  comment: {
    id: number;
    writer_id: number;
    createdAt: Date;
    content: string;
    post_id: number;
    User: {
      id: number;
      name: string;
      // 필요한 다른 필드
    };
  };
  currentUserId: number;
};

export default function CommentItem({ comment, currentUserId }: Props) {
  const isOwner = !!(comment.writer_id === currentUserId);
  const [isDelete, setIsDelete] = useState(false);
  return (
    <div className="rounded-md border p-3 shadow-2xs">
      {/* 작성자 & 게시시간 */}
      <div className="text-sm">
        <p className="border-b p-1">{comment.User.name}</p>
        <div className="p-2">{comment.content}</div>
      </div>
      {/* QQQ 댓글 내용 => 아래 리팩토링 필요 */}
      {isOwner && (
        <div className="flex justify-end gap-2 p-2 text-red-400 text-xs">
          <p className="text-gray-400">
            {comment.createdAt.toLocaleDateString()}{' '}
            {comment.createdAt.toLocaleTimeString()}
          </p>
          <Button
            variant="link"
            onClick={() => {
              setIsDelete(true);
              // forlderid가 필요
              deleteComment(comment.id);
              setIsDelete(false);
            }}
            disabled={isDelete}
          >
            Delete{isDelete && '...'}
          </Button>
        </div>
      )}
    </div>
  );
}
