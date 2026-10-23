import { Pressable, PressableProps, StyleSheet, Text } from 'react-native';

type Props = PressableProps & {
  buttonText: string;
};

export default function Button({ buttonText, ...rest }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && { opacity: 0.7 }]}
      {...rest}
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
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
