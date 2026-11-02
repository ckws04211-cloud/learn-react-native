import { Pressable, PressableProps, StyleSheet, Text } from 'react-native';

type Props = PressableProps & {
  buttonText: string;
};

export default function ButtonItem({ buttonText, ...rest }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && { opacity: 0.7 }]}
    >
      <Text style={styles.buttonText}>{buttonText}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'teal',
    padding: 12,
    borderRadius: 8,
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
