import { useSession } from '@/context/session';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const { session, userName } = useSession();
  return (
    <View style={styles.container}>
      <View style={styles.contentBox}>
        <Text style={styles.userNameText}>안녕하세요! {userName}님</Text>
        <Text style={styles.emailText}>{session}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  contentBox: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  userNameText: { fontSize: 24, fontWeight: '600' },
  emailText: { fontSize: 16, color: '#777' },
});
