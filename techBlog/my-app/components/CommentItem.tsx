'use client';
import { ListPlus, PenLine, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { deleteComment } from '@/lib/posts.action';
import CommentForm from './CommentForm';

export type Comment = {
  id: number;
  writer_id: number;
  createdAt: Date;
  content: string;
  post_id: number;
  parentId: number | null;
  User: {
    id: number;
    name: string;
    // 필요한 다른 필드
  };
  replies?: Comment[];
};

type Props = {
  comment: Comment;
  currentUserId: number;
  folderId: number | undefined;
  isAdmin: boolean;
  isChild?: boolean;
};

export default function CommentItem({
  comment,
  currentUserId,
  folderId,
  isAdmin,
  isChild = false,
}: Props) {
  const isOwner = !!(comment.writer_id === currentUserId);

  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false);

  return (
    // {editingId === comment.writer_id ?
    //     <CommentForm postId={}/>

    //     :}
    <div className="rounded-md border p-3 shadow-xs">
      {/* 작성자 & 게시시간 */}
      <div className="text-sm">
        <p className="border-b p-1">{comment.User.name}</p>

        {isEditing ? (
          <CommentForm
            mode="edit"
            commentId={comment.id}
            postId={comment.post_id}
            userId={currentUserId}
            content={comment.content}
            onCancelAction={() => setIsEditing(false)}
            folderId={folderId}
          />
        ) : (
          <div className="p-2">{comment.content}</div>
        )}
      </div>
      <p className="flex justify-end text-gray-400 text-xs">
        {comment.createdAt.toLocaleDateString()}{' '}
        {comment.createdAt.toLocaleTimeString()}
      </p>
      {/* QQQ 댓글 내용 => 아래 리팩토링 필요 */}
      {(isOwner || isAdmin === true) && (
        <div className="flex justify-end gap-2 p-2 text-red-400 text-xs">
          {!isEditing && (
            <Button variant="link" onClick={() => setIsEditing(true)}>
              <PenLine />
            </Button>
          )}
          {/* 댓글 삭제 버튼 */}
          <Button
            variant="link"
            onClick={async () => {
              setIsDeleting(true);
              await deleteComment(comment.id, folderId);
              setIsDeleting(false);
            }}
            disabled={isDeleting}
          >
            <X />
          </Button>
        </div>
      )}
      {!isChild && (
        <Button variant="link" onClick={() => setIsReplying((v) => !v)}>
          <ListPlus />
        </Button>
      )}
      {isReplying && (
        <CommentForm
          mode="create"
          postId={comment.post_id}
          userId={currentUserId}
          // ✅ CommentForm 내부에 parent_id hidden input 추가하도록 props로 parentId 전달
          parentId={comment.id}
          onCancelAction={() => setIsReplying((v) => !v)}
          folderId={folderId}
        />
      )}
    </div>
  );
}
