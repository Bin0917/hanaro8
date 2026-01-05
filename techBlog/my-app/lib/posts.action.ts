'use server';
import { revalidatePath } from 'next/cache';
import { AuthError } from 'next-auth';
import { auth } from './auth';
import { prisma } from './prisma';

export type Post = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  folder: number;
  title: string;
  writer: number;
  content: string | null;
};
export type PostError = { error: string; data: Partial<Post> };

export const getPosts = async (folder?: number) => {
  // 최상단 10개만 가져오기
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    where: folder ? { folder: folder } : {},
  });
  return posts;
};

export const getPost = async (postId: number) => {
  const post = await prisma.post.findUnique({
    where: { id: Number(postId) },
    select: { id: true, title: true, content: true, folder: true },
  });
  return post;
};

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

export const savePostAction = async (formData: FormData) => {
  // createdAt, updatedAt => 스키마 모델 내부에서 자동으로 생성, 수정시 생성, 변경

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
  const postId = formData.get('postId');
  const folder = Number(formData.get('folder'));
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const writer = Number(session?.user.id);

  console.log('생성전');

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

export const getUsername = async (writerId: number) => {
  const user = await prisma.user.findUnique({ where: { id: writerId } });
  return user?.name;
};

export const getComments = async (postId: number) => {
  return await prisma.comment.findMany({
    where: { post_id: postId },
    orderBy: { createdAt: 'desc' },
    include: {
      User: true, // 작성자 정보 (User 모델) 포함
    },
  });
};

export const deleteComment = async (commentId: number) => {
  try {
    await prisma.comment.delete({
      where: { id: commentId },
    });
  } catch (e) {
    alert('삭제에 실패했습니다');
    console.log(e);
  }
};

export const saveComment = async (formData: FormData) => {
  const post_id = Number(formData.get('post_id'));
  const writer_id = Number(formData.get('writer_id'));
  const content = formData.get('content') as string;
  const data = { post_id, writer_id, content };
  if (!content.trim()) {
    return [{ error: '댓글을 입력해주세요', data: {} }, null];
  }

  try {
    await prisma.comment.create({
      data: {
        post_id: post_id,
        writer_id: writer_id,
        content: content,
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

export const getCommentsCnt = async (postId: number) => {
  return await prisma.comment.count({
    where: { post_id: postId },
    orderBy: { createdAt: 'desc' },
  });
};
