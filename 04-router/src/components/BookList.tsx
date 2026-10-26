import { router } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFavorites } from '@/context/favorites';
import { Book } from '@/types/book';

type Props = {
  bookData: Book[];
  isShowFavoriteButton: boolean;
  noDataText?: string;
};

export default function BookList({
  bookData,
  isShowFavoriteButton,
  noDataText = '책 목록이 없어요',
}: Props) {
  const { favoriteIds, toggleFavorite } = useFavorites();
  return (
    <View style={styles.container}>
      {bookData.length > 0 ? (
        <FlatList
          data={bookData}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.bookItem}>
                <Text style={styles.indexText}>{index + 1}</Text>
                <Pressable
                  style={({ pressed }) => [
                    styles.contentBox,
                    pressed && {
                      opacity: 0.7,
                    },
                  ]}
                  onPress={() => router.push(`/book/${item.id}`)}
                >
                  <Text style={styles.mainText}>{item.title}</Text>
                  <Text style={styles.subText}>
                    {item.author} | {item.year}
                  </Text>
                </Pressable>
                {isShowFavoriteButton && (
                  <Pressable
                    style={({ pressed }) => [
                      styles.favoriteButton,
                      pressed && { opacity: 0.7 },
                    ]}
                    onPress={() => {
                      toggleFavorite(item.id);
                    }}
                    hitSlop={20}
                  >
                    <FontAwesome
                      name={
                        favoriteIds.includes(item.id)
                          ? 'bookmark'
                          : 'bookmark-o'
                      }
                      size={20}
                    />
                  </Pressable>
                )}
              </View>
            );
          }}
        />
      ) : (
        <View style={styles.noData}>
          <Text style={styles.noDataText}>{noDataText}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bookItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 18,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  indexText: {
    fontSize: 16,
    fontWeight: '600',
  },
  contentBox: {
    flex: 1,
  },
  mainText: {
    fontSize: 18,
    fontWeight: '600',
  },
  subText: {
    fontSize: 14,
    fontWeight: '300',
  },
  favoriteButton: {},
  noData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: { fontSize: 30, color: '#aaa' },
});
