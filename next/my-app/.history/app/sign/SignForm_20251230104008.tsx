'use client';

import { loginEmail } from '@/lib/sign.action';

export default function SignForm() {
  return (
    <form action={loginEmail}>
      <input type="hidden" name="redirectTo" value="/hello" />
    </form>
  );
}
