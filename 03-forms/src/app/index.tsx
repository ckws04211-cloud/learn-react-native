import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import {
  Alert,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Controller, useForm } from 'react-hook-form';
import { SignupForm } from '@/types/signup';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '@/schemas/signup';
import FormBox from '@/components/FormBox';
import { useRef } from 'react';

export default function Index() {
  const { control, handleSubmit } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur',
    defaultValues: { email: '', password: '', confirmPassword: '' },
  });
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  // 회원가입
  const onSignup = (data: SignupForm) => {
    Alert.alert('가입 완료', `이메일: ${data.email}`);
  };
  return (
    <KeyboardAvoidingView style={styles.screen} behavior={'padding'}>
      <Pressable
        style={styles.container}
        onPress={Keyboard.dismiss}
        accessible={false}
      >
        <View style={styles.signUpBox}>
          <View style={styles.header}>
            <Text style={styles.title}>회원가입</Text>
            <Text style={styles.subtitle}>
              계정을 만들고 시작해 보세요.
            </Text>
          </View>
          <Controller
            control={control}
            name="email"
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error },
            }) => (
              <FormBox
                value={value}
                onChangeText={onChange}
                labelText="이메일"
                placeholder="example@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                onBlur={onBlur}
                error={error}
                returnKeyType="next"
                onSubmitEditing={() => passwordRef.current?.focus()}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            rules={{ deps: ['confirmPassword'] }}
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error },
            }) => (
              <FormBox
                ref={passwordRef}
                value={value}
                onChangeText={onChange}
                labelText="비밀번호"
                placeholder="8자 이상, 30자 이하, 영문과 숫자를 모두 포함"
                autoCapitalize="none"
                onBlur={onBlur}
                error={error}
                returnKeyType="next"
                secureTextEntry
                onSubmitEditing={() => confirmPasswordRef.current?.focus()}
              />
            )}
          />
          <Controller
            control={control}
            name="confirmPassword"
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error },
            }) => (
              <FormBox
                ref={confirmPasswordRef}
                value={value}
                onChangeText={onChange}
                labelText="비밀번호 확인"
                placeholder="비밀번호와 같아야 함"
                onBlur={onBlur}
                error={error}
                returnKeyType="send"
                onSubmitEditing={handleSubmit(onSignup)}
                secureTextEntry
              />
            )}
          />
          <Pressable
            style={({ pressed }) => [
              styles.signupButton,
              pressed && { opacity: 0.7 },
            ]}
            onPress={handleSubmit(onSignup)}
          >
            <Text style={styles.signupButtonText}>가입하기</Text>
          </Pressable>
        </View>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#EEF2F8' },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  signUpBox: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    gap: 18,
    boxShadow: '0 8px 24px rgba(15, 35, 80, 0.10)',
  },
  header: { gap: 4, marginBottom: 4 },
  title: { fontSize: 26, fontWeight: '700', color: '#111827' },
  subtitle: { fontSize: 14, color: '#6B7280' },
  signupButton: {
    height: 52,
    marginTop: 6,
    backgroundColor: '#0066CC',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
