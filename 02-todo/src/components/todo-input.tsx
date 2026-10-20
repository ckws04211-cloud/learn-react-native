import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

type Props = {
  input: string;
  onChangeInput: (value: string) => void;
  onAdd: () => void;
};

const TodoInput = ({ input, onChangeInput, onAdd }: Props) => {
  return (
    <View style={styles.inputBox}>
      <TextInput
        style={styles.todoInput}
        placeholderTextColor="#999"
        placeholder="할 일을 입력하세요."
        value={input}
        onChangeText={onChangeInput}
        onSubmitEditing={onAdd}
      />
      <Pressable
        style={({ pressed }) => [styles.addButton, pressed && { opacity: 0.7 }]}
        onPress={onAdd}
      >
        <Text style={styles.addButtonText}>추가</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    flexDirection: 'row',
    gap: 8,
    padding: 16,
  },
  todoInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  addButton: {
    backgroundColor: '#0071E3',
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
  },
});

export default TodoInput;
