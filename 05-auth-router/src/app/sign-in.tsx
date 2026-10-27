import { useSession } from '@/context/session';
import {
  Alert,
  Keyboard,
  Pressable,
  StyleSheet,
  TextInputInstance,
  View,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/schemas/login';
import InputItem from '@/components/InputItem';
import { useRef } from 'react';
import { LoginForm } from '@/types/login';
import ButtonItem from '@/components/ButtonItem';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { LOGIN_DATA } from '@/constants/login-data';

export default function SignInScreen() {
  const { signIn } = useSession();
  const {
    control: loginFormControl,
    handleSubmit: loginFormHandleSubmit,
    reset: loginFormReset,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const passwordRef = useRef<TextInputInstance>(null);

  const handleSignIn = (data: LoginForm) => {
    const findAccount = LOGIN_DATA.find((item) => item.email === data.email);
    if (findAccount && findAccount.password === data.password) {
      signIn(data.email);
      loginFormReset();
      Keyboard.dismiss();
      return;
    }
    Alert.alert('알림', '이메일 또는 비밀번호가 틀렸어요');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Pressable
        style={styles.innerContainer}
        onPress={() => Keyboard.dismiss()}
        accessible={false}
      >
        <Controller
          control={loginFormControl}
          name="email"
          render={({
            field: { value, onBlur, onChange },
            fieldState: { error },
          }) => (
            <InputItem
              labelText="이메일"
              placeholder="이메일을 입력해주세요"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={error}
              returnKeyType="next"
              textContentType="emailAddress"
              onSubmitEditing={() => passwordRef.current?.focus()}
            />
          )}
        />
        <Controller
          control={loginFormControl}
          name="password"
          render={({
            field: { value, onBlur, onChange },
            fieldState: { error },
          }) => (
            <InputItem
              labelText="비밀번호"
              placeholder="비밀번호를 입력해주세요"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={error}
              returnKeyType="done"
              ref={passwordRef}
              onSubmitEditing={() => loginFormHandleSubmit(handleSignIn)()}
              textContentType="password"
              secureTextEntry
            />
          )}
        />
        <ButtonItem
          buttonText="로그인"
          onPress={() => loginFormHandleSubmit(handleSignIn)()}
        />
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flexGrow: 1,
    gap: 16,
    justifyContent: 'center',
    padding: 12,
  },
});
