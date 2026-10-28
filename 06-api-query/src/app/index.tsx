import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchPosts } from '@/api/posts';
import { useEffect, useState } from 'react';
import { API_PAGE_SIZE } from '@/constants/api';
import PostItem from '@/components/PostItem';
import ErrorItem from '@/components/ErrorItem';
import LoadingItem from '@/components/LoadingItem';

export default function HomeScreen() {
  const [listHeight, setListHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    refetch,
    isPending,
    error,
    isFetchNextPageError,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam }) => fetchPosts(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) =>
      lastPage.length < API_PAGE_SIZE ? undefined : lastPageParam + 1,
    staleTime: 60_000,
  });
  const postsData = data?.pages.flat() ?? [];

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  useEffect(() => {
    if (
      listHeight > 0 &&
      contentHeight < listHeight &&
      hasNextPage &&
      !isFetchingNextPage &&
      !isFetchNextPageError
    ) {
      fetchNextPage();
    }
  }, [
    listHeight,
    contentHeight,
    hasNextPage,
    isFetchingNextPage,
    isFetchNextPageError,
    fetchNextPage,
  ]);

  return (
    <View style={styles.container}>
      {isPending && <LoadingItem />}
      {isError && postsData.length === 0 && (
        <ErrorItem error={error} refetch={refetch} />
      )}
      {postsData.length > 0 && (
        <FlatList
          data={postsData}
          keyExtractor={(item) => String(item.id)}
          onEndReached={() => {
            if (hasNextPage && !isFetchingNextPage && !isFetchNextPageError)
              fetchNextPage();
          }}
          onEndReachedThreshold={0.5}
          renderItem={({ item }) => <PostItem item={item} />}
          onLayout={(e) => setListHeight(e.nativeEvent.layout.height)}
          onContentSizeChange={(_, h) => setContentHeight(h)}
          refreshing={isRefreshing}
          onRefresh={() => handleRefresh()}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator />
            ) : isFetchNextPageError ? (
              <Pressable onPress={() => fetchNextPage()}>
                <Text>불러오지 못했어요. 다시 시도</Text>
              </Pressable>
            ) : undefined
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
