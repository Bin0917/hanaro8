import { auth } from '@/lib/auth';
import { getComments } from '@/lib/posts.action';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

type Props = {
  postId: number;
  folderId: number | undefined;
  isLogin: boolean;
  userId: number;
  isAdmin: boolean;
};

export default async function CommentSection({
  postId,
  folderId,
  isLogin,
  userId,
  isAdmin,
}: Props) {
  const comments = await getComments(postId);
  const session = await auth();
  return (
    <>
      <div className="border-t p-3 text-gray-600 text-sm">댓글창</div>
      <div className="rounded-md p-3 shadow-2xs">
        <div>
          {/* 
            const comments = await getComments(postId);
              const session = await auth();
              const currentUserId = session?.user?.id ? Number(session.user.id) : null;
            */}
          <CommentList
            comments={comments}
            userId={Number(session?.user.id)}
            folderId={folderId}
            isAdmin={isAdmin}
          />
          {isLogin && (
            <CommentForm
              postId={postId}
              userId={Number(userId)}
              folderId={folderId}
            />
          )}
        </div>
      </div>
    </>
  );
}
