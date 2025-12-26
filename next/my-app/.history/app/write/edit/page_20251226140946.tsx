'use client';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { useActionState, useReducer, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { type Post, type PostError, savePosts } from './posts.action';

type Folder = {
  id: number;
  name: string;
  type?: 'text' | 'file';
};

const FOLDERS: Folder[] = [
  { id: 1, name: '공지사항' },
  { id: 2, name: '자유게시판' },
  { id: 3, name: '앨범', type: 'file' },
];

export default function PostEdit() {
  const [isOpen, toggleOpen] = useReducer((p) => !p, false);
  const [folder, setFolder] = useState<Folder>(FOLDERS[0]);
  const [post, setPost] = useState<Partial<Post>>();
  const [localPrivate, togglePrivate] = useReducer((p) => !p, false);
  const [localPubilc, togglePublic] = useReducer((p) => !p, false);

  const [postError, save, isPending] = useActionState(
    async (_: PostError | undefined, formData: FormData) => {
      formData.set('isprivate', localPrivate ? 'on' : '');
      const [err, data] = await savePosts(formData);
      if (err) {
        setPost(err.data);
        return err;
      }
      setPost(data);
      console.log('savedData >>>', data);
    },
    undefined,
  );

  // const save = async (formData: FormData) => {
  //   const [err, data] = await savePosts(formData);
  //   if (err) return err;
  //   return data;
  // };
  return (
    <form action={save} className="space-y-3">
      <div className="flex gap-2">
        {/* 강사님은 이렇게 안뽑아오시고 내부 코드 끌어와서 client 포맷으로 해서 만드심 */}
        <DropdownMenu onOpenChange={toggleOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant={'outline'}>
              {folder.name}
              {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>게시판 선택</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {FOLDERS.map((folder) => (
              <DropdownMenuItem
                key={folder.id}
                onClick={() => setFolder(folder)}
              >
                {folder.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Input type="text" name="folder" defaultValue={folder.id} />

        <Input
          name="title"
          type="text"
          defaultValue={post?.title}
          placeholder="title..."
        />
      </div>
      <div className="flex gap-1">
        <Label htmlFor="isPrivate">
          <Checkbox
            id="isPrivate"
            name="isprivate"
            className="data-[state=checked]:bg-amber-700"
            checked={localPrivate}
            // // 동작안함 아래거
            // onCheckedChange={(checked) => {
            //   // if (post) setPost({ ...post, isprivate: isprivate === true });
            //   setLocalPrivate(checked === true || !!post?.isprivate);
            // }}
            onClick={togglePrivate}
          />{' '}
          비공개 글 {post?.isprivate ? 'True' : 'False'} ::{' '}
          {localPrivate ? 'True' : 'False'}
        </Label>
        <Label htmlFor="isPublic">
          <Checkbox
            id="isPublic"
            name="ispublic"
            className="data-[state=checked]:bg-amber-700"
            checked={localPublic}
            // // 동작안함 아래거
            // onCheckedChange={(checked) => {
            //   // if (post) setPost({ ...post, isprivate: isprivate === true });
            //   setLocalPrivate(checked === true || !!post?.isprivate);
            // }}
            onClick={togglePublic}
          />{' '}
          비공개 글 {post?.ispublic ? 'True' : 'False'} ::{' '}
          {localPublic ? 'True' : 'False'}
        </Label>
      </div>
      {folder.type === 'file' ? (
        <Input
          type="file"
          name="filex"
          className="cursor-pointer hover:bg-muted"
        />
      ) : (
        <Textarea
          name="content"
          defaultValue={post?.content}
          placeholder="content..."
        />
      )}

      {!!postError && <span className="text-red-500">{postError.error}</span>}

      <div className="flex justify-around text-white">
        {/* 버튼 타입 잘 주기 */}
        <Button type="reset" variant={'secondary'}>
          취소
        </Button>
        <Button type="button" variant={'destructive'}>
          삭제
        </Button>
        <Button type="submit" variant={'apply'} disabled={isPending}>
          저장{isPending && '...'}
        </Button>
      </div>
    </form>
  );
}
