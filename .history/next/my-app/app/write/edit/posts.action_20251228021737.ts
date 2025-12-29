"use server";
export type Post = {
  folder: number;
  title: string;
  content: string;
  isprivate: boolean;
  ispublic: boolean;
};
export type PostError = { error: string; data: Partial<Post> };

// 백엔드단에서 form으로 받은 데이터를 분해, 백엔드에서 쓸 수 있게끔 정제해서 내려주는 필터

export const savePosts = async (
  formData: FormData
): Promise<[PostError] | [undefined, Post]> => {
  console.log(Object.fromEntries(formData.entries()));

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const folder = Number(formData.get("folder"));
  const title = formData.get("title") as string;
  const isprivate = formData.get("isprivate") === "on";
  const ispublic = formData.get("ispublic") === "on";
  const content = formData.get("content") as string;
  const data = { folder, title, content, isprivate, ispublic };

  if (!title) return [{ error: "Input the title!", data }];
  return [undefined, data];
};
