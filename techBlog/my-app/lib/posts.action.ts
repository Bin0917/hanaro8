'use server';
import { revalidatePath } from 'next/cache';
import { AuthError } from 'next-auth';
import z from 'zod';
import { auth } from './auth';
import { Prisma } from './generated/prisma/client';
import { requireAdmin, requireOwnerOrAdmin } from './guard';
import { prisma } from './prisma';
import { validate } from './validator';

export type Post = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  folder: number;
  title: string;
  writer: number;
  content: string | null;
  _count: {
    Like: number;
  };
  Like: {
    id: number;
    postId: number;
    userId: number;
  }[];
};
export type PostError = { error: string; data: Partial<Post> };

//폴더 액션
export const getFolder = async (post_folder_Id: number) => {
  return await prisma.folder.findUnique({
    where: { id: post_folder_Id },
  });
};

export const getFolders = async () => {
  const folders = await prisma.folder.findMany({
    orderBy: { id: 'desc' },
  });
  return folders;
};

// 게시글 포스트 액션
export const getPosts = async (
  folder?: number,
  userId?: number,
  q?: string,
) => {
  const query = (q ?? '').trim();
  if (!query) {
    const include = {
      _count: { select: { Like: true } },
      ...(userId ? { Like: { where: { userId } } } : {}),
    };
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      where: folder ? { folder } : undefined,
      include,
    });
    return posts;
  }

  // stopword 로드
  const stopwords = await prisma.stopWord.findMany({
    where: { enabled: true },
    select: { word: true },
  });
  const stop = new Set(stopwords.map((s) => s.word));

  // 토큰화 + 불용어 제거
  const tokens = query
    .split(/\s+/)
    .map((t) => t.trim())
    .filter(Boolean)
    .filter((t) => !stop.has(t));

  if (tokens.length === 0) return [];

  const booleanQuery = tokens.map((t) => `+${t}*`).join(' ');
  const folderWhere = folder
    ? Prisma.sql`AND folder = ${folder}`
    : Prisma.empty;

  // 1) raw: id만 뽑기 (관련도 정렬)
  const hits = await prisma.$queryRaw<Array<{ id: number }>>(Prisma.sql`
    SELECT id
    FROM Post
    WHERE MATCH(title, content) AGAINST (${booleanQuery} IN BOOLEAN MODE)
    ${folderWhere}
    ORDER BY MATCH(title, content) AGAINST (${booleanQuery} IN BOOLEAN MODE) DESC
    LIMIT 50
  `);

  const ids = hits.map((h) => Number(h.id));
  if (ids.length === 0) return [];

  // 2) prisma: 관계(include/_count/Like필터) 붙여서 다시 조회
  const posts = await prisma.post.findMany({
    where: { id: { in: ids } },
    include: {
      _count: { select: { Like: true } },
      Like: userId ? { where: { userId } } : true,
    },
  });

  const order = new Map(ids.map((id, idx) => [id, idx]));

  posts.sort((a, b) => {
    const ia = order.get(a.id);
    const ib = order.get(b.id);
    return (ia ?? Number.MAX_SAFE_INTEGER) - (ib ?? Number.MAX_SAFE_INTEGER);
  });
  return posts;
};

export const getPost = async (postId: number) => {
  const post = await prisma.post.findUnique({
    where: { id: Number(postId) },
    select: {
      id: true,
      title: true,
      content: true,
      folder: true,
      _count: true,
      Like: true,
    },
  });
  return post;
};

export const savePostAction = async (formData: FormData) => {
  // createdAt, updatedAt => 스키마 모델 내부에서 자동으로 생성, 수정시 생성, 변경

  // early checking
  await requireAdmin();

  const session = await auth();
  if (!session?.user?.id) {
    return [{ error: { message: '로그인 필요' } }, null];
  }
  if (!formData.get('folder')) {
    return [
      {
        error: { folder: '게시판을 선택해주세요' },
        data: {}, // 입력했던 데이터는 유지!
      },
    ];
  }

  const zobj = z.object({
    title: z.string().min(1, '제목을 입력하세요.'),
    content: z.string().min(1, '내용을 입력하세요'),
  });

  const [err, data] = validate(zobj, formData);

  if (err) return err;
  const { title, content } = data;

  const postId = formData.get('postId');
  const folder = Number(formData.get('folder'));
  const writer = Number(session?.user.id);
  // const title = formData.get('title') as string;
  // const content = formData.get('content') as string;

  try {
    if (postId) {
      await prisma.post.update({
        where: { id: Number(postId) },
        data: { title, content },
      });
    } else {
      await prisma.post.create({
        data: {
          folder: folder,
          title: title,
          content: content,
          writer: writer,
        },
      });
      // folder readcnt 하나 증가
      await prisma.folder.update({
        where: { id: folder },
        data: { readcnt: { increment: 1 } },
      });
    }

    return [null, String(folder)];
  } catch (e) {
    return [
      {
        error: { message: `ERROR:${e} / DB 저장에 실패했습니다..` },
        data: {},
      },
    ];
  }
};

export const deletePost = async (
  postId: number,
  folderId: number,
  path: string,
) => {
  // early checking
  await requireAdmin();
  try {
    await prisma.post.delete({ where: { id: postId } });
    // folder readcnt 삭제 (path = 리다이렉트할 folderId)
    await prisma.folder.update({
      where: { id: Number(folderId) },
      data: { readcnt: { decrement: 1 } },
    });
    revalidatePath(`/${path}`);
  } catch (e) {
    //!!타입잡아야함
    return { error: e };
  }
};

// 유저 사용자 액션
export const getUsername = async (writerId: number) => {
  const user = await prisma.user.findUnique({ where: { id: writerId } });
  return user?.name;
};

export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

export const getSearchedUsers = async (q?: string) => {
  const query = (q ?? '').trim();

  return prisma.user.findMany({
    where: query ? { name: { contains: query } } : undefined,
    orderBy: { name: 'asc' },
    select: { id: true, name: true }, // “이름만”이라 최소로
  });
};

// 댓글 액션
export const getComments = async (postId: number) => {
  return await prisma.comment.findMany({
    where: { post_id: postId },
    orderBy: { createdAt: 'desc' },
    include: {
      User: true, // 작성자 정보 (User 모델) 포함
      // 답글
      replies: {
        include: { User: true },
        orderBy: { createdAt: 'asc' },
      },
    },
  });
};

export const deleteComment = async (
  commentId: number,
  folderId: number | undefined,
) => {
  const comment = await prisma.comment.findUnique({ where: { id: commentId } });
  if (!comment) throw new Error('댓글이 존재하지 않습니다.');
  await requireOwnerOrAdmin(comment?.writer_id);
  try {
    await prisma.comment.delete({
      where: { id: commentId },
    });
    // 값이 있다면 그 폴더로, 없다면 루트에서 보던 것이므로 루트로
    if (folderId) {
      revalidatePath(`/${folderId}`);
    } else {
      revalidatePath('/');
    }
  } catch (e) {
    alert('삭제에 실패했습니다');
    console.log(e);
  }
};

export const saveComment = async (formData: FormData) => {
  const writer_id = Number(formData.get('writer_id'));
  //early checking
  await requireOwnerOrAdmin(writer_id);

  const zobj = z.object({
    content: z.string().min(1, '내용을 입력하세요'),
  });

  const [err, datas] = validate(zobj, formData);
  if (err) return err;

  const { content } = datas;

  const post_id = Number(formData.get('post_id'));
  // const content = formData.get('content') as string;
  const data = { post_id, writer_id, content };
  const parentIdRaw = formData.get('parent_id');
  const parentId = parentIdRaw ? Number(parentIdRaw) : null;
  if (!content.trim()) {
    return [{ error: '댓글을 입력해주세요', data: {} }, null];
  }

  try {
    await prisma.comment.create({
      data: {
        post_id,
        writer_id,
        content,
        parentId,
      },
    });
    return [undefined, data];
  } catch (err) {
    if (err instanceof AuthError) {
      const msg = err.message || 'EmailSignInError';
      const email = msg.substring(0, msg.indexOf('Read more'));
      return [{ error: { email }, data: {} }, null];
    }
    return [{ error: { email: JSON.stringify(err) } }, data];
  }
};

export const updateComment = async (formData: FormData) => {
  const commentId = Number(formData.get('comment_id'));
  const content = String(formData.get('content') ?? '');

  const comment = await prisma.comment.findUnique({ where: { id: commentId } });
  if (!comment) return [{ error: { message: '댓글이 없습니다' }, data: {} }];
  if (comment.content.trim() === content) {
    return [{ error: { content: '수정된 내용이 없습니다.' }, data: {} }];
  }

  await requireOwnerOrAdmin(comment?.writer_id);
  // TODO: 유효성 검사/에러 리턴은 saveComment 스타일에 맞춰서 동일하게 처리
  try {
    await prisma.comment.update({
      where: {
        id: commentId,
      },
      data: { content },
    });
    return [undefined, content];
  } catch (err) {
    if (err instanceof AuthError) {
      const msg = err.message || 'EmailSignInError';
      const email = msg.substring(0, msg.indexOf('Read more'));
      return [{ error: { email }, data: {} }, null];
    }
    return [{ error: { email: JSON.stringify(err) } }, content];
  }
};

export const getCommentsCnt = async (postId: number) => {
  return await prisma.comment.count({
    where: { post_id: postId },
    orderBy: { createdAt: 'desc' },
  });
};

// 좋아요 액션
// lib/posts.action.ts
export const toggleLike = async (postId: number, userId: number) => {
  const deleted = await prisma.like.deleteMany({
    where: { postId, userId },
  });

  const liked = deleted.count === 0;

  await requireOwnerOrAdmin(userId);

  if (liked) {
    await prisma.like.create({
      data: { postId, userId },
    });
  }

  const likeCount = await prisma.like.count({
    where: { postId },
  });

  return { likeCount, liked };
};
