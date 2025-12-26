'use client';
import { DropdownWrite } from '@/components/DropdownWrite';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Form from '../../../.next/dev/types/link';
import { savePosts } from './posts.action';

export default function PostEdit() {
  const save = async(formData:FormData)
  return (
    <form action={savePosts} className="space-y-3">
      <div className="flex gap-2">
        {/* 강사님은 이렇게 안뽑아오시고 내부 코드 끌어와서 client 포맷으로 해서 만드심 */}
        <DropdownWrite />{' '}
        <Input name="title" type="text" placeholder="title..." />
      </div>
      <div className="flex gap-1">
        <Label htmlFor="isPrivate">
          <Checkbox
            id="isPrivate"
            name="private"
            className="data-[state=checked]:bg-amber-700"
          />{' '}
          비공개 글
        </Label>
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
  );
}
