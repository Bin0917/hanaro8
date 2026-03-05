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
    // 프로바이더 순서에 따라, 로그인 창 위치(?) 결정됨
    Credentials({
      name: 'Email',
      credentials: {
        email: {
          // 이 키들이 백엔드의 name이 된다
          label: '이메일',
          type: 'email',
          placeholder: 'user@naver.com',
        },
        passwd: {
          label: '패스워드',
          type: 'password',
          placeholder: 'password',
        },
      },
      async authorize(credentails) {
        console.log('🚀 ~ credentails:', credentails);
        const { email } = credentails;
        return { id: '1', email: email as string, name: 'hong' };
      },
    }),
    Google,
    Github,
  ], //secret은 .env 파일에 작성해놓으면 알아서 함.
});
// providers, next-auth의 모든걸 여기서 관리
