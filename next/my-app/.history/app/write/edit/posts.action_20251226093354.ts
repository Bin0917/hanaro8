const savePosts = async (formData: FormData) => {
  'use server';
  console.log(Object.fromEntries(formData.entries()));
};
