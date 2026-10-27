import { z } from 'zod';

const MIN_LENGTH = 2;
const MAX_LENGTH = 10;

export const nameSchema = z.object({
  name: z
    .string()
    .min(MIN_LENGTH, `${MIN_LENGTH}글자 이상으로 입력해주세요`)
    .max(MAX_LENGTH, `${MAX_LENGTH}글자 이하로 입력해주세요`),
});
