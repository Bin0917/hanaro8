import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      isadmin?: boolean;
    } & DefaultSession['user']; // Default... => 재정의한 애들 말고 나머지는 그대로 유지해줘~
  }
  interface User {
    passwd?: string;
    isadmin?: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    isadmin?: boolean;
  }
}
// session 모듈 보강
// 우리가 사용하는 next-auth는 이미 남(패키지 제작자)이 만들어둔 라이브러리죠?

// 수정 불가: node_modules 안에 있는 실제
// next-auth 소스코드를 우리가 직접 가서 고칠 수는 없어요. (업데이트하면 다 날아가니까요!)

// 선언(Declare): 그래서 "이 라이브러리 안에 이런 인터페이스가 있는 거 아는데,
//  거기에 이런 타입도 더 있다고 쳐줘!"라고 타입스크립트에게 선언만 해두는 거예요.
