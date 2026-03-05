import WriteForm from '@/components/WriteForm';
import { getFolders } from '@/lib/posts.action';

export default async function PostEdit() {
  const folders = await getFolders();
  return <WriteForm folders={folders} />;
}
