import { NextRequest, NextResponse } from "next/server";
import { books } from "../bookdata";
import { notFound } from "next/navigation";
import { HttpError, isErrorWithMessage } from "@/lib/errors";

type Params = {
  params: Promise<{ bookId: string }>;
};

const getBook = async ({ params }: Params) => {
  const { bookId } = await params;
  const book = books.find((book) => book.id === Number(bookId));
  //   if (!book) return notFound();
  if (!book) throw new HttpError(`Not found book, id: ${bookId}`, 404);

  return book;
};

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    return NextResponse.json(getBook({ params }));
  } catch (err) {
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
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const book = await getBook({ params });
    const { writer } = await req.json();

    book.writer = writer;
    return NextResponse.json(book);
  } catch (err) {
    return NextResponse.json({ msg: "북 없음!!" }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const { bookId } = await params;

  const book = books.find((b) => b.id === +bookId);
  if (!book) return NextResponse.json({ msg: "북 없음!!" }, { status: 400 });

  const idx = books.findIndex((book) => book.id === +bookId);
  books.splice(idx, 1);
  return NextResponse.json(books);
}
