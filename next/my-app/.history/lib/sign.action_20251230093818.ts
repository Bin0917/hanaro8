'use server';
import { signIn, signOut } from './auth';

// 요즘은 action.ts를 만들어서 여기서 뽑아다 슴
type Provider = 'google' | 'github' | 'credentials';

export const logout = async () => {
  await signOut({ redirectTo: '/sign' });
};

export const login = async (provider: Provider, formdata: FormData) => {
  const redirectTo = formdata.get('redirectTo') as string;
  await signIn('google', { redirectTo });
};

export const loginGoogle = async (formdata: FormData) => {
  login('google', formdata);
};

export const loginGithub = async (formdata: FormData) => {
  login('github', formdata);
};
