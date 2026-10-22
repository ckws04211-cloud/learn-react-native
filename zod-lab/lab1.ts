import { z } from 'zod';

const emailSchema = z.email('올바른 이메일을 입력하세요');

console.log(emailSchema.safeParse('abc'));
console.log(emailSchema.safeParse('a@b.com'));
console.log(emailSchema.safeParse(''));
