'use client';

import { Button } from '@/components/ui/button';
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
        <Input id="email" name="email" type="email"></Input>
      </Label>
      <Label htmlFor="password">
        password
        <Input id="password" name="password" type="password"></Input>
      </Label>
      <Button>login</Button>
    </>
  );
}
