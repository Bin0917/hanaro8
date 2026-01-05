import { compare, hash } from 'bcryptjs';
import { existsSync, mkdirSync } from 'fs';
import { writeFile } from 'fs/promises';
// biome-ignore lint/style/useNodejsImportProtocol: edge runtime
import path from 'path';
import z from 'zod';

export const comparePassword = async (
  plainPasswd: string,
  encPassword: string,
) => compare(plainPasswd, encPassword);

export const encryptPassword = async (plainPasswd: string) =>
  hash(plainPasswd, 10);

export type ValidError = {
  error: Record<string, string | undefined>;
  // null : 비밀번호 등 애초에 빈 값
  data: Record<string, string | undefined | null>;
};

export const validate = <T extends z.ZodObject>(
  zobj: T,
  formData: FormData,
) => {
  const data = Object.fromEntries(formData.entries()) as ValidError['data'];
  for (const k of Object.keys(data)) {
    if (k.startsWith('$')) delete data[k];
  }
  const validator = zobj.safeParse(data);
  if (!validator.success) {
    const verr = z.treeifyError(validator.error).properties || {};
    const validError: ValidError = { error: {}, data };
    for (const [k, v] of Object.entries(verr)) {
      validError.error[k] = v?.errors[0];
    }
    return [validError] as const;
  }

  return [undefined, validator.data] as const;
};

// 가입시 프로필 사진 저장
export const saveProfile = async (file: File) => {
  // server action
  if (file && file.size > 0) {
    const fileName = `${file.name}`;
    const uploadDir = path.join(process.cwd(), 'public/profile');
    if (!existsSync(uploadDir)) mkdirSync(uploadDir);
    const filePath = path.join(uploadDir, fileName);
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer);
    return `/profile/${fileName}`;
  }
};
