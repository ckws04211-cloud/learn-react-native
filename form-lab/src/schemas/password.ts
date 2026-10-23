import { z } from 'zod';

export const passwordSchema = z
  .object({
    originPassword: z.string().min(1, '비밀번호를 입력해주세요'),
    newPassword: z.string().min(1, '새 비밀번호를 입력해주세요'),
    newConfirmPassword: z.string().min(1, '새 비밀번호 확인을 입력해주세요'),
  })
  .refine((item) => item.originPassword !== item.newPassword, {
    message: '새 비밀번호는 기존 비밀번호와 달라야 합니다.',
    path: ['newPassword'],
  })
  .refine((item) => item.newPassword === item.newConfirmPassword, {
    message: '새 비밀번호와 확인이 일치하지 않습니다',
    path: ['newConfirmPassword'],
  });

/* const showResult = ({
  label,
  data,
}: {
  label: string;
  data: {
    originPassword: string;
    newPassword: string;
    newConfirmPassword: string;
  };
}) => {
  const result = passwordSchema.safeParse(data);
  console.log(`[${label}] start`);
  if (result.success) {
    console.log(result);
  } else {
    console.log(result.error);
  }
  console.log(`[${label}] end`);
}; */

/* const t1Data = {
  originPassword: '123',
  newPassword: '123',
  newConfirmPassword: '123',
};
showResult({ label: 't1', data: t1Data });
const t2Data = {
  originPassword: '123',
  newPassword: '456',
  newConfirmPassword: '456',
};
showResult({ label: 't2', data: t2Data });
const t3Data = {
  originPassword: '123',
  newPassword: '456',
  newConfirmPassword: '789',
};
showResult({ label: 't3', data: t3Data });
const t4Data = {
  originPassword: '123',
  newPassword: '123',
  newConfirmPassword: '999',
};
showResult({ label: 't4', data: t4Data });
 */
