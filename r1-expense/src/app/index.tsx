import * as Crypto from 'expo-crypto';
import { Keyboard, StyleSheet } from 'react-native';
import Summary from '@/components/Summary';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';
import { Expense, ExpenseForm } from '@/types/expense';
import { expenseFormSchema } from '@/schemas/expense';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import ExpensesList from '@/components/ExpensesList';
import InputForm from '@/components/InputForm';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

export default function Index() {
  const { control, handleSubmit, reset } = useForm<ExpenseForm>({
    resolver: zodResolver(expenseFormSchema),
    mode: 'onBlur',
    defaultValues: { memo: '', amount: '' },
  });
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // 지출 추가 핸들러
  const handleDone = (data: ExpenseForm) => {
    // 지출 내용/금액을 데이터에 추가
    setExpenses((prev) => [
      {
        id: Crypto.randomUUID(),
        memo: data.memo,
        amount: Number(data.amount),
        createdAt: new Date(),
      },
      ...prev,
    ]);

    // 정리
    reset();
    Keyboard.dismiss();
  };

  const handleDeleteItem = (id: string) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1, gap: 18 }} behavior="padding">
        <Summary data={expenses} />
        <ExpensesList data={expenses} handleDeleteItem={handleDeleteItem} />
        <InputForm control={control} onSubmit={handleSubmit(handleDone)} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
