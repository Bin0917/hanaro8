import NextAuth, { AuthError } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
// oauth import
import Github from 'next-auth/providers/github';
import { prisma } from './prisma';
import { comparePassword } from './validator';

export const {
  // 이하 함수를 이용해 user 정보 등 가져옴
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Github,
    Credentials({
      name: '',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'input email...' },
        passwd: {
          label: 'Password',
          type: 'password',
          placeholder: 'input password...',
        },
      },
      async authorize(credentials) {
        const { email, passwd } = credentials;
        return { email: email as string, passwd: passwd as string };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      const { email, passwd, name, image, isadmin } = user;
      let olduser =
        email && (await prisma.user.findUnique({ where: { email } }));

      if (account?.provider === 'credentials') {
        if (!olduser) {
          throw makeAuthError(
            'EmailSignInError',
            '존재하지 않는 이메일입니다.',
          );
        }

        if (
          passwd &&
          olduser.passwd &&
          !(await comparePassword(passwd, olduser.passwd))
        )
          throw makeAuthError(
            'EmailSignInError',
            '존재하지 않는 이메일 혹은 비밀번호입니다.',
          );
      } else {
        if (!olduser) {
          if (!email || !name)
            throw makeAuthError(
              'OAuthAccountNotLinked',
              '소셜로그인 연동 정보가 부족합니다.',
            );
          // 없는 유저면 자동 생성
          olduser = await prisma.user.create({
            data: {
              email,
              name,
              image,
              isadmin,
            },
          });
        }
      }
      user.id = String(olduser.id);
      user.name = olduser.name;
      user.image = olduser.image;
      user.isadmin = olduser.isadmin; // 관리자 여부 포함

      return true; // 위 조건 통과시, 로그인 허용
    },
    async jwt({ user, token }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.isadmin = user.isadmin;
      }
      return token;
    },
    async session({ token, session }) {
      if (token && session.user) {
        // 토큰에 들어있던 정보를 실제 세션 객체에 주입
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.isadmin = token.isadmin as boolean;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign',
  },
  trustHost: true,
  // jwt: {
  //   maxAge: 30 * 60,
  // }, // 토큰 유효 시간 30분
});

// 에러 객체를 생성하는 헬퍼 함수
const makeAuthError = (type: AuthError['type'], message?: string) => {
  const err = new AuthError(message);
  err.type = type;
  return err;
};
