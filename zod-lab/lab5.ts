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

type PasswordForm = z.infer<typeof passwordSchema>;

const bad: PasswordForm = {
  password: 'abc1234',
  confirmPassword: '123' /* 123 */,
};
