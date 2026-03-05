'use client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { githubLogin, loginEmail } from '@/lib/sign.action';
import type { ValidError } from '@/lib/validator';
import { GithubLoginButton } from './GithubLoginButton';

export default function LoginForm() {
  // const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('callbackUrl') || '/';

  const [validError, login, isPending] = useActionState(
    async (_: ValidError | undefined, formData: FormData) => {
      const [err, _data] = await loginEmail(formData);
      if (err) {
        return err as ValidError;
      }

      await new Promise((resolve) => setTimeout(resolve, 100));
    },
    undefined,
  );

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>

        <CardAction>
          <Link href="/Regist">
            <Button variant="link" aria-label="회원가입">
              Sign Up
            </Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4">
        <form className="space-y-3" action={login}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                defaultValue={validError?.data.email || ''}
              />
              {validError?.error.email && (
                <p className="text-red-500">{validError.error.email}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="passwd">Password</Label>
              <Input
                id="passwd"
                name="passwd"
                type="password"
                placeholder="password..."
                defaultValue={validError?.data.passwd || ''}
              />
              {validError?.error.passwd && (
                <p className="text-red-500">{validError.error.passwd}</p>
              )}
            </div>
          </div>
          <input type="hidden" name="redirectTo" value={redirectTo} />

          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
            aria-label="로그인"
          >
            LogIn{isPending && '...'}
          </Button>
        </form>

        <form>
          <GithubLoginButton disabled={isPending} formAction={githubLogin} />
        </form>
      </CardContent>
    </Card>
  );
}
