'use client';

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
}: CsProp) {}
