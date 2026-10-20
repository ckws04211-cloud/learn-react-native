import { signupSchema } from '@/schemas/signup';
import type { z } from 'zod';

export type SignupForm = z.infer<typeof signupSchema>;
