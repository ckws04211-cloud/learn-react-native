import { profileSchema } from '@/schemas/profile';
import { z } from 'zod';

export type ProfileForm = z.infer<typeof profileSchema>;
