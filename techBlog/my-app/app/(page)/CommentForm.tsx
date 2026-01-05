// components/CommentForm.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { saveComment } from '@/lib/posts.action';
import type { ValidError } from '@/lib/validator';

type Props = {
  postId: number;
  userId: number;
  folderId: number | undefined;
};

// 현재 작성중인 유저의 id
export default function CommentForm({ postId, userId, folderId }: Props) {
  const router = useRouter();
  // ✅ useActionState로 자동 관리
  const [validError, writeForm, isPending] = useActionState(
    async (_: ValidError | undefined, formData: FormData) => {
      const [err, _data] = await saveComment(formData);
      if (err) return err as ValidError;
      if (folderId) {
        router.push(`/${folderId}`);
      } else {
        router.push('/');
      }
    },
    undefined,
  );

  return (
    <form action={writeForm} className="mt-6">
      <textarea
        name="content"
        placeholder="댓글을 입력하세요..."
        rows={3}
        className="w-full rounded border p-2"
        disabled={isPending}
      />
      <Input type="hidden" name="post_id" value={postId} />
      <Input type="hidden" name="writer_id" value={userId} />

      {validError?.error && (
        <p className="mt-1 text-red-500 text-sm">{validError?.error.content}</p>
      )}

      <Button type="submit" disabled={isPending} className="mt-2">
        {isPending ? '작성 중...' : '댓글 작성'}
      </Button>
    </form>
  );
}
