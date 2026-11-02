import { Memo } from '@/types/memo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  item: Memo;
  handleDelete: (id: string) => void;
};

export default function MemoItem({ item, handleDelete }: Props) {
  return (
    <View style={styles.memoItem}>
      <Text style={styles.memoText}>{item.memo}</Text>
      <Pressable
        style={({ pressed }) => [
          styles.deleteButton,
          pressed && { opacity: 0.7 },
        ]}
        onPress={() => handleDelete(item.id)}
        hitSlop={20}
      >
        <AntDesign name="delete" size={16} color="#fff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  memoItem: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 8,
    alignItems: 'center',
    gap: 8,
  },
  memoText: {
    flex: 1,
  },
  deleteButton: {
    backgroundColor: 'teal',
    borderRadius: 8,
    padding: 4,
  },
});
