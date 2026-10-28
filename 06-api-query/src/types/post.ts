import { postSchema } from '@/schemas/post';
import { z } from 'zod';

export type Post = z.infer<typeof postSchema>;
