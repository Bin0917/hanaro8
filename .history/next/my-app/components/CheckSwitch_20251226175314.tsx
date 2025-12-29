'use client';

import { useId, useReducer } from 'react';
import { cn } from '@/lib/utils';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';

type CsProp = {
  type?: 'check' | 'switch';
  name?: string;
  label?: string;
  checked?: boolean;
  setCheckedAction?: (checked: boolean) => void;
  variant?: 'default' | 'muted' | 'destructive' | 'secondary';
};

// variant 세팅을 위한 틀 생성
const setClassnames = (variant: CsProp['variant'] | 'primary') => [
  `border-${variant}`,
  `bg-${variant}`,
  `text-${variant}-foreground`,
];
// 입력받은 variant와 setClassnames 맵핑
const CheckVarint = {
  default: setClassnames('primary'),
  destructive: setClassnames('destructive'),
  secondary: setClassnames('secondary'),
  muted: setClassnames('muted'),
};

export default function CheckSwitch({
  name,
  label,
  type = 'check',
  checked = false,
  variant = 'default',
  setCheckedAction,
}: CsProp) {
  //뭐 값을 넘겨주기 애매한데 id로 엮어야한다? => useId 사용!
  const checkId = useId();
  const [isCheck, toggleCheck] = useReducer((p) => !p, !!checked);

  // 맵핑된 css 배열 담기
  const css = CheckVarint[variant];

  console.log(css);

  const Comp = type === 'switch' ? Switch : Checkbox;

  return (
    // id로 묶어서 글자만 눌러도 클릭 됨
    <Label htmlFor={checkId} className="cursor-pointer">
      <Comp
        id={checkId}
        checked={isCheck}
        onClick={() => {
          toggleCheck();
          if (setCheckedAction) setCheckedAction(!isCheck);
        }}
        // 배열에 담긴거 돌면서 variant 적용
        className={cn(css.map((cs) => `data-[state=checked]:${cs}`))}
      />
      {label} - {isCheck ? 'checked' : 'unchecked'}
      {/* hidden 인풋에 백엔드로 전달해야 할 값들을 얹어 보내버림! */}
      {!!name && (
        <Input type="hidden" name={name} defaultValue={isCheck ? 'on' : ''} />
      )}
    </Label>
  );
}
