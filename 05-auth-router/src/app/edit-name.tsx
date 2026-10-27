import { Controller, useForm } from 'react-hook-form';
import { Keyboard, Pressable, StyleSheet } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { nameSchema } from '@/schemas/name';
import InputItem from '@/components/InputItem';
import { useSession } from '@/context/session';
import ButtonItem from '@/components/ButtonItem';
import { NameForm } from '@/types/name';
import { router } from 'expo-router';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

export default function EditNameModal() {
  const { userName, setUserName } = useSession();
  const {
    control: editNameFormControl,
    handleSubmit: editNameFormHandleSubmit,
    reset: editNameFormReset,
  } = useForm<NameForm>({
    resolver: zodResolver(nameSchema),
    defaultValues: {
      name: userName,
    },
  });

  const handleChangeUserName = (data: NameForm) => {
    setUserName(data.name);
    editNameFormReset();
    Keyboard.dismiss();
    router.back();
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Pressable
        style={styles.innerContainer}
        accessible={false}
        onPress={() => Keyboard.dismiss()}
      >
        <Controller
          control={editNameFormControl}
          name="name"
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <InputItem
              labelText="변경할 이름"
              placeholder="변경할 이름을 입력해주세요"
              error={error}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              returnKeyType="done"
              onSubmitEditing={() =>
                editNameFormHandleSubmit(handleChangeUserName)()
              }
            />
          )}
        />
        <ButtonItem
          buttonText="변경"
          onPress={() => editNameFormHandleSubmit(handleChangeUserName)()}
        />
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  innerContainer: { flex: 1, justifyContent: 'center', padding: 12, gap: 12 },
});
