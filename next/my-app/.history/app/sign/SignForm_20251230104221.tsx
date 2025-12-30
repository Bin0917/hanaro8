'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginEmail } from '@/lib/sign.action';

type Props = {
  redirectTo?: string;
};

export default function SignForm({ redirectTo = '/hello' }: Props) {
  return (
    <>
      <form action={loginEmail}>
        <input type="hidden" name="redirectTo" value={redirectTo} />
      </form>

      <Label htmlFor="email">
        email
        <Input name="email" type="email"></Input>
      </Label>
    </>
  );
}
