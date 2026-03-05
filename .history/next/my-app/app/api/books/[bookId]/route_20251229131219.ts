import { NextRequest, NextResponse } from "next/server";
import { Book, books } from "../bookdata";
import { notFound } from "next/navigation";
import { errorResponse, HttpError, isErrorWithMessage } from "@/lib/errors";

type Params = {
  params: Promise<{ bookId: string }>;
};

type ReturnBookOrIndex<T extends boolean = false> = T extends true
  ? number
  : Book;

const getBook = async <T extends boolean>({ params }: Params, isIndex?: T) => {
  const { bookId } = await params;
  const fn = isIndex ? books.findIndex : books.find;
  const book = fn.bind(books)((book) => book.id === Number(bookId));

  if (book !== -1 || book === undefined)
    throw new HttpError(`Not found book, id: ${bookId}`, 404);

  return book;
};

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const book = getBook({ params });
    return NextResponse.json(book);
  } catch (err) {
    return errorResponse(err);
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const book = await getBook({ params });
    const { writer } = await req.json();

    book.writer = writer;
    return NextResponse.json(book);
  } catch (err) {
    return errorResponse(err);
  }
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const bookIdx = (await getBook({ params }, true)) as number;

    return NextResponse.json(books.splice(bookIdx, 1));
  } catch (err) {
    errorResponse(err);
  }
}
