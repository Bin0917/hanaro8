'use client';

import { useId, useReducer } from 'react';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';

type CsProp = {
  type?: 'check' | 'switch';
  name?: string;
  label?: string;
  checked?: boolean; // 변경요망
  setCheckedAction?: (checked: boolean) => void;
};

export default function CheckSwitch({
  name,
  label,
  type = 'check',
  checked = false,
  setCheckedAction,
}: CsProp) {
  const checkId = useId();
  const [isCheck, toggleCheck] = useReducer((p) => !p, !!checked);
  const Comp = type === 'switch' ? Switch : Checkbox;

  return (
    <Label htmlFor={checkId} className="cursor-pointer">
      <Comp
        id={checkId}
        checked={isCheck}
        onClick={() => {
          toggleCheck();
          if (setCheckedAction) setCheckedAction(!isCheck);
        }}
      />
      {label} - {isCheck ? 'checked' : 'unchecked'}
      {!!name && (
        <Input type="hidden" name={name} value={isCheck ? 'on' : ''} />
      )}
    </Label>
  );
}
