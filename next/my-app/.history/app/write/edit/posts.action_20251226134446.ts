'use server';
export type Post = {
  folder: number;
  title: string;
  content: string;
  isprivate: boolean;
};
export type PostError = { error: string; data: Post };
export const savePosts = async (
  formData: FormData,
): Promise<[PostError] | [undefined, Post]> => {
  console.log(Object.fromEntries(formData.entries()));

  const folder = Number(formData.get('title'));
  const title = formData.get('title') as string;
  const isprivate = formData.get('private') === 'on';
  const content = formData.get('content') as string;
  const data = { folder, title, content, isprivate };
  if (!title) return [{ error: 'Input the title!', data }];
  return [undefined, data];
};
