import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  error: Error;
  refetch: () => void;
};

export default function ErrorItem({ error, refetch }: Props) {
  return (
    <View style={styles.errorContainer}>
      <View style={styles.errorTextBox}>
        <Text style={styles.errorText}>에러가 발생했습니다.</Text>
        <Text style={styles.errorSubText}>{error.message}</Text>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.refetchButton,
          pressed && { opacity: 0.7 },
        ]}
        onPress={() => refetch()}
      >
        <Text style={styles.refetchButtonText}>다시 시도</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  errorTextBox: {
    gap: 4,
    alignItems: 'center',
  },
  errorText: {
    fontSize: 24,
  },
  errorSubText: {
    fontSize: 14,
    color: '#777',
  },
  refetchButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'teal',
  },
  refetchButtonText: {
    color: '#fff',
  },
});
