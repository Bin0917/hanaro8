'use server';
export type Post = {
  title: string;
  content: string;
  isprivate: boolean;
};
export const savePosts = async (
  formData: FormData,
): Promise<{ error: string } | Post> => {
  console.log(Object.fromEntries(formData.entries()));

  const title = formData.get('title') as string;
  const isprivate = formData.get('private') === 'on';
  const content = formData.get('content') as string;
  if (!title) return [{ error: 'Input the title!' }];
  return [null, { title, content, isprivate }];
};
