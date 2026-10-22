import { z } from 'zod';

const AMOUNT_MAX_DIGITS = 10;

const amountSchema = z
  .string()
  .min(1, '금액을 입력해주세요')
  .regex(/^\d+$/, '숫자만 입력해주세요')
  .refine((item) => Number(item) > 0, '1원 이상 입력해주세요')
  .max(AMOUNT_MAX_DIGITS, '금액이 너무 큽니다');

const showZodResultLog = (label: string, testValue: string) => {
  const result = amountSchema.safeParse(testValue);
  if (result.success) {
    const amount: number = Number(result.data);
    console.log(label, amount, typeof amount);
  } else {
    const messages = result.error.issues.map((i) => i.message);
    console.log(label, messages);
  }
};

showZodResultLog('t1', '');
showZodResultLog('t2', 'abc');
showZodResultLog('t3', '0');
showZodResultLog('t4', '12345678901');
showZodResultLog('t5', '1500');
