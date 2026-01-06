'use client';
import CommentItem, { type Comment } from './CommentItem';

type Prop = {
  comments: Comment[];
  userId: number | undefined;
  folderId: number | undefined;
  isAdmin: boolean;
};

export default function CommentList({
  comments,
  userId,
  folderId,
  isAdmin,
}: Prop) {
  const currentUserId = userId ? Number(userId) : null;
  const parents = comments.filter((c) => c.parentId === null);

  return (
    <>
      {comments.length === 0 ? (
        <div></div>
      ) : (
        // 댓글리스트 돌리기
        <div className="space-y-3">
          {parents.map((comment) => (
            <div key={comment.id}>
              <div key={comment.id} className="space-y-2">
                <CommentItem
                  comment={comment}
                  currentUserId={Number(currentUserId) || 0}
                  folderId={folderId}
                  isAdmin={isAdmin}
                />
              </div>
              <div className="mt-3 ml-4 space-y-3">
                {comments
                  .filter((c) => c.parentId === comment.id)
                  .map((com) => (
                    <div key={com.id}>
                      <CommentItem
                        comment={com}
                        currentUserId={Number(currentUserId) || 0}
                        folderId={folderId}
                        isAdmin={isAdmin}
                        isChild={true}
                      />
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
