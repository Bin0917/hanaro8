import { DropdownWrite } from '@/components/DropdownWrite';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function Edit() {
  const savePosts = async (formData: FormData) => {
    console.log(Object.fromEntries(formData.entries()));
  };
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
