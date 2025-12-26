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

  const title = formData.get('title');
  const isprivate = formData.get('private') === 'on';
  const content = formData.get('content');
  if (!title) return { error: 'Input the title!' };
  return { title, content, isprivate };
};
