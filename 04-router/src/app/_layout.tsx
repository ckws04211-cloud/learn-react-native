import { Stack } from 'expo-router';
import { FavoritesProvider } from '@/context/favorites';

export default function RootLayout() {
  return (
    <FavoritesProvider>
      <Stack screenOptions={{ headerBackButtonDisplayMode: 'minimal' }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="book/[id]" />
      </Stack>
    </FavoritesProvider>
  );
}
