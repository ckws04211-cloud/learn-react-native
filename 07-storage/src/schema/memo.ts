import { z } from 'zod';

const MAX_MEMO_LENGTH = 200;

export const memoSchema = z.object({
  id: z.string(),
  memo: z
    .string()
    .trim()
    .min(1, '메모를 입력해주세요')
    .max(MAX_MEMO_LENGTH, `${MAX_MEMO_LENGTH}자 이하로 입력해주세요`),
});

export const memosSchema = z.array(memoSchema);
