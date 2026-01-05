import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';
import { deletePost, getUsername } from '@/lib/posts.action';
import CommentSection from './CommentSection';

type Post = {
  id: number;
  title: string;
  content: string | null;
  folder: number;
  createdAt: Date;
  updatedAt: Date;
  writer: number;
};

type PostListProps = {
  posts: Post[];
  techName?: number; // 폴더별 페이지용 (선택)
};

export default async function PostList({ posts, techName }: PostListProps) {
  const session = await auth();
  const isAdmin = !!session?.user.isadmin;
  const isLogin = !!session?.user;

  return (
    <div className="mx-auto w-4/5 space-y-4 rounded-md border p-4 shadow-2xs">
      {posts.map((post) => (
        <div
          className="space-y-3 rounded-md border p-4 shadow-2xs"
          key={post.id}
        >
          <div className="font-bold text-xl">{post.title}</div>
          <div className="h-30 rounded-md border p-2 shadow-2xs">
            {post.content}
          </div>

          {/* 기타 툴 */}
          <div>
            {/* 좋아요 & 댓글 */}
            <div className=""></div>

            {/* 작성자 & 작성시간 */}
            <div className="flex justify-end gap-2 text-gray-600 text-xs">
              <p className="">{getUsername(post.writer)}</p>
              <p>
                {post.updatedAt.toLocaleDateString()}{' '}
                {post.updatedAt.toLocaleTimeString()}
              </p>
            </div>
          </div>

          {/* Delete & Update 버튼 */}
          {isAdmin && (
            <form className="flex justify-between">
              <Button
                formAction={async () => {
                  'use server';
                  await deletePost(
                    post.id,
                    post.folder,
                    techName ? String(techName) : '/',
                  );
                }}
              >
                Delete
              </Button>
              <Link href={`/write/edit/${post.id}`}>
                <Button>Update</Button>
              </Link>
            </form>
          )}
          <CommentSection
            postId={post.id}
            folderId={techName}
            isLogin={isLogin}
            userId={Number(session?.user.id)}
          />
        </div>
      ))}
      {isAdmin && (
        <Link href="/write/edit" className="">
          <Button>Write</Button>
        </Link>
      )}
    </div>
  );
}
