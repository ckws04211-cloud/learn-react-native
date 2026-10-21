import { Expense } from '@/types/expense';
import { Keyboard, Pressable, StyleSheet, Text } from 'react-native';

type Props = {
  data: Expense[];
};
export default function Summary({ data }: Props) {
  return (
    <Pressable
      style={styles.summaryWrapper}
      onPress={() => Keyboard.dismiss()}
      accessible={false}
    >
      <Text style={styles.label}>
        총 지출({data.length.toLocaleString()}건)
      </Text>
      <Text style={styles.value}>
        {data.reduce((acc, cur) => acc + cur.amount, 0).toLocaleString()}원
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  summaryWrapper: {
    borderWidth: 1.5,
    borderRadius: 16,
    width: '100%',
    padding: 12,
    boxShadow: '0px 4px 10px #00000033',
  },
  label: {},
  value: {
    fontWeight: '600',
    fontSize: 40,
  },
});
