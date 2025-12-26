'use client';

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
  return (
    <>
      {type === 'check' && (
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
      )}
    </>
  );
}
