import { Expense } from '@/types/expense';
import dayjs from 'dayjs';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  data: Expense[];
  handleDeleteItem: (id: string) => void;
};

export default function ExpensesList({ data, handleDeleteItem }: Props) {
  return (
    <FlatList
      data={data}
      contentContainerStyle={styles.expensesListWrapper}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      renderItem={({ item, index }) => (
        <View style={styles.expenseListItem}>
          <View style={styles.indexTag}>
            <Text style={styles.indexTagText}>{index + 1}</Text>
          </View>
          <View style={styles.expenseContent}>
            <Text style={styles.memoText}>{item.memo}</Text>
            <Text style={styles.amountText}>
              {item.amount.toLocaleString()}원
            </Text>
            <Text style={styles.createdAtText}>
              {dayjs(item.createdAt).format('YYYY-MM-DD HH:mm')}
            </Text>
          </View>
          <Pressable
            style={styles.deleteButton}
            onPress={() => handleDeleteItem(item.id)}
            hitSlop={8}
          >
            <Text style={styles.deleteButtonText}>삭제</Text>
          </Pressable>
        </View>
      )}
      ListEmptyComponent={
        <View style={styles.empty}>
          <Text>아직 지출이 없어요</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  expensesListWrapper: {
    gap: 12,
    flexGrow: 1,
  },
  expenseListItem: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  indexTag: {
    backgroundColor: '#34C759',
    minWidth: 20,
    height: 20,
    paddingHorizontal: 4,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indexTagText: {
    color: '#fff',
  },
  expenseContent: {
    flexGrow: 1,
  },
  memoText: {
    fontSize: 14,
  },
  amountText: {
    fontSize: 18,
    fontWeight: '600',
  },
  createdAtText: {
    fontSize: 12,
    color: '#1D1D1F',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    minWidth: 20,
    height: 20,
    paddingHorizontal: 4,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
