import { AMOUNT_MAX_DIGITS } from '@/constants/expense';
import { z } from 'zod';

export const expenseFormSchema = z.object({
  memo: z
    .string()
    .trim()
    .min(1, '내용을 입력해주세요')
    .max(20, '20자 이하로 입력해주세요'),
  amount: z
    .string()
    .min(1, '금액을 입력해주세요')
    .regex(/^\d+$/, '숫자만 입력해주세요')
    .refine((v) => Number(v) >= 1, '1원 이상 입력해주세요')
    .refine((v) => v.length <= AMOUNT_MAX_DIGITS, '금액이 너무 큽니다'),
});
