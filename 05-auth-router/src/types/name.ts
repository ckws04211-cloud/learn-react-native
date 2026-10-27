import { nameSchema } from '@/schemas/name';
import { z } from 'zod';

export type NameForm = z.infer<typeof nameSchema>;
