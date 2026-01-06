'use server'; // 서버단에서 실행

import { redirect } from 'next/navigation';
import { AuthError } from 'next-auth';
import z from 'zod';
import { signIn, signOut } from './auth';
import { isErrorWithMessage } from './errors';
import { prisma } from './prisma';
import {
  encryptPassword,
  saveProfile,
  type ValidError,
  validate,
} from './validator';

export type Provider = 'github' | 'credentials';

export const logout = async () => {
  await signOut({ redirectTo: '/' });
};

const login = async (provider: Provider, formData: FormData) => {
  const redirectTo = (formData.get('redirectTo') as string) || '/';
  await signIn(provider, { redirectTo });
};

export const githubLogin = async (formData: FormData) =>
  login('github', formData);

// QQQl
export const loginEmail = async (formdata: FormData) => {
  const zobj = z.object({
    email: z.email('올바르지 않은 이메일 양식입니다'),
    passwd: z.string().min(4, '올바르지 않은 비밀번호 입니다'),
  });

  const [err, data] = validate(zobj, formdata);
  if (err) return [err];
  try {
    // useActionState를 위해 redirect 금지
    await signIn('credentials', { redirect: false, ...data });
    return [undefined, data];
  } catch (err) {
    if (err instanceof AuthError) {
      const msg = err.message || 'EmailSignInError';
      const email = msg.substring(0, msg.indexOf('Read more'));
      return [{ error: { email }, data }];
    }
    return [{ error: { email: JSON.stringify(err) }, data }];
  }
};

// QQQ 리턴타입
export const regist = async (
  _: ValidError | undefined,
  formData: FormData,
): Promise<ValidError | undefined> => {
  const imageFile = await saveProfile(formData.get('image') as File);
  // 파일의 경로가 문자열로 들어온다.
  formData.set('image', imageFile || '');

  const zobj = z
    .object({
      email: z.email(),
      name: z.string().min(1, 'Input name At least 1').max(30),
      passwd: z.string().min(4, 'Input password At least 4'),
      passwd2: z.string().min(4),
      image: z.nullable(z.string()),
    })
    .refine(({ passwd, passwd2 }) => passwd === passwd2, {
      path: ['passwd2'],
      message: '입력하신 비밀번호가 같지 않습니다',
    });

  const [err, data] = validate(zobj, formData);
  if (err) return err;

  const { email, name, image } = data;

  try {
    const passwd = await encryptPassword(data.passwd);
    const user = await prisma.user.findUnique({ where: { email } });

    if (user)
      return {
        error: { email: '이미 존재하는 이메일입니다' },
        data,
      } satisfies ValidError;

    await prisma.user.create({
      data: { email, name, passwd, image },
      select: { id: true, name: true, email: true, isadmin: true },
    });

    redirect('/sign');
  } catch (err) {
    let message = JSON.stringify(err);
    if (isErrorWithMessage(err)) {
      if (err.message === 'NEXT_REDIRECT') redirect('/sign');
      message = err.message;
    }

    return {
      error: { email: message },
      data,
    };
  }
};
