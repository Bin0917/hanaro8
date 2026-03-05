'use client';
import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { regist } from '@/lib/sign.action';

export default function RegistForm() {
  const [validError, login, isPending] = useActionState(regist, undefined);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Regist</CardTitle>
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
                placeholder="email@email.com"
                defaultValue={validError?.data.email || ''}
              />
              {validError?.error.email && (
                <p className="text-red-500">{validError.error.email}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Input name"
                defaultValue={validError?.data.name || ''}
              />
              {validError?.error.name && (
                <p className="text-red-500">{validError.error.name}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="passwd">Password</Label>
              <Input
                id="passwd"
                name="passwd"
                type="password"
                placeholder="Input password"
                defaultValue={validError?.data.passwd || ''}
              />
              {validError?.error.passwd && (
                <p className="text-red-500">{validError.error.passwd}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="passwd2">Password Again</Label>
              <Input
                id="passwd2"
                name="passwd2"
                type="password"
                placeholder="Input same password"
                defaultValue={validError?.data.passwd2 || ''}
              />
              {validError?.error.passwd2 && (
                <p className="text-red-500">{validError.error.passwd2}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Profile Image</Label>
              <Input id="image" name="image" type="file" accept="image/*" />
              {validError?.error.image && (
                <p className="text-red-500">{validError.error.image}</p>
              )}
            </div>
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={isPending}
            aria-label="회원가입버튼"
          >
            Regist{isPending && '...'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
