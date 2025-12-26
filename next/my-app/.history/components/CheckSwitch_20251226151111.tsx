'use client';

import { useReducer } from 'react';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Switch } from './ui/switch';

type CsProp = {
  name: string;
  label: string;
  type: 'check' | 'switch';
  checkValue: 'CheckedState | undefined'; // 변경요망
  variant: 'destructive' | 'muted' | 'secondary' | 'default';
};

export default function CheckSwitch({
  name,
  label,
  type,
  checkValue,
  variant,
}: CsProp) {
  //   const [post, setPost] = useState<Partial<Post>>();
  const [localPrivate, togglePrivate] = useReducer((p) => !p, false);

  //   const [postError, save, isPending] = useActionState(
  //     async (_: PostError | undefined, formData: FormData) => {
  //       formData.set('isprivate', localPrivate ? 'on' : '');
  //       const [err, data] = await savePosts(formData);
  //       if (err) {
  //         setPost(err.data);
  //         return err;
  //       }
  //       setPost(data);
  //       console.log('savedData >>>', data);
  //     },
  //     undefined,
  //   );
  return (
    <Label htmlFor={name}>
      {type === 'check' ? (
        <Checkbox
          id={name}
          name={name}
          className="data-[state=checked]:bg-amber-700"
          //   체크 유무를 그냥 클릭으로만 일단 판별
          defaultChecked={checkValue}
          onClick={togglePrivate}
        />
      ) : (
        <Switch
          id={name}
          name={name}
          className="data-[state=checked]:bg-amber-700"
        />
      )}
      {label}
    </Label>
  );
}
