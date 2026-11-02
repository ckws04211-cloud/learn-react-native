import { StyleSheet, Text, View } from 'react-native';

type Props = {
  text: string;
};

export default function EmptyItem({ text }: Props) {
  return (
    <View style={styles.emptyItem}>
      <Text style={styles.emptyItemText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyItem: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyItemText: { fontSize: 20, color: '#777' },
});
