'use server'; // 이 파일의 모든 함수는 서버에서만 실행됨을 선언!

import { AuthError } from 'next-auth';
import z from 'zod';
import { signIn, signOut } from './auth';

// 1. 사용할 로그인 방식(제공자) 타입 정의
type Provider = 'google' | 'github' | 'credentials';

// 2. [로그아웃] 세션을 파괴하고 로그인 페이지로 리다이렉트
export const logout = async () => {
  await signOut({ redirectTo: '/sign' });
};

/**
 * 3. [공통 로그인 함수] 구글/깃허브 등 OAuth 로그인 시 사용
 */
export const login = async (provider: Provider, formdata: FormData) => {
  const redirectTo = formdata.get('redirectTo') as string;
  await signIn(provider, { redirectTo });
};

// 소셜 로그인들은 공통 login 함수를 재사용 (가독성 UP!)
export const loginGoogle = async (formdata: FormData) => {
  await login('google', formdata);
};
export const loginGithub = async (formdata: FormData) => {
  await login('github', formdata);
};

/**
 * 4. [에러/데이터 응답 타입]
 * 성공하면 [undefined, data], 실패하면 [error객체]를 반환하는 튜플 구조
 */
export type ValidError<T> = {
  error: { [k in keyof T]?: string }; // 어떤 필드에서 에러가 났는지 담음
  data: T; // 사용자가 입력했던 값을 다시 돌려줌 (Input 유지용)
};

export type EmailPasswd = {
  email: string | FormDataEntryValue;
  password: string | FormDataEntryValue;
};

/**
 * 5. [이메일 로그인 서버 액션] ⭐ 핵심 로직! (서버액션)
 */
export const loginEmail = async (
  formdata: FormData,
): Promise<[ValidError<EmailPasswd>] | [undefined, EmailPasswd]> => {
  // 브라우저에서 보낸 FormData에서 값 추출
  // const email = formdata.get('email') as string;
  // const password = formdata.get('password') as string;
  // const data = { email, password };

  const zodj = z.object({
    email: z.email('Invalid Email Address'),
    password: z.string().min(3, 'enter more characters than 3'),
  });
  const { email, password } = Object.fromEntries(formdata.entries());
  const data = { email, password };
  const validator = zodj.safeParse(data);
  if (!validator.success) {
    console.log(z.treeifyError(validator.error));
    const verr = z.treeifyError(validator.error).properties;
    const validError: ValidError<EmailPasswd> = { error: {}, data };
    for (const [k, v] of Object.entries(verr || [])) {
      // if (k === 'email' || k === 'password')
      validError.error[k as keyof typeof data] = v.errors[0];
    }

    return [validError];
  }
  try {
    // [검증] 이메일이 비어있으면 즉시 에러 반환 (서버단 유효성 검사)
    // if (!email) return [{ error: { email: 'input the email' }, data }];
    // if (!password) return [{ error: { password: 'input the password' }, data }];

    // [인증 시도] Auth.js의 signIn 실행
    // redirect: false를 주면 페이지 이동을 막고 여기서 결과를 기다림
    await signIn('credentials', { redirect: false, email, password });

    return [undefined, data]; // 성공 시 에러는 없고 데이터만 반환
  } catch (err) {
    // [에러 처리] 인증 과정에서 문제가 생겼을 때
    if (err instanceof AuthError) {
      // Auth.js가 던진 에러 메시지 중 불필요한 'Read more...' 링크 문자열 제거 로직
      const msg = err.message || 'EmailSignInError';
      const cleanMsg = msg.includes('Read more')
        ? msg.substring(0, msg.indexOf('Read more'))
        : msg;

      // 우리가 auth.ts의 signIn 콜백에서 던진 커스텀 에러 타입 확인
      if (err.type === 'EmailSignInError') {
        return [{ error: { email: cleanMsg }, data }];
      }
    }

    // 예상치 못한 에러가 났을 때의 방어 코드
    console.log('🚀 인증 에러 발생:', err);
    return [{ error: { email: '로그인 정보가 일치하지 않습니다.' }, data }];
  }
};
