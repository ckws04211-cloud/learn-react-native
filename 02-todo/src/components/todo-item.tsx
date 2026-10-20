import { Todo } from '@/types/todo';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  item: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

const TodoItem = ({ item, onToggle, onDelete }: Props) => {
  return (
    <View style={styles.todoBox}>
      <Text style={[styles.todoText, item.done && styles.todoTextDone]}>
        {item.text}
      </Text>
      <Pressable
        style={({ pressed }) => [
          styles.doneTodoButton,
          item.done
            ? styles.doneTodoButtonStatusCancel
            : styles.doneTodoButtonStatusDone,
          pressed && { opacity: 0.7 },
        ]}
        onPress={() => onToggle(item.id)}
      >
        <Text style={styles.doneTodoButtonText}>
          {item.done ? '취소' : '완료'}
        </Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.deleteTodoButton,
          pressed && { opacity: 0.7 },
        ]}
        onPress={() => onDelete(item.id)}
      >
        <Text style={styles.deleteTodoButtonText}>삭제</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  todoBox: { flexDirection: 'row', padding: 16, alignItems: 'center', gap: 8 },
  todoText: { flex: 1 },
  todoTextDone: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  doneTodoButton: {
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    height: 32,
  },
  doneTodoButtonStatusDone: { backgroundColor: '#34c759' },
  doneTodoButtonStatusCancel: { backgroundColor: '#8e8e93' },
  doneTodoButtonText: { color: '#fff' },
  deleteTodoButton: {
    backgroundColor: '#ff3030',
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    height: 32,
  },
  deleteTodoButtonText: {
    color: '#fff',
  },
});

export default TodoItem;
