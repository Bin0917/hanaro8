import { Button } from '@/components/ui/button';
import { signIn } from '@/lib/auth';
import { loginGoogle } from '@/lib/sign.action';

type Provider = 'google' | 'github';

export default function SignPage() {
  const login = async (provider: Provider) => {
    'use server';
    await signIn(provider, { redirectTo: '/hello' });
  };
  return (
    <>
      <h1 className="text-xl">signIn</h1>
      <form className="flex gap-3">
        <Button formAction={loginGoogle}>Google</Button>
        <Button
          formAction={async () => {
            'use server';
            await login('github');
          }}
        >
          Github
        </Button>
      </form>
    </>
  );
}
