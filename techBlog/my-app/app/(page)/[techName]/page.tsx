import { getPosts } from '@/lib/posts.action';
import PostList from '../PostList';

type Props = {
  params: Promise<{ techName: number }>;
};

export default async function techPageList({ params }: Props) {
  const { techName } = await params;
  const posts = await getPosts(Number(techName));
  return <PostList posts={posts} techName={techName} />;
}
