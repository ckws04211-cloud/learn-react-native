import EmptyItem from '@/components/EmptyItem';
import MemoItem from '@/components/MemoItem';
import { memoSchema, memosSchema } from '@/schema/memo';
import { Memo, Memos } from '@/types/memo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

export default function HomeScreen() {
  const [memos, setMemos] = useState<Memos>([]); // 처음엔 빈 배열
  const [isLoading, setIsLoading] = useState(true); // 복원 중 표시
  const [memoText, setMemoText] = useState('');
  const [isInputFocus, setIsInputFocus] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const raw = await AsyncStorage.getItem('memoData'); // string | null
        if (raw) {
          const result = memosSchema.safeParse(JSON.parse(raw));
          if (result.success) setMemos(result.data);
        }
      } catch {
        // 저장된 값이 깨졌으면 빈 목록으로 시작
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  // 메모 추가
  const AddMemo = () => {
    const newItem: Memo = {
      id: Crypto.randomUUID(),
      memo: memoText,
    };

    const result = memoSchema.safeParse(newItem);
    if (result.success) {
      setMemos((prev) => [...prev, newItem]);
      Keyboard.dismiss();
      setMemoText('');
    } else {
      Alert.alert('알림', result?.error.issues[0].message);
    }
  };

  // 메모 삭제
  const DeleteMemo = (id: string) => {
    setMemos((prev) => prev.filter((item) => item.id !== id));
  };

  // state, AsyncStorage 동기화
  useEffect(() => {
    const save = async () => {
      await AsyncStorage.setItem('memoData', JSON.stringify(memos));
    };

    if (isLoading) return;
    save();
  }, [memos, isLoading]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      automaticOffset
    >
      {isLoading && (
        <View style={styles.loadingScreen}>
          <ActivityIndicator size="large" />
          <Text style={styles.loadingScreenText}>
            메모 기록을 불러오는 중입니다.
          </Text>
        </View>
      )}
      {!isLoading && (
        <FlatList
          data={memos}
          keyExtractor={({ id }) => id}
          renderItem={({ item }) => (
            <MemoItem item={item} handleDelete={DeleteMemo} />
          )}
          ListEmptyComponent={() => <EmptyItem text="메모가 없어요" />}
          contentContainerStyle={{ flexGrow: 1 }}
        />
      )}

      <View style={styles.inputItem}>
        <TextInput
          value={memoText}
          onChangeText={setMemoText}
          placeholder="메모를 입력해주세요"
          placeholderTextColor="#777"
          style={[styles.input, isInputFocus && { borderColor: 'teal' }]}
          onFocus={() => {
            setIsInputFocus(true);
          }}
          onBlur={() => {
            setIsInputFocus(false);
          }}
          onSubmitEditing={AddMemo}
          returnKeyType="done"
        />
        <Pressable style={styles.addButton} onPress={AddMemo}>
          <Text style={styles.addButtonText}>추가</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingScreenText: {
    marginTop: 8,
    color: '#777',
  },
  inputItem: {
    gap: 4,
    flexDirection: 'row',
    padding: 8,
    paddingBottom: 24,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#777',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderColor: '#777',
    padding: 8,
    flex: 1,
  },
  addButton: { backgroundColor: 'teal', padding: 8, borderRadius: 8 },
  addButtonText: { color: '#fff', textAlign: 'center' },
});
