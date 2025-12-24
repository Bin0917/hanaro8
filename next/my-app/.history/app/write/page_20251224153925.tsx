import { DropdownWrite } from '@/components/DropdownWrite';
import { Input } from '@/components/ui/input';

export default function Write() {
  return (
    <>
      <div>
        <DropdownWrite /> <Input type="text" placeholder="title..." />
      </div>
      <div></div>
    </>
  );
}
