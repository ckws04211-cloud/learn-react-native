import { fetchPost } from '@/api/posts';
import ErrorItem from '@/components/ErrorItem';
import LoadingItem from '@/components/LoadingItem';
import { useQuery } from '@tanstack/react-query';
import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams();

  const { data, isPending, isError, refetch, error } = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPost(Number(id)),
    staleTime: 0,
    gcTime: 0,
  });
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerTitle: data ? data.title : '' }} />
      {isPending && <LoadingItem />}
      {!isPending && isError && <ErrorItem error={error} refetch={refetch} />}
      {!isPending && !isError && (
        <View style={styles.contentContainer}>
          <View style={styles.titleBox}>
            <Text style={styles.titleText}>{data.title}</Text>
          </View>
          <Text style={styles.bodyText}>{data.body}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    gap: 16,
    padding: 16,
  },
  titleBox: {
    borderBottomWidth: 1,
    paddingBottom: 12,
    borderColor: '#777',
  },
  titleText: { fontSize: 22, fontWeight: 600 },
  bodyText: {
    fontSize: 18,
  },
});
