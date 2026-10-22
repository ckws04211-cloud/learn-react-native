import { z } from 'zod';

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, '비밀번호는 8자 이상이어야 합니다')
      .max(30, '비밀번호는 30자 이하여야 합니다')
      .regex(
        /^(?=.*[a-zA-Z])(?=.*\d)/,
        '비밀번호는 영문과 숫자를 모두 포함해야 합니다',
      ),
    confirmPassword: z.string(),
  })
  .refine((item) => item.password === item.confirmPassword, {
    message: '비밀번호와 일치하지 않습니다',
    path: ['confirmPassword'],
  });

const t1 = { password: 'abc12345', confirmPassword: 'abc12345' };
console.log(passwordSchema.safeParse(t1));
const t2 = { password: 'abc12345', confirmPassword: 'abc12346' };
console.log(passwordSchema.safeParse(t2), passwordSchema.safeParse(t2).error);
const t3 = { password: 'abc', confirmPassword: 'abc' };
console.log(passwordSchema.safeParse(t3));
const t4 = { password: 'abc', confirmPassword: 'xyz' };
console.log(passwordSchema.safeParse(t4), passwordSchema.safeParse(t4).error);
