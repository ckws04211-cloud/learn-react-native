import Button from '@/components/Button';
import InputItem from '@/components/InputItem';
import { profileSchema } from '@/schemas/profile';
import { ProfileForm } from '@/types/profile';
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

export default function ProfileScreen() {
  const ageInputRef = useRef<TextInput>(null);

  const {
    control: profileFormControl,
    handleSubmit: profileFormSubmit,
    reset: profileFormReset,
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      age: '',
      introduce: '',
    },
  });

  // 등록 핸들러
  const handleRegister = (data: ProfileForm) => {
    const result = { ...data, age: Number(data.age) };
    Alert.alert('성공', `${result.name}(${result.age})님 프로필 등록 성공`);
    Keyboard.dismiss();
    profileFormReset();
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
          control={profileFormControl}
          name="name"
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => {
            return (
              <InputItem
                labelText="이름"
                placeholder="이름을 입력해주세요"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={error}
                returnKeyType="next"
                onSubmitEditing={() => ageInputRef.current?.focus()}
              />
            );
          }}
        />
        <Controller
          control={profileFormControl}
          name="age"
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => {
            return (
              <InputItem
                labelText="나이"
                placeholder="나이를 입력해주세요"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={error}
                keyboardType="number-pad"
                ref={ageInputRef}
              />
            );
          }}
        />
        <Controller
          control={profileFormControl}
          name="introduce"
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => {
            return (
              <InputItem
                labelText="소개"
                placeholder="소개를 입력해주세요"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={error}
                returnKeyType="done"
                onSubmitEditing={profileFormSubmit(handleRegister)}
              />
            );
          }}
        />
        <Button buttonText="등록" onPress={profileFormSubmit(handleRegister)} />
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
