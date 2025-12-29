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
    return NextResponse.json({ message: `found #${bookId}` }, { status: 404 });

  return NextResponse.json(book);
}
