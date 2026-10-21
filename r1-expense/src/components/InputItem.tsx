import { Ref } from 'react';
import { FieldError } from 'react-hook-form';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

type Props = TextInputProps & {
  ref?: Ref<TextInput>;
  labelText?: string;
  error?: FieldError;
  helperText?: string;
};
export default function InputItem({
  ref,
  labelText,
  error,
  helperText,
  ...rest
}: Props) {
  return (
    <View style={styles.inputItemWrapper}>
      <Text style={styles.label}>{labelText}</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="#A0A7B4"
        ref={ref}
        {...rest}
      />
      {helperText && <Text style={styles.helperText}>{helperText}</Text>}
      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  inputItemWrapper: {
    gap: 2,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
  },
  input: {
    padding: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
  },
  errorText: {
    fontSize: 12,
    color: '#FF3B30',
  },
  helperText: {
    fontSize: 12,
    color: '#333',
  },
});
