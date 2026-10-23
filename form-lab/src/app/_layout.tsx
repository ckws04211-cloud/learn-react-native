import { Stack } from 'expo-router';
import { KeyboardProvider } from 'react-native-keyboard-controller';

export default function RootLayout() {
  return (
    <KeyboardProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: '연습 목록' }} />
        <Stack.Screen name="login" options={{ title: '로그인' }} />
        <Stack.Screen name="profile" options={{ title: '프로필' }} />
        <Stack.Screen name="password" options={{ title: '비밀번호 변경' }} />
      </Stack>
    </KeyboardProvider>
  );
}
