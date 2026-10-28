import { Post } from '@/types/post';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';

type Props = {
  item: Post;
};
export default function PostItem({ item }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [styles.postItem, pressed && { opacity: 0.7 }]}
      onPress={() =>
        router.push({ pathname: '/post/[id]', params: { id: item.id } })
      }
    >
      <View style={styles.id}>
        <Text style={styles.idText}>{item.id}</Text>
      </View>
      <Text style={styles.titleText} numberOfLines={1}>
        {item.title}
      </Text>
      <AntDesign name="arrow-right" size={20} color="#777" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  postItem: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  id: {
    minWidth: 32,
  },
  idText: {
    fontSize: 16,
  },
  titleText: {
    fontSize: 16,
    flex: 1,
  },
});
