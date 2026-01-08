'use server';
import { revalidatePath } from 'next/cache';
import { AuthError } from 'next-auth';
import { cache } from 'react';
import z from 'zod';
import { auth } from './auth';
import { Prisma } from './generated/prisma/client';
import { requireAdmin, requireOwnerOrAdmin, requireUser } from './guard';
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
const getStopWords = cache(async () => {
  const stopwords = await prisma.stopWord.findMany({
    where: { enabled: true },
    select: { word: true },
  });
  return new Set(stopwords.map((s) => s.word));
});

export const getPosts = async (
  folder?: number,
  userId?: number,
  q?: string,
) => {
  const query = (q ?? '').trim();

  if (!query) {
    // 2) include → select로 변경 (필요한 것만 가져오기)
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      where: folder ? { folder } : undefined,
      select: {
        id: true,
        title: true,
        content: true,
        writer: true,
        updatedAt: true,
        createdAt: true,
        folder: true,
        _count: {
          select: { Like: true },
        },
        // 3) Like는 현재 유저 것만 (1개만)
        Like: userId
          ? {
              where: { userId },
              take: 1, // 있는지 여부만 확인
              select: { userId: true },
            }
          : false, // userId 없으면 아예 안 가져옴
      },
    });
    return posts;
  }

  // 5) stopword 캐시 사용
  const stop = await getStopWords();

  // 토큰화 + 불용어 제거
  const tokens = query
    .split(/\s+/) // 스페이스 나누기
    .map((t) => t.trim()) // 공백 날리기
    .filter(Boolean)
    .filter((t) => !stop.has(t)); // 불용어제거

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

  // 6) 검색 결과도 동일하게 최적화
  const posts = await prisma.post.findMany({
    where: { id: { in: ids } },
    select: {
      id: true,
      title: true,
      content: true,
      writer: true,
      updatedAt: true,
      createdAt: true,
      folder: true,
      _count: {
        select: { Like: true },
      },
      Like: userId
        ? {
            where: { userId },
            take: 1,
            select: { userId: true },
          }
        : false,
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
    where: { id: postId },
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
  if (!session?.user?.isadmin) {
    return [{ error: { message: '관리자 로그인 필요' } }, null];
  }
  if (!formData.get('folder')) {
    return [{ error: { folder: '게시판을 선택해주세요' } }, null];
  }

  const zobj = z.object({
    title: z.string().min(1, '제목을 입력하세요.'),
    content: z.string().min(1, '내용을 입력하세요'),
  });

  const [err, data] = validate(zobj, formData);

  if (err) return [err, null];
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
      { error: { message: `ERROR:${e} / DB 저장에 실패했습니다..` } },
      null,
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

  const { isAdmin, userId } = await requireUser();
  if (isAdmin) {
    // 어드민 & 어드민이 작성한 댓글일 경우
    if (comment.writer_id === userId) {
      await prisma.comment.deleteMany({ where: { parentId: commentId } });
      await prisma.comment.delete({
        where: { id: commentId },
      });
    } else {
      await prisma.comment.update({
        where: { id: commentId },
        data: { content: '삭제된 댓글입니다', deletedAt: new Date() },
      });
    }
  } else {
    // 오너확인
    await requireOwnerOrAdmin(comment.writer_id);
    // 답글 삭제 -> 본 댓글 삭제
    await prisma.comment.deleteMany({ where: { parentId: commentId } });
    await prisma.comment.delete({
      where: { id: commentId },
    });
  }
  // 값이 있다면 그 폴더로, 없다면 루트에서 보던 것이므로 루트로
  revalidatePath(folderId ? `/${folderId}` : '/');
};

export const saveComment = async (formData: FormData) => {
  const writer_id = Number(formData.get('writer_id'));
  //early checking
  await requireOwnerOrAdmin(writer_id);

  const zobj = z.object({
    content: z.string().min(1, '내용을 입력하세요'),
  });

  const [err, datas] = validate(zobj, formData);
  if (err) return [err, null];

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

  if (!commentId)
    return [{ error: { message: '잘못된 요청' }, data: {} }] as const;
  if (!content)
    return [{ error: { content: '내용을 입력하세요.' }, data: {} }] as const;
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    select: { writer_id: true },
  });
  if (!comment)
    return [{ error: { message: '댓글이 없습니다' }, data: {} }] as const;

  await requireOwnerOrAdmin(comment.writer_id);
  try {
    const result = await prisma.comment.updateMany({
      where: {
        id: commentId,
        deletedAt: null,
        content: { not: content },
      },
      data: { content },
    }); // updateMany 패턴

    if (result.count === 0) {
      // deletedAt이 있거나, 내용이 동일한 경우
      return [
        {
          error: { content: '삭제된 댓글이거나 수정된 내용이 없습니다.' },
          data: {},
        },
      ] as const;
    }

    return [undefined, content] as const;
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
export const toggleLike = async (postId: number, userId: number) => {
  await requireUser();
  const deleted = await prisma.like.deleteMany({
    where: { postId, userId },
  });

  const liked = deleted.count === 0;

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
