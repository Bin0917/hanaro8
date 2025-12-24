import { DropdownWrite } from '@/components/DropdownWrite';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Write() {
  return (
    <>
      <div>
        <DropdownWrite /> <Input type="text" placeholder="title..." />
      </div>
      <div>
        <Input type="text" placeholder="content..." />
      </div>
      <div className="flex gap-3 text-white">
        <Button variant={'secondary'}>취소 </Button>
        <Button variant={'destructive'} />
        <Button variant={'apply'} />
      </div>
    </>
  );
}
