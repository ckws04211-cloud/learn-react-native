import { expenseFormSchema } from '@/schemas/expense';
import { z } from 'zod';

export type Expense = {
  id: string;
  memo: string;
  amount: number;
  createdAt: Date;
};
export type ExpenseForm = z.infer<typeof expenseFormSchema>;
