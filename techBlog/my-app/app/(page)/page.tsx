import { getPosts } from '@/lib/posts.action';
import PostList from './PostList';

export default async function Page() {
  const initialPosts = await getPosts();
  return (
    // 대충 id 높은 folder 먼저 뽑기
    <PostList posts={initialPosts} />
  );
}
