'use server';
export const savePosts = async (formData: FormData) => {
  console.log(Object.fromEntries(formData.entries()));

  const title = formData.get('title');
  const isprivate = formData.get('private') === 'on';
  const content = formData.get('content');
  return { title, content, isprivate };
};
