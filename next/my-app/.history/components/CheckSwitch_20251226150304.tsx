'use client';

import { useActionState, useReducer, useState } from 'react';
import {
  type Post,
  type PostError,
  savePosts,
} from '@/app/write/edit/posts.action';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Switch } from './ui/switch';

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
  const [post, setPost] = useState<Partial<Post>>();
  const [localPrivate, togglePrivate] = useReducer((p) => !p, false);

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
    <Label htmlFor={name}>
      {type === 'check' ? (
        
          <Checkbox
            id={name}
            name={name}
            className="data-[state=checked]:bg-amber-700"
            checked={localPrivate}
            onClick={togglePrivate}
          />{' '}
          {label}
        
      ) : (
          <Switch
            id={name}
            name={name}
            className="data-[state=checked]:bg-amber-700"
          />{' '}
          공개요 글
      )}
      </Label>
  );
}
