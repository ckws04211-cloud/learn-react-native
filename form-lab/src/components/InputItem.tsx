import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { FieldError } from 'react-hook-form';
import { Ref, useState } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type Props = TextInputProps & {
  ref?: Ref<TextInput>;
  labelText?: string;
  error?: FieldError;
};
export default function InputItem({
  ref,
  labelText,
  onFocus,
  onBlur,
  error,
  secureTextEntry,
  ...rest
}: Props) {
  const [focused, setFocused] = useState(false);
  const [isSecureText, setIsSecureText] = useState(secureTextEntry);
  return (
    <View style={styles.inputWrapper}>
      {labelText && <Text>{labelText}</Text>}
      <View style={styles.inputBox}>
        <TextInput
          style={[
            styles.input,
            focused && styles.inputFocus,
            !!error && styles.inputError,
          ]}
          ref={ref}
          placeholderTextColor="#777"
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          secureTextEntry={isSecureText}
          {...rest}
        />
        {secureTextEntry && (
          <Pressable
            onPress={() => setIsSecureText((prev) => !prev)}
            hitSlop={20}
          >
            {isSecureText ? (
              <MaterialCommunityIcons name="eye" size={16} color="black" />
            ) : (
              <MaterialCommunityIcons name="eye-off" size={16} color="black" />
            )}
          </Pressable>
        )}
      </View>
      {error?.message && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    gap: 4,
  },
  inputBox: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#fff',
    gap: 4,
  },
  input: {
    flex: 1,
  },
  inputFocus: {
    borderColor: 'teal',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
  },
});
