import ButtonItem from '@/components/ButtonItem';
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';

export default function SecureScreen() {
  const [tokenValue, setTokenValue] = useState<string | null>(null);
  const [isLoad, setIsLoad] = useState(true);

  const handleSave = async () => {
    const FAKE_TOKEN = 'fake-token-abc123';
    try {
      await SecureStore.setItemAsync('token', FAKE_TOKEN);
      setTokenValue(FAKE_TOKEN);
    } catch {
      Alert.alert('알림', '저장에 실패했습니다.');
    }
  };

  const handleGet = async () => {
    try {
      const token = await SecureStore.getItemAsync('token');
      setTokenValue(token);
    } catch {
      Alert.alert('알림', '읽기에 실패했습니다.');
    }
  };

  const handleDelete = async () => {
    try {
      await SecureStore.deleteItemAsync('token');
      setTokenValue(null);
    } catch {
      Alert.alert('알림', '삭제에 실패했습니다.');
    }
  };

  useEffect(() => {
    const load = async () => {
      await handleGet();
      setIsLoad(false);
    };
    load();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.secureTextContainer}>
        {isLoad && <ActivityIndicator size="large" />}
        {!isLoad && (
          <Text style={[styles.secureText, !tokenValue && { color: '#777' }]}>
            {tokenValue ? tokenValue : '(없음)'}
          </Text>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <ButtonItem buttonText="저장" onPress={handleSave} />
        <ButtonItem buttonText="읽기" onPress={handleGet} />
        <ButtonItem buttonText="삭제" onPress={handleDelete} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    flex: 1,
    gap: 12,
  },
  secureTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secureText: {
    fontSize: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingBottom: 12,
  },
});
