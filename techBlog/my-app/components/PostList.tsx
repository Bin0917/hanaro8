import type { Route } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';
import { deletePost, getUsername, type Post } from '@/lib/posts.action';
import CommentSection from './CommentSection';
import LikeButton from './LikeButton';
import SearchForm from './SearchForm';

type PostListProps = {
  posts: Post[];
  techName?: number; // 폴더별 페이지용
  q?: string;
};

export default async function PostList({
  posts,
  techName,
  q = '',
}: PostListProps) {
  const session = await auth();
  const isAdmin = !!session?.user.isadmin;
  const isLogin = !!session?.user;
  const currentUserId = session?.user?.id ? Number(session.user.id) : null;

  return (
    <div className="mx-auto w-full max-w-4xl space-y-4 rounded-md p-4 px-4 shadow-md">
      <div>
        <SearchForm q={q} />
      </div>
      {posts.map(async (post) => {
        const initialLiked = currentUserId
          ? post.Like?.some((l) => l.userId === currentUserId)
          : false;

        return (
          <div
            className="space-y-3 rounded-md border p-4 shadow-md"
            key={post.id}
          >
            <div className="font-bold text-2xl">{post.title}</div>
            <div className="rounded-md p-3 shadow-md">{post.content}</div>

            {/* 기타 툴 */}
            <div>
              {/* 좋아요 & 댓글 */}

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
                  aria-label="게시글 삭제"
                >
                  Delete
                </Button>
                <Link href={`/write/edit/${post.id}` as Route}>
                  <Button aria-label="게시글 수정">Update</Button>
                </Link>
              </form>
            )}
            <LikeButton
              postId={post.id}
              userId={currentUserId}
              // 초기 좋아요 카운팅
              initialLikeCount={post._count.Like}
              // 이미 좋아요를 누른 유저인지
              initialLiked={initialLiked}
            />
            <CommentSection
              postId={post.id}
              folderId={techName}
              isLogin={isLogin}
              userId={Number(session?.user.id)}
              isAdmin={isAdmin}
            />
          </div>
        );
      })}
      {isAdmin && (
        <div className="flex justify-center">
          <Link href="/write/edit">
            <Button aria-label="게시글 작성">Write</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
