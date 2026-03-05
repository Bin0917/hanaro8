'use client';

import { Check, CheckCheck, Undo2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { saveComment, updateComment } from '@/lib/posts.action';
import type { ValidError } from '@/lib/validator';

type Props = {
  postId: number;
  userId: number;
  folderId: number | undefined;
  // edit 모드용
  mode?: 'create' | 'edit';
  commentId?: number;
  content?: string;
  // 토글창edit 닫기용
  onCancelAction?: () => void;
  parentId?: number;
};

// 현재 작성중인 유저의 id
export default function CommentForm({
  postId,
  userId,
  folderId,
  mode = 'create',
  commentId,
  content,
  onCancelAction,
  parentId,
}: Props) {
  const [draft, setDraft] = useState(content ?? '');

  useEffect(() => {
    setDraft(content ?? '');
  }, [content]);

  const router = useRouter();

  const [validError, writeForm, isPending] = useActionState(
    async (_: ValidError | undefined, formData: FormData) => {
      const [err, _data] =
        mode === 'edit'
          ? await updateComment(formData)
          : await saveComment(formData);
      if (err) return err as ValidError;

      if (mode === 'edit') {
        router.refresh();
        onCancelAction?.();
      } else {
        if (folderId) {
          router.push(`/${folderId}`);
          onCancelAction?.();
        } else {
          router.push('/');
          onCancelAction?.();
        }
      }
    },
    undefined,
  );

  return (
    <form action={writeForm} className="mt-6">
      <textarea
        name="content"
        placeholder="Write Comment!"
        rows={3}
        className="w-full rounded p-2 shadow-md"
        disabled={isPending}
        //수정시 기존 데이터 넣어주기
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
      />
      <Input type="hidden" name="post_id" value={postId} />
      <Input type="hidden" name="writer_id" value={userId} />
      {mode === 'edit' && (
        <Input type="hidden" name="comment_id" value={commentId ?? ''} />
      )}
      {parentId && <Input type="hidden" name="parent_id" value={parentId} />}

      {validError?.error && (
        <p className="mt-1 text-red-500 text-sm">{validError?.error.content}</p>
      )}

      <div className="flex justify-center gap-3 p-3">
        <Button aria-label="수정" type="submit" disabled={isPending}>
          {isPending ? (
            mode === 'edit' && '...'
          ) : mode === 'edit' ? (
            <CheckCheck />
          ) : (
            <Check />
          )}
        </Button>

        {/* 수정모드일 때 취소 버튼 */}
        {mode === 'edit' && (
          <Button
            type="button"
            variant="outline"
            onClick={() => onCancelAction?.()}
            disabled={isPending}
            aria-label="취소"
          >
            <Undo2 />
          </Button>
        )}
      </div>
    </form>
  );
}
