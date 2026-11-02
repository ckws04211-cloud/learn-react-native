import { Link, Stack } from 'expo-router';
import { KeyboardProvider } from 'react-native-keyboard-controller';

export default function TabLayout() {
  return (
    <KeyboardProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerBackButtonDisplayMode: 'minimal',
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerTitle: '메모 목록',
            headerRight: () => <Link href={'/secure'}>SecureStore 실험</Link>,
          }}
        />
        <Stack.Screen
          name="secure"
          options={{
            headerTitle: 'SecureStore 실험',
          }}
        />
      </Stack>
    </KeyboardProvider>
  );
}
