import { Ref } from 'react';
import {
  Pressable,
  PressableInstance,
  PressableProps,
  StyleSheet,
  Text,
} from 'react-native';

type Props = PressableProps & {
  buttonText: string;
  ref?: Ref<PressableInstance>;
};

export default function ButtonItem({ buttonText, ...rest }: Props) {
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
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', textAlign: 'center' },
});
