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
  variant? : 'default' | 'muted' | ''
};

function setClassnames = (variant : CsProp['variant']) => {

}
const CheckVarint = {
    default: {
        border: 'border',
            bg:'bg'
    }
}

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
        className={cn('')}
      />
      {label} - {isCheck ? 'checked' : 'unchecked'}
      {/* hidden 인풋에 백엔드로 전달해야 할 값들을 얹어 보내버림! */}
      {!!name && (
        <Input type="hidden" name={name} defaultValue={isCheck ? 'on' : ''} />
      )}
    </Label>
  );
}
