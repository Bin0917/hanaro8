import { Button } from '@/components/ui/button';
import { signIn } from '@/lib/auth';

type Provider = 'google' | 'github';

export default function SignPage() {
  const login = async (provider: Provider) => {
    'use server';
    await signIn(provider, { redirectTo: '/hello' });
  };
  return (
    <>
      <h1 className="text-xl">signIn</h1>
      <form action="">
        <Button
          formAction={() => {
            'use server';
            login('github');
          }}
        >
          Google
        </Button>
      </form>
    </>
  );
}
