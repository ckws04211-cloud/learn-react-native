import BookList from '@/components/BookList';
import { BOOK_DATA } from '@/constants/bookData';
import { useFavorites } from '@/context/favorites';
import { StyleSheet, View } from 'react-native';

export default function FavoritesScreen() {
  const { favoriteIds } = useFavorites();
  const currentData = BOOK_DATA.filter((item) => favoriteIds.includes(item.id));
  return (
    <View style={styles.container}>
      <BookList
        bookData={currentData}
        isShowFavoriteButton={true}
        noDataText="즐겨찾기한 책이 없어요"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
