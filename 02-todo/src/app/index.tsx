import * as Crypto from 'expo-crypto';
import { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Todo } from '@/types/todo';
import TodoItem from '@/components/todo-item';
import TodoInput from '@/components/todo-input';

export default function Index() {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  // input 변경
  const onChangeInput = (value: string) => {
    setInput(value);
  };

  // todo 추가
  const onAdd = () => {
    const currentText = input.trim();
    // 텍스트 내용 없으면, 시스템 알림 띄우기
    if (currentText.length === 0) {
      Alert.alert('알림', '할 일을 입력하세요.');
      return;
    }

    setTodos((prev) => [
      ...prev,
      { id: Crypto.randomUUID(), text: currentText, done: false },
    ]);
    setInput('');
  };

  // 완료/취소 토글
  const onToggle = (id: string) => {
    setTodos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      ),
    );
  };

  // 삭제
  const onDelete = (id: string) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={todos}
          keyExtractor={(item) => item.id}
          keyboardDismissMode="on-drag" // 스크롤을 시작하면 키보드가 내려감
          keyboardShouldPersistTaps="handled" // 목록의 버튼(삭제)을 한 번에 누를 수 있게 함
          renderItem={({ item }) => (
            <TodoItem item={item} onToggle={onToggle} onDelete={onDelete} />
          )}
          ListEmptyComponent={
            <View style={styles.emptyTodo}>
              <Text style={styles.emptyTodoText}>할 일이 없어요</Text>
            </View>
          }
        />
        <TodoInput input={input} onChangeInput={onChangeInput} onAdd={onAdd} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1 },
  listContent: { flexGrow: 1 },
  emptyTodo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTodoText: {
    color: '#999',
    paddingHorizontal: 24,
    fontSize: 24,
    fontWeight: '200',
  },
});
