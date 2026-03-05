import { type NextRequest, NextResponse } from 'next/server';
import { errorResponse, HttpError } from '@/lib/errors';
import { type Book, books } from '../bookdata';

type Params = {
  params: Promise<{ bookId: string }>; // Next.js 15버전부터 params는 Promise로 넘어옵니다!
};

// [고급 힌트] T가 true면 인덱스(number), false면 책 객체(Book)를 리턴하도록 타입을 설계함
type ReturnBookOrIndex<T extends boolean = false> = T extends true
  ? number
  : Book;

//  * 책 정보나 인덱스를 찾아오는 공통 함수
//  * @param isIndex true를 주면 배열의 위치(index)를, 안주면 데이터(Book)를 찾음
const getBook = async <T extends boolean = false>(
  { params }: Params,
  isIndex?: T,
) => {
  const { bookId } = await params;

  // isIndex 여부에 따라 findIndex를 쓸지 find를 쓸지 결정
  const fn = isIndex ? books.findIndex : books.find;

  // .bind(books)를 안하면 find 메서드 내부의 this가 깨질 수 있어 안전하게 묶어줌 => 중요!!
  const book = fn.bind(books)((book) => book.id === Number(bookId));

  // 데이터를 못 찾았을 때 (findIndex는 -1, find는 undefined 리턴)
  if (book === -1 || book === undefined)
    // 우리가 아까 만든 커스텀 HttpError를 던짐! (404 상태코드 포함)
    throw new HttpError(`Not found book, (id: ${bookId})`, 404);

  return book as ReturnBookOrIndex<T>;
};

// [GET] 책 한 권 정보 가져오기
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const book = await getBook({ params }); // 데이터를 찾아옴
    return NextResponse.json(book);
  } catch (err) {
    return errorResponse(err); // 에러 발생 시 공통 에러 응답기로 처리
  }
}

// [PATCH] 책 정보 수정하기 (여기서는 작성자 이름만 수정)
export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const book = await getBook({ params });
    const { writer } = await req.json(); // 수정할 데이터를 몸통(body)에서 꺼냄

    book.writer = writer; // 찾은 책 객체의 메모리 주소값을 직접 수정
    return NextResponse.json(book);
  } catch (err) {
    return errorResponse(err);
  }
}

// [DELETE] 책 삭제하기
export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    // 삭제할 때는 배열의 위치(Index)를 알아야 splice가 가능함! (isIndex = true)
    const bookIdx = await getBook({ params }, true);

    // splice는 배열을 직접 수정하고 삭제된 아이템을 배열로 반환함
    return NextResponse.json(books.splice(bookIdx, 1)[0]);
  } catch (err) {
    // return이 빠져있었네요! 추가해줘야 클라이언트가 응답을 받습니다.
    return errorResponse(err);
  }
}
