import { passwordSchema } from '@/schemas/password';
import { z } from 'zod';

export type PasswordForm = z.infer<typeof passwordSchema>;
