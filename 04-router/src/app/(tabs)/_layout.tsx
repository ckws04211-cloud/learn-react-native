import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'teal',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '책 목록',
          tabBarIcon: ({ color }) => {
            return <FontAwesome name="book" size={24} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: '즐겨찾기',
          tabBarIcon: ({ color }) => {
            return <FontAwesome name="bookmark" size={24} color={color} />;
          },
        }}
      />
    </Tabs>
  );
}
