import PostList from '@/components/PostList';
import { auth } from '@/lib/auth';
import { getPosts } from '@/lib/posts.action';

type Props = {
  params: Promise<{ techName: number }>;
  searchParams: Promise<{ q?: string }>;
};

export default async function techPageList({ params, searchParams }: Props) {
  const { techName } = await params;
  const q = (await searchParams)?.q ?? '';

  const session = await auth();

  const posts =
    q === ''
      ? await getPosts(Number(techName), Number(session?.user.id))
      : await getPosts(undefined, undefined, q);

  return <PostList posts={posts} techName={techName} q={q} />;
}
