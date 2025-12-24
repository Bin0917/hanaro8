import { DropdownWrite } from '@/components/DropdownWrite';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Write() {
  return (
    <>
      <div className="flex gap-1">
        <DropdownWrite /> <Input type="text" placeholder="title..." />
      </div>
      <div>
        <Input type="text" placeholder="content..." />
      </div>
      <div className="flex justify-center gap-3 align-center text-white">
        <Button variant={'secondary'}>취소</Button>
        <Button variant={'destructive'}>삭제</Button>
        <Button variant={'apply'}>저장</Button>
      </div>
    </>
  );
}
