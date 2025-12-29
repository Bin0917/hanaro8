type Params = {
  params: Promise<{ bookId: string }>;
};
export async function GET(req: NextReqeust, { params }: Params) {}
