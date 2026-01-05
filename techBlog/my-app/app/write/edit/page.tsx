import { getFolders } from '@/lib/posts.action';
import WriteForm from './WriteForm';

export default async function PostEdit() {
  const folders = await getFolders();
  return <WriteForm folders={folders} />;
}
