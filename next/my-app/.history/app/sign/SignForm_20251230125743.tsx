'use client';

import { useActionState, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  type EmailPasswd,
  loginEmail,
  type ValidError,
} from '@/lib/sign.action';

type Props = {
  redirectTo?: string;
};

export default function SignForm({ redirectTo = '/hello' }: Props) {
  const [credential, setCredential] = useState<EmailPasswd>({
    email: '',
    password: '',
  });
  //서버액션을 위함 폼
  const [validError, login, isPending] = useActionState(
    async (_: ValidError<EmailPasswd> | undefined, fomrData: FormData) => {
      const [err, data] = await loginEmail(fomrData);
      if (err) {
        setCredential(err.data);
        return err;
      }
      setCredential(data);
    },
    undefined,
  );
  return (
    //서버액션 사용
    <div className="grid place-items-center">
      <form action={login} className="w-96 space-y-2">
        <input type="hidden" name="redirectTo" value={redirectTo} />
      </form>

      <div className="space-y-1">
        <Label htmlFor="email">email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          defaultValue={credential.email}
        />
        {validError?.error.email && (
          <p className="text-red-500">{validError.error.email}</p>
        )}
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
