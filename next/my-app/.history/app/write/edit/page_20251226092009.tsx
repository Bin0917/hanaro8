import { DropdownWrite } from '@/components/DropdownWrite';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function Edit() {
  return (
    <div className="flex flex-col gap-2">
      <form action={savePosts}>
        <div className="flex gap-2">
          <DropdownWrite />{' '}
          <Input name="title" type="text" placeholder="title..." />
        </div>
        <div>
          <Textarea name="content" placeholder="content..." />
        </div>
        <div className="flex justify-center gap-20 align-center text-white">
          <Button variant={'secondary'}>취소</Button>
          <Button variant={'destructive'}>삭제</Button>
          <Button variant={'apply'}>저장</Button>
        </div>
      </form>
    </div>
  );
}
