import NextAuth from 'next-auth';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [Google, Github], //secret은 .env 파일에 작성해놓으면 알아서 함.
});
// providers, next-auth의 모든걸 여기서 관리
