import { NextRequest } from "next/server";
import { books } from "../bookdata";

type Params = {
  params: Promise<{ bookId: string }>;
};
export async function GET(req: NextRequest, { params }: Params) {
  const { bookId } = await params;
  const bood = books.find((book) => book.id === Number(bookId));
}
