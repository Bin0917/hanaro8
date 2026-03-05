import { NextResponse } from "next/server";

// 실행중, 즉 런타임에 이 에러가 무슨 에러인지 확인하기 위해 class 사용!
//type 은 typescrpt에만 존재
export class HttpError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message); // 부모인 Error 클래스에게 메시지 전달
    this.status = status; // 우리만의 '상태 코드' 추가!
  }
}

type WithMessage = {
  message: string;
};

export const isErrorWithMessage = (err: unknown): err is WithMessage =>
  err instanceof Error ||
  (typeof err === "object" &&
    err !== null &&
    "message" in err &&
    typeof err.message === "string");

export const errorResponse = (err: unknown) => {
  let message = "";
  let status = 500;
  if (err instanceof HttpError) {
    message = err.message;
    status = err.status;
  } else if (isErrorWithMessage(err)) {
    message = err.message;
  } else {
    message = JSON.stringify(err);
  }
  return NextResponse.json({ message, status }, { status });
};
