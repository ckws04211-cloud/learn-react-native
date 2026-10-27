import { SessionProvider, useSession } from '@/context/session';
import { Stack } from 'expo-router';
import { KeyboardProvider } from 'react-native-keyboard-controller';

function RootNavigator() {
  const { session } = useSession();
  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: '#fff' } }}>
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen
          name="edit-name"
          options={{ presentation: 'modal', title: '이름 변경' }}
        />
      </Stack.Protected>
      <Stack.Protected guard={!session}>
        <Stack.Screen name="sign-in" options={{ title: '로그인' }} />
      </Stack.Protected>
    </Stack>
  );
}

export default function StackLayout() {
  return (
    <SessionProvider>
      <KeyboardProvider>
        <RootNavigator />
      </KeyboardProvider>
    </SessionProvider>
  );
}
