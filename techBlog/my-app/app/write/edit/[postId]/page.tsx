import { getFolders, getPost } from '@/lib/posts.action';
import WriteForm from '../WriteForm';

export default async function EditPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;

  const folders = await getFolders();
  const post = await getPost(Number(postId));

  if (!post) {
    return <div className=""> PostNotFound</div>;
  }

  return <WriteForm folders={folders} post={post} />;
}
