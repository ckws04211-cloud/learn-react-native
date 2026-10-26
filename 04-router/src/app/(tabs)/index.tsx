import { BOOK_DATA } from '@/constants/bookData';
import { StyleSheet, View } from 'react-native';
import BookList from '@/components/BookList';

export default function BookListScreen() {
  return (
    <View style={styles.container}>
      <BookList bookData={BOOK_DATA} isShowFavoriteButton={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
