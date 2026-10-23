import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email('올바른 이메일 형식을 입력해주세요'),
  password: z.string().min(8, '8자 이상 입력해주세요'),
});
