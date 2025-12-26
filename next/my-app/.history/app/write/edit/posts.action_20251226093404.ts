'use server';
export const savePosts = async (formData: FormData) => {
  console.log(Object.fromEntries(formData.entries()));
};
