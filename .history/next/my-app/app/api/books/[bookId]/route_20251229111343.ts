import { NextRequest, NextResponse } from "next/server";
import { books } from "../bookdata";
import { notFound } from "next/navigation";

type Params = {
  params: Promise<{ bookId: string }>;
};
export async function GET(_req: NextRequest, { params }: Params) {
  const { bookId } = await params;
  const book = books.find((book) => book.id === Number(bookId));

  //   if (!book) return notFound();
  if (!book)
    return NextResponse.json(
      { message: `Not found #${bookId}` },
      { status: 404 }
    );

  return NextResponse.json(book);
}

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const { bookId } = await params;
    const { writer } = await req.json();
    const book = books.find((b) => b.id === +bookId);

    if (!book) throw new Error();

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
