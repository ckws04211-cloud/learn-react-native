import { loginSchema } from '@/schemas/login';
import { z } from 'zod';

export type LoginForm = z.infer<typeof loginSchema>;
