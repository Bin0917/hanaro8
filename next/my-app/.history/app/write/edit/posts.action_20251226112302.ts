'use server';
export const savePosts = async (formData: FormData) => {
  console.log(Object.fromEntries(formData.entries()));

  const title = formData.get('title');
  const content = formData.get('content');
};
