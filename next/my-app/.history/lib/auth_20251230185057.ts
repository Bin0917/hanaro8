import NextAuth, { AuthError } from 'next-auth';
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
      // credential = 사용자 커스텀 가능한..
      name: 'Email',
      credentials: {
        // credentials 프롭 = 어떤 데이터를 받을건지 정해줄 수 있음
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
      async authorize(credentials) {
        // credential을 첫번째 인자로 받음. 보통 해당 사용자가 로그인 가능한 사용자인지 판별할때 씀ㅁ
        console.log('🚀 ~ credentails:', credentials);
        const { email, password } = credentials;
        return {
          id: '1',
          email: email as string,
          name: 'hong',
          passwd: passwd as string,
        }; // user의 정보를 객체화해서 전달
      },
    }),
    Google({
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),

    Github,
  ], //secret은 .env 파일에 작성해놓으면 알아서 함.
  callbacks: {
    // 해당 콜백은 Oauth/Email/Credentials Provider로 로그인 한 후에 실행되어 사용자의 로그인을 제어할 수 있는 콜백 함수이다.
    // 우리껄로 쓰겟다. 재정의시 잘 잡아줘야함
    async signIn({ user, account }) {
      console.log('🚀 ~ account:', account);
      if (user.email === 'leesd132@naver.com')
        throw makeAuthError('EmailSignInError', 'not exist email');
      if (!user.passwd) return false;

      return true; // return false로 하면 무조건 error 터짐
    },
    async jwt({ token, user, trigger }) {
      console.log('🚀 ~ trigger:', trigger);
      // jwt 콜백은 JWT가 생성되거나(e.g sign in 성공), 업데이트(e.g useSessing 등 클라이언트에서 session에 접근하였을 때)되었을 때 실행된다. 함수의 반환 값은 encrypted 되며, 쿠키에 저장된다.
      if (user) {
        token.email = user.email;
        token.id = user.id;
        token.name = user.name;
        token.isadmin = user.isadmin;
      }

      return token;
    },

    // next-auth.d.ts 에서 재정의
    // 몇명이 로그인하고잇는지 체킹 가능 + 위쪽에 생성된 토큰을 기반으로 세션 생성?
    async session({ session, user }) {
      if (user) {
        session.user.id = user.id;
        session.user.name = user.name;
        session.user.email = user.email;
        session.user.isadmin = user.isadmin;
      }
      return session;
    },
  },
  pages: {
    // 이거 걸면 우리가 만든 sign페이지로 넘어감 기존제공 auth페이지 안감
    signIn: '/sign',
    error: '/sign/error',
  },
  session: {
    strategy: 'jwt',
  },
  trustHost: true,
  jwt: { maxAge: 30 * 60 },
});
// providers, next-auth의 모든걸 여기서 관리

const makeAuthError = (type: AuthError['type'], msg?: string) => {
  const err = new AuthError(msg);
  err.type = type;
  return err;
};
