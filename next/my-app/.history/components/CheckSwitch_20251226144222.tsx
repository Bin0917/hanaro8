'use client';

import { useActionState } from 'react';
import { savePosts } from '@/app/write/edit/posts.action';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';

type CsProp = {
  name: string;
  label: string;
  type: 'check' | 'switch';
  checkValue: string; // 변경요망
  variant: 'destructive' | 'muted' | 'secondary' | 'default';
};

export default function CheckSwitch({
  name,
  label,
  type,
  checkValue,
  variant,
}: CsProp) {
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
  return (
    <>
      {type === 'check' && (
        <Label htmlFor="isPrivate">
          <Checkbox
            id="isPrivate"
            name={name}
            className="data-[state=checked]:bg-amber-700"
            checked={localPrivate}
            // // 동작안함 아래거
            // onCheckedChange={(checked) => {
            //   // if (post) setPost({ ...post, isprivate: isprivate === true });
            //   setLocalPrivate(checked === true || !!post?.isprivate);
            // }}
            onClick={togglePrivate}
          />{' '}
          {label}
        </Label>
      )}
    </>
  );
}
