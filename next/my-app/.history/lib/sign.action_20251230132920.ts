'use server';
import { AuthError } from 'next-auth';
import { signIn, signOut } from './auth';

// 요즘은 action.ts를 만들어서 여기서 뽑아다 슴
type Provider = 'google' | 'github' | 'credentials';

export const logout = async () => {
  await signOut({ redirectTo: '/sign' });
};

// 인증관련 로직은 auth에서 가져옴
export const login = async (provider: Provider, formdata: FormData) => {
  const redirectTo = formdata.get('redirectTo') as string;
  await signIn(provider, { redirectTo });
};
export const loginGoogle = async (formdata: FormData) => {
  await login('google', formdata);
};

export const loginGithub = async (formdata: FormData) => {
  await login('github', formdata);
};

export type ValidError<T> = {
  error: {
    [k in keyof T]?: string;
  };
  data: T;
};

export type EmailPasswd = { email: string; password: string };

// 서버 액션 함수, p에러처리 다시봐야할듯 ㅜㅜ 그냥 따리치기 바빳음
export const loginEmail = async (
  formdata: FormData,
): Promise<[ValidError<EmailPasswd>] | [undefined, EmailPasswd]> => {
  const email = formdata.get('email') as string;
  const password = formdata.get('password') as string;
  const data = { email, password };
  try {
    if (!email) return [{ error: { email: 'input the email' }, data }];
    await signIn('credentials', { redirect: false, email, password });
    return [undefined, data];
  } catch (err) {
    if (err instanceof AuthError) {
      const msg = err.message || 'EmailSignInError';
      const email = msg.substring(0, msg.indexOf('Read more'));
      if (err.type === 'EmailSignInError') {
        return [{ error: { email }, data }];
      }
    }
    console.log('🚀 ~ loginEmail ~ err:', err, err instanceof AuthError);
    return [{ error: { email: JSON.stringify(err) }, data }];
  }
};
