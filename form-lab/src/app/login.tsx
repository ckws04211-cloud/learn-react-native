import InputItem from '@/components/InputItem';
import { LoginForm } from '@/types/login';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/schemas/login';
import { useRef } from 'react';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import Button from '@/components/Button';

export default function LoginScreen() {
  const {
    control: loginControl,
    handleSubmit,
    reset,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const passwordRef = useRef<TextInput>(null);

  const onSubmit = (data: LoginForm) => {
    Alert.alert('알림', `${data.email}계정 로그인 성공`);
    Keyboard.dismiss();
    reset();
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
        automaticOffset
      >
        <Controller
          control={loginControl}
          name="email"
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => {
            return (
              <InputItem
                labelText="이메일"
                placeholder="이메일을 입력하세요"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={error}
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
              />
            );
          }}
        />
        <Controller
          control={loginControl}
          name="password"
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => {
            return (
              <InputItem
                labelText="비밀번호"
                placeholder="비밀번호를 입력하세요"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={error}
                ref={passwordRef}
                onSubmitEditing={handleSubmit(onSubmit)}
                secureTextEntry
                returnKeyType="done"
              />
            );
          }}
        />

        {/*   <Pressable style={styles.loginButton} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.loginButtonText}>로그인</Text>
        </Pressable> */}
        <Button buttonText="로그인" onPress={handleSubmit(onSubmit)} />
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
