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
    <div className="grid place-items-center">
      <form action={loginEmail} className="w-96 space-y-2">
        <input type="hidden" name="redirectTo" value={redirectTo} />
      </form>

      <Label htmlFor="email">email</Label>
      <Input id="email" name="email" type="email"></Input>

      <Label htmlFor="password">password</Label>
      <Input id="password" name="password" type="password"></Input>

      <Button>login</Button>
    </div>
  );
}
