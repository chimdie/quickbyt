import {
  View,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import {router, useLocalSearchParams} from 'expo-router';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Feather} from '@expo/vector-icons';

import {SCREENPADDING} from '@/constants/sizes';
import {LoginSchema} from '@/schema/auth';
import {ControlledTextInput} from '@/components/TextInput';
import Button from '@/components/Button';
import {getColor} from '@/config/theme';

export default function Login() {
  const {username} = useLocalSearchParams();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginSchema>({
    reValidateMode: 'onChange',
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: username as string,
    },
  });

  const onSubmit = (data: LoginSchema) => {
    console.log(data);
    // router.navigate(`/(tabs)`);
  };

  return (
    <SafeAreaView className="flex-1 justify-between dark:bg-black">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className="flex-1 justify-between">
          <View className="gap-4" style={{paddingHorizontal: SCREENPADDING}}>
            <ControlledTextInput
              name="username"
              control={control}
              placeholder="@username"
              hasError={!!errors.username}
              erroMessage={errors.username?.message}
              defaultValue={username as string}
            />
            <ControlledTextInput
              name="password"
              control={control}
              placeholder="Password"
              hasError={!!errors.password}
              erroMessage={errors.password?.message}
              secureTextEntry={!showPassword}
              endContent={
                <Feather
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={18}
                  color={getColor('gray')}
                  onPress={() => setShowPassword(!showPassword)}
                />
              }
            />
          </View>
          <View
            className="flex-row justify-end p-6"
            style={{paddingHorizontal: SCREENPADDING}}>
            <Button
              title="Next"
              size="sm"
              // disabled
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
