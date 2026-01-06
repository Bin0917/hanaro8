import PostList from '@/components/PostList';
import { auth } from '@/lib/auth';
import { getPosts } from '@/lib/posts.action';

type Prop = {
  searchParams: Promise<{ q?: string }>;
};

export default async function Page({ searchParams }: Prop) {
  const q = (await searchParams)?.q ?? '';
  const session = await auth();
  const posts =
    q === ''
      ? await getPosts(undefined, Number(session?.user.id))
      : await getPosts(undefined, undefined, q);

  return <PostList posts={posts} q={q} />;
}
