import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';

const queryClient = new QueryClient();

export default function StackLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerBackButtonDisplayMode: 'minimal',
        }}
      >
        <Stack.Screen name="index" options={{ headerTitle: '게시글 목록' }} />
        <Stack.Screen
          name="post/[id]"
          options={{ headerTitle: '게시글 상세' }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
