import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

const BASE_FOLLOWERS = 10;
const PROFILE_DATA = {
  name: '홍길동',
  job: '도둑',
  comment: '내가 홍길동이여',
};

export default function Index() {
  const [isFollow, setIsFollow] = useState(false);
  const followCount = BASE_FOLLOWERS + (isFollow ? 1 : 0);

  const pressFollowButton = () => {
    setIsFollow((prev) => !prev);
  };
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/200' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{PROFILE_DATA.name}</Text>
        <Text style={styles.job}>{PROFILE_DATA.job}</Text>
        <Text style={styles.comment}>{PROFILE_DATA.comment}</Text>
        <View style={styles.stats}>
          <Text>팔로워{followCount}</Text>
          <Text>팔로잉0</Text>
          <Text>게시물0</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.followButton,
            pressed && { opacity: 0.7 },
          ]}
          onPress={pressFollowButton}
        >
          <Text style={styles.followButtonText}>
            {isFollow ? '팔로잉' : '팔로우'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  card: {
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50, // width/height의 절반이면 원형
  },
  name: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
  },
  job: {
    textAlign: 'center',
    fontSize: 12,
  },
  comment: {
    textAlign: 'center',
    fontSize: 14,
  },
  stats: {
    flexDirection: 'row',
    gap: 4,
  },
  followButton: {
    marginTop: 4,
    backgroundColor: '#0071E3',
    borderRadius: 4,
    padding: 4,
    width: '100%',
  },
  followButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
