import { z } from 'zod';

const schema = z.object({
  email: z.email('올바른 이메일을 입력하세요'),
  password: z
    .string()
    .min(1, '비밀번호를 입력해야 합니다')
    .min(8, '8자 이상이어야 합니다')
    .max(30, '30자 이하여야 합니다')
    .regex(/[A-Za-z]/, '영문을 포함해야 합니다')
    .regex(/[0-9]/, '숫자를 포함해야 합니다'),
  confirmPassword: z.string(),
});

export const signupSchema = schema.refine(
  (v) => v.password === v.confirmPassword,
  {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  },
);
