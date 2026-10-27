import Feather from '@expo/vector-icons/Feather';
import { Ref, useState } from 'react';
import { FieldError } from 'react-hook-form';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  TextInputInstance,
  Pressable,
} from 'react-native';

type Props = TextInputProps & {
  ref?: Ref<TextInputInstance>;
  labelText: string;
  error: FieldError | undefined;
  secureTextEntry?: boolean;
};

export default function InputItem({
  ref,
  labelText,
  error,
  secureTextEntry,
  onBlur,
  onFocus,
  ...rest
}: Props) {
  const [isFocus, setIsFocus] = useState(false);
  const [isSecureText, setIsSecureText] = useState(secureTextEntry);
  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.labelText}>{labelText}</Text>
      <View style={styles.inputItem}>
        <TextInput
          style={[{ flex: 1 }, isFocus && { borderColor: 'teal' }]}
          placeholderTextColor="#777"
          ref={ref}
          {...rest}
          onFocus={(e) => {
            setIsFocus(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocus(false);
            onBlur?.(e);
          }}
          secureTextEntry={isSecureText}
        />
        {secureTextEntry && (
          <Pressable
            onPress={() => setIsSecureText((prev) => !prev)}
            hitSlop={20}
            style={({ pressed }) => [pressed && { opacity: 0.7 }]}
          >
            <Feather
              name={isSecureText ? 'eye' : 'eye-off'}
              size={20}
              color="black"
            />
          </Pressable>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    gap: 4,
  },
  labelText: {
    fontWeight: 500,
  },
  inputItem: {
    backgroundColor: '#fff',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    gap: 8,
  },
  errorText: {
    color: 'red',
  },
});
