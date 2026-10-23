import Button from '@/components/Button';
import InputItem from '@/components/InputItem';
import { passwordSchema } from '@/schemas/password';
import { PasswordForm } from '@/types/password';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  Keyboard,
  Pressable,
  StyleSheet,
  TextInput,
} from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

export default function PasswordScreen() {
  const newPasswordRef = useRef<TextInput>(null);
  const confirmNewPasswordRef = useRef<TextInput>(null);

  const {
    control: passwordFormControl,
    handleSubmit: passwordFormHandleSubmit,
    reset: passwordFormReset,
  } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
    mode: 'onBlur',
    defaultValues: {
      originPassword: '',
      newPassword: '',
      newConfirmPassword: '',
    },
  });

  const handleDone = (data: PasswordForm) => {
    const result = data; // API로 보낼 결과

    Alert.alert('알림', '비밀번호 변경이 완료되었습니다.');
    Keyboard.dismiss();
    passwordFormReset();
  };

  return (
    <Pressable
      style={styles.container}
      onPress={() => Keyboard.dismiss()}
      accessible={false}
    >
      <KeyboardAvoidingView
        style={styles.innerContainer}
        behavior="padding"
        automaticOffset={true}
      >
        <Controller
          control={passwordFormControl}
          name="originPassword"
          rules={{ deps: ['newPassword'] }}
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => {
            return (
              <InputItem
                labelText="기존 비밀번호"
                placeholder="기존 비밀번호를 입력해주세요"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={error}
                returnKeyType="next"
                onSubmitEditing={() => newPasswordRef.current?.focus()}
                secureTextEntry
              />
            );
          }}
        />
        <Controller
          control={passwordFormControl}
          name="newPassword"
          rules={{ deps: ['newConfirmPassword'] }}
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => {
            return (
              <InputItem
                labelText="새 비밀번호"
                placeholder="새 비밀번호를 입력해주세요"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={error}
                ref={newPasswordRef}
                returnKeyType="next"
                onSubmitEditing={() => confirmNewPasswordRef.current?.focus()}
                secureTextEntry
              />
            );
          }}
        />
        <Controller
          control={passwordFormControl}
          name="newConfirmPassword"
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => {
            return (
              <InputItem
                labelText="새 비밀번호 확인"
                placeholder="새 비밀번호를 다시 입력해주세요"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={error}
                ref={confirmNewPasswordRef}
                returnKeyType="done"
                onSubmitEditing={passwordFormHandleSubmit(handleDone)}
                secureTextEntry
              />
            );
          }}
        />
        <Button
          buttonText="비밀번호 변경"
          onPress={passwordFormHandleSubmit(handleDone)}
        />
      </KeyboardAvoidingView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 8,
    flexGrow: 1,
    justifyContent: 'center',
  },
});
