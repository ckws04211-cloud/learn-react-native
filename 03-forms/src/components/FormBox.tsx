import Ionicons from '@expo/vector-icons/Ionicons';
import { FieldError } from 'react-hook-form';
import { Ref, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  TextInputInstance,
} from 'react-native';

type Props = TextInputProps & {
  labelText: string;
  error?: FieldError;
  ref?: Ref<TextInputInstance>;
};

export default function FormBox({
  ref,
  labelText,
  error,
  style,
  secureTextEntry,
  onFocus,
  onBlur,
  ...rest
}: Props) {
  const [hidden, setHidden] = useState(true);
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.formBox}>
      <Text style={styles.labelText}>{labelText}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          ref={ref}
          style={[
            styles.inputForm,
            focused && styles.inputFocused,
            !!error && styles.inputError,
            style,
          ]}
          placeholderTextColor="#A0A7B4"
          secureTextEntry={secureTextEntry && hidden}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          {...rest}
        />
        {secureTextEntry && (
          <Pressable
            style={styles.eyeButton}
            onPress={() => setHidden((prev) => !prev)}
            hitSlop={8}
            accessibilityLabel={hidden ? '비밀번호 보기' : '비밀번호 숨기기'}
          >
            <Ionicons
              name={hidden ? 'eye-outline' : 'eye-off-outline'}
              size={20}
              color="#6B7280"
            />
          </Pressable>
        )}
      </View>

      {error?.message && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  formBox: { gap: 6 },
  labelText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  inputWrapper: {
    justifyContent: 'center',
  },
  eyeButton: {
    position: 'absolute',
    right: 14,
    padding: 4,
  },
  inputForm: {
    height: 50,
    borderWidth: 1.5,
    borderColor: '#E3E7EE',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingRight: 46,
    backgroundColor: '#F8FAFC',
    fontSize: 16,
    color: '#111827',
  },
  inputFocused: {
    borderColor: '#0066CC',
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#FF3B30',
    backgroundColor: '#FFF6F5',
  },
  errorText: {
    fontSize: 13,
    color: '#E5362B',
  },
});
