'use client';

import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginEmail } from '@/lib/sign.action';

type Props = {
  redirectTo?: string;
};

export default function SignForm({ redirectTo = '/hello' }: Props) {
  const [vaildError, login, isPending] = useActionState(
    async () => {},
    undefined,
  );
  return (
    <div className="grid place-items-center">
      <form action={loginEmail} className="w-96 space-y-2">
        <input type="hidden" name="redirectTo" value={redirectTo} />
      </form>

      <div className="space-y-1">
        <Label htmlFor="email">email</Label>
        <Input id="email" name="email" type="email"></Input>
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">password</Label>
        <Input id="password" name="password" type="password"></Input>
      </div>
      <div className="flex justify-center gap-5">
        <Button type="submit" disabled={isPending}>
          login{isPending && '...'}
        </Button>
        <Button type="reset">cancel</Button>
      </div>
    </div>
  );
}
