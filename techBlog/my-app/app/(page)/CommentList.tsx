import { auth } from '@/lib/auth';
import { getComments } from '@/lib/posts.action';
import CommentItem from './CommentItem';

type Prop = {
  postId: number;
};

export default async function CommentList({ postId }: Prop) {
  const comments = await getComments(postId);
  const session = await auth();
  const currentUserId = session?.user?.id ? Number(session.user.id) : null;
  return (
    <>
      {comments.length === 0 ? (
        <div></div>
      ) : (
        // 댓글리스트 돌리기
        <div className="space-y-3">
          {comments.map((comment) => (
            <div key={comment.id} className="space-y-2">
              <CommentItem
                comment={comment}
                currentUserId={Number(currentUserId) || 0}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
