import ButtonItem from '@/components/ButtonItem';
import { useSession } from '@/context/session';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function SettingsScreen() {
  const { signOut } = useSession();
  return (
    <View style={styles.container}>
      <ButtonItem
        buttonText="이름 변경"
        onPress={() => router.push('/edit-name')}
      />
      <ButtonItem buttonText="로그아웃" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, gap: 16, justifyContent: 'center', padding: 16 },
});
