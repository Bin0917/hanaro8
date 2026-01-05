'use client';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import type { Route } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useActionState, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { savePostAction } from '@/lib/posts.action';
import type { ValidError } from '@/lib/validator';

// type FOLDERS = {
//   title: string;
//   id: number;
//   readcnt: number;
// };

type Folder = {
  id: number;
  title: string;
  readcnt: number;
};
type WriteFormProps = {
  folders: Folder[];
  post?: {
    // 수정 모드용
    id: number;
    title: string;
    content: string | null;
  };
};

export default function WriteForm({ folders, post }: WriteFormProps) {
  const router = useRouter();
  const [folder, setFolder] = useState<Folder>();
  const [isOpen, toggleOpen] = useState(false);
  const [_validError, savePost, isPending] = useActionState(
    async (_: ValidError | undefined, formData: FormData) => {
      // 저장 후 에러메시지 송출, 성공시 folderId -> data
      const [error, data] = await savePostAction(formData);
      if (error) return error as ValidError;
      const redirectTo = `/${data}`;
      router.push(redirectTo as Route);
    },
    undefined,
  );
  return (
    <div className="rounded-md border p-3 shadow-2xs">
      <h1 className="mb-3 text-center font-semibold text-2xl">
        {' '}
        {post ? '게시글 수정' : '게시글 작성'}
      </h1>
      {/* submit 버튼 클릭시, action 내부 save 함수 실행 => 서버액션?*/}
      <form action={savePost} className="space-y-3">
        <div className="flex gap-2">
          <DropdownMenu onOpenChange={toggleOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant={'outline'} type="button">
                {folder ? folder?.title : 'Select'}
                {/* useReducer로 열림 유무 저장. 해당 플래그로 아이콘 상태 핸들링 */}
                {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>게시판 선택</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {folders.map((folder) => (
                <DropdownMenuItem
                  key={folder.id}
                  onClick={() => setFolder(folder)}
                >
                  {folder?.title}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {/* 폴더 id, post id formData로 실어 보내주기 */}
          <Input type="hidden" name="folder" value={folder?.id} />
          <Input type="hidden" name="postId" value={post?.id} />
          <Input
            name="title"
            type="text"
            placeholder="Input title"
            defaultValue={post?.title ?? ''}
            disabled={isPending}
          />
        </div>

        <Textarea
          name="content"
          placeholder="Input content"
          defaultValue={post?.content ?? ''}
          disabled={isPending}
        />

        {/* {!!validError && (
          // 잠시대기
          <span className="text-red-500">{validError.error}</span>
        )} */}

        <div className="flex justify-around text-white">
          {/* 버튼 타입 잘 주기 */}
          <Link href={'/'}>
            <Button variant={'secondary'} disabled={isPending}>돌아가기</Button>
          </Link>
          <Button type="submit" disabled={isPending}>
            저장{isPending && '...'}
          </Button>
        </div>
      </form>
    </div>
  );
}
