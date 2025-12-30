import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

export const {
  handlers: { GET, POST },
  auth, // => 서버함수들 잇음
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Credentials({
      name: 'Email & Password',
      credentials: {
        email: { label: '이메일' },
      },
    }),
    Google,
    Github,
  ], //secret은 .env 파일에 작성해놓으면 알아서 함.
});
// providers, next-auth의 모든걸 여기서 관리
