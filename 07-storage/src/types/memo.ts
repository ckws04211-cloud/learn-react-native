import { memoSchema, memosSchema } from '@/schema/memo';
import z from 'zod';

export type Memo = z.infer<typeof memoSchema>;
export type Memos = z.infer<typeof memosSchema>;
