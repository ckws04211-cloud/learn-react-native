import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(8, '비밀번호는 8자 이상이어야 합니다')
  .max(30, '비밀번호는 30자 이하여야 합니다')
  .regex(
    /^(?=.*[a-zA-Z])(?=.*\d)/,
    '비밀번호는 영문과 숫자를 모두 포함해야 합니다',
  );

console.log(passwordSchema.safeParse('abc').error);
