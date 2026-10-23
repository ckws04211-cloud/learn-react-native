import { z } from 'zod';

const MIN_NAME_LENGTH = 2; // 이름 최소 길이
const MAX_NAME_LENGTH = 10; // 이름 최대 길이
const MIN_AGE = 1; // 나이 최소
const MAX_AGE = 120; // 나이 최대
const MAX_INTRODUCE_LENGTH = 50; // 소개 최대 길이

export const profileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(MIN_NAME_LENGTH, `${MIN_NAME_LENGTH}자 이상으로 입력해주세요`)
    .max(MAX_NAME_LENGTH, `${MAX_NAME_LENGTH}자 이하로 입력해주세요`),
  age: z
    .string()
    .trim()
    .min(1, '나이는 필수값입니다.')
    .regex(/^\d+$/, '숫자만 입력해주세요')
    .refine(
      (item) => Number(item) >= MIN_AGE,
      `${MIN_AGE} 이상으로 입력해주세요`,
    )
    .refine(
      (item) => Number(item) <= MAX_AGE,
      `${MAX_AGE} 이하로 입력해주세요`,
    ),
  introduce: z
    .string()
    .trim()
    .max(MAX_INTRODUCE_LENGTH, `${MAX_INTRODUCE_LENGTH}자 이하로 입력해주세요`),
});
