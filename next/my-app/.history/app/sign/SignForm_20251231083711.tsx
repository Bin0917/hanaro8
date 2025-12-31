'use client'; // 이 컴포넌트는 브라우저(클라이언트)에서 실행됨을 선언!

import type { Route } from 'next';
import { useRouter, useSearchParams } from 'next/navigation';
import { useActionState, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  type EmailPasswd,
  loginEmail,
  type ValidError,
} from '@/lib/sign.action';

export default function SignForm() {
  const router = useRouter(); // 페이지 이동을 위한 도구
  const searchParams = useSearchParams(); // URL의 쿼리 스트링, 로그인 실패시 뒤에 붙는 기존 주소! 를 가지고있음

  // 1. 로그인 성공 후 돌아갈 주소 결정 (직접 지정한 callbackUrl이 없으면 '/hello'로!)
  const redirectTo = searchParams.get('callbackUrl') || '/hello';

  // 2. 입력된 데이터를 관리할 상태 (에러 발생 시 입력값을 유지하기 위함)
  const [_credential, setCredential] = useState<EmailPasswd>({
    email: '',
    password: '',
  });

  /**
   * 3. [useActionState] ⭐ 서버 액션과 상태를 연결하는 핵심 훅!
   * - validError: 서버 액션의 리턴값 (에러 메시지 등)
   * - login: <form>의 action에 넣을 함수
   * - isPending: 현재 서버가 처리 중인지 여부 (true/false)
   */
  const [validError, login, isPending] = useActionState(
    async (_: ValidError<EmailPasswd> | undefined, fomrData: FormData) => {
      // (1) 서버 액션 호출: FormData를 들고 서버로 날아감
      const [err, data] = await loginEmail(fomrData);

      if (err) {
        // (2) 실패 시: 입력했던 값을 보존하고 에러 객체를 리턴하여 화면 업데이트
        setCredential(err.data);
        return err;
      }

      // (3) 성공 시: 입력 데이터를 세팅하고 원하는 페이지로 이동
      setCredential(data);
      router.push(redirectTo as Route);
    },
    undefined, // 초기 에러 상태는 없음
  );

  return (
    <div className="grid place-items-center">
      {/* 4. form action에 useActionState가 준 login 함수를 연결! */}
      <form action={login} className="space-y-2">
        {/* 서버 액션으로 함께 보낼 숨겨진 데이터 (리다이렉트 주소) */}
        <input type="hidden" name="redirectTo" value={redirectTo} />

        <div className="space-y-1">
          <Label htmlFor="email">email</Label>
          <Input
            id="email"
            name="email" // ⭐ 이 name값이 서버 액션의 formData.get('email')이 됨!
            type="email"
            defaultValue={validError?.data.email} // 에러 나도 사용자가 쓴 값 유지
          />
          {/* 에러 메시지가 있을 때만 빨간 글씨로 출력 */}
          {validError?.error.email && (
            <p className="text-red-500">{validError.error.email}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            defaultValue={validError?.data.password}
          />
          {validError?.error.password && (
            <p className="text-red-500">{validError.error.password}</p>
          )}
        </div>

        <div className="flex justify-center gap-5">
          {/* 5. isPending을 활용해 로딩 중 버튼 비활성화 및 텍스트 변경 */}
          <Button type="submit" disabled={isPending}>
            login{isPending && '...'}
          </Button>
          <Button type="reset">cancel</Button>
        </div>
      </form>
    </div>
  );
}
