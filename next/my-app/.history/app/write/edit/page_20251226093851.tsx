import { DropdownWrite } from '@/components/DropdownWrite';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { savePosts } from './posts.action';

const FOLDERS = [
  { id: 1, name: '공지사항' },
  { id: 2, name: '자유게시판' },
  { id: 3, name: '앨범', type: 'file' },
];

export default function PostEdit() {
  return (
    <div className="flex flex-col gap-2 space-y-2">
      <form action={savePosts}>
        <div className="flex gap-2">
          <DropdownWrite />{' '}
          <Input name="title" type="text" placeholder="title..." />
        </div>
        <div>
          <Textarea name="content" placeholder="content..." />
        </div>
        <div className="flex justify-around text-white">
          {/* 버튼 타입 잘 주기 */}
          <Button type="reset" variant={'secondary'}>
            취소
          </Button>
          <Button type="button" variant={'destructive'}>
            삭제
          </Button>
          <Button type="submit" variant={'apply'}>
            저장
          </Button>
        </div>
      </form>
    </div>
  );
}
