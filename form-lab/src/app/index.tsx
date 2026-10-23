import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function IndexScreen() {
  return (
    <View style={styles.menuList}>
      <Link href="/login" style={styles.menuItem}>
        로그인
      </Link>
      <Link href="/profile" style={styles.menuItem}>
        프로필
      </Link>
      <Link href="/password" style={styles.menuItem}>
        비밀번호 변경
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  menuList: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  menuItem: {
    fontSize: 20,
    fontWeight: '600',
  },
});
