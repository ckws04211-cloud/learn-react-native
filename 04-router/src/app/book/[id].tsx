import { BOOK_DATA } from '@/constants/bookData';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFavorites } from '@/context/favorites';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function BookDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const currentBookItem = BOOK_DATA.find((item) => item.id === id);
  const { favoriteIds, toggleFavorite } = useFavorites();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: currentBookItem ? currentBookItem.title : '찾을 수 없어요',
          headerStyle: { backgroundColor: '#fff' },
        }}
      />
      {currentBookItem ? (
        <View style={styles.dataBox}>
          <Text style={styles.titleText}>{currentBookItem.title}</Text>
          <Text style={styles.authorText}>{currentBookItem.author}</Text>
          <Text style={styles.yearText}>{currentBookItem.year}</Text>
          <View style={styles.buttonBox}>
            <Pressable
              style={({ pressed }) => [
                styles.backPressButton,
                pressed && { opacity: 0.7 },
              ]}
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={20} color={'#fff'} />
              <Text style={styles.backPressButtonText}>뒤로가기</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.favoriteToggleButton,
                pressed && { opacity: 0.7 },
              ]}
              onPress={() => toggleFavorite(id)}
            >
              <Text style={styles.favoriteToggleButtonText}>즐겨찾기</Text>
              <FontAwesome
                name={favoriteIds.includes(id) ? 'bookmark' : 'bookmark-o'}
                size={20}
                color={'#fff'}
              />
            </Pressable>
          </View>
        </View>
      ) : (
        <View style={styles.noData}>
          <Text style={styles.noDataText}>책을 찾을 수 없어요</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  dataBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#fff',
  },
  titleText: {
    fontSize: 30,
    fontWeight: '600',
  },
  authorText: {
    fontSize: 16,
  },
  yearText: {
    fontSize: 16,
  },
  noData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: { fontSize: 30, color: '#aaa' },
  buttonBox: {
    flexDirection: 'row',
    gap: 16,
  },
  backPressButton: {
    flexDirection: 'row',
    backgroundColor: '#777',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
    alignItems: 'center',
  },
  backPressButtonText: { color: '#fff' },
  favoriteToggleButton: {
    flexDirection: 'row',
    backgroundColor: 'teal',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
    alignItems: 'center',
  },
  favoriteToggleButtonText: { color: '#fff' },
});
