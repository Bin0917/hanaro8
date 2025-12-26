'use client';

import { useId, useReducer } from 'react';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Switch } from './ui/switch';

type CsProp = {
  type?: 'check' | 'switch';
  name?: string;
  label?: string;
  checked?: boolean; // 변경요망
  setCheckedAction?: (checked: boolean) => void;
  variant: 'destructive' | 'muted' | 'secondary' | 'default';
};

export default function CheckSwitch({
  name,
  label,
  type = 'check',
  checked = false,
  variant,
  setCheckedAction,
}: CsProp) {
  const checkId = useId();
  const [isCheck, toggleCheck] = useReducer((p) => !p, !!checked);
  const Comp = type === 'switch' ? Switch : Checkbox;

  return (
    <Label htmlFor={checkId}>
      <Comp
        id={checkId}
        name={name}
        checked={checked}
        onClick={() => {
          toggleCheck();
          if (setCheckedAction) setCheckedAction(!isCheck);
        }}
      />

      {label}
    </Label>
  );
}
