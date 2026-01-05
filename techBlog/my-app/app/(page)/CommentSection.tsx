import CommentForm from './CommentForm';
import CommentList from './CommentList';

type Props = {
  postId: number;
  folderId: number | undefined;
  isLogin: boolean;
  userId: number;
};

export default async function CommentSection({
  postId,
  folderId,
  isLogin,
  userId,
}: Props) {
  return (
    <>
      <div className="border-t p-3 text-gray-600 text-sm">댓글창</div>
      <div className="rounded-md border p-3 shadow-2xs">
        <div>
          <CommentList postId={postId} />
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
