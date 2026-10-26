import { ExpenseForm } from '@/types/expense';
import { Control, Controller } from 'react-hook-form';
import { StyleSheet, View, Pressable, Text, TextInput, TextInputInstance } from 'react-native';
import InputItem from './InputItem';
import { useRef } from 'react';
import { AMOUNT_MAX, AMOUNT_MAX_DIGITS } from '@/constants/expense';

type Props = {
  control: Control<ExpenseForm>;
  onSubmit: () => void;
};
export default function InputForm({ control, onSubmit }: Props) {
  const amountRef = useRef<TextInputInstance>(null);
  return (
    <View style={styles.formWrapper}>
      <Controller
        control={control}
        name="memo"
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => (
          <InputItem
            labelText="지출 내용"
            placeholder="지출 내용을 입력하세요"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={error}
            returnKeyType="next"
            onSubmitEditing={() => amountRef.current?.focus()}
          />
        )}
      />
      <Controller
        control={control}
        name="amount"
        render={({
          field: { value, onChange, onBlur },
          fieldState: { error },
        }) => (
          <InputItem
            labelText="지출 금액"
            placeholder="지출 금액을 입력하세요"
            helperText={`최대 ${AMOUNT_MAX.toLocaleString('ko-KR')}원까지 입력할 수 있어요`}
            value={value ? Number(value).toLocaleString('ko-KR') : ''}
            onChangeText={(text) =>
              onChange(text.replace(/\D/g, '').slice(0, AMOUNT_MAX_DIGITS))
            }
            onBlur={onBlur}
            error={error}
            keyboardType="number-pad"
            ref={amountRef}
          />
        )}
      />
      <Pressable style={styles.addButton} onPress={onSubmit}>
        <Text style={styles.addButtonText}>지출 추가</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  formWrapper: {
    width: '100%',
    gap: 4,
  },
  addButton: { backgroundColor: '#0066CC', padding: 8, borderRadius: 8 },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});
