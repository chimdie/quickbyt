import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
// import {router} from 'expo-router';
import {useMutation} from '@tanstack/react-query';

import {SCREENPADDING} from '@/constants/sizes';
import {ControlledTextInput} from '@/components/TextInput';
import {UsernameSchema} from '@/schema/auth';
import Button from '@/components/Button';
import {verifyUsername} from '@/api/auth';

export default function Verify() {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<UsernameSchema>({
    reValidateMode: 'onChange',
    resolver: zodResolver(UsernameSchema),
  });

  const mutation = useMutation({
    mutationFn: (formData: string) => {
      return verifyUsername(formData);
    },

    onSuccess(data) {
      if (data) {
        console.log({data});
      }
    },
    onError: err => {
      console.warn(err);
    },
  });

  const onSubmit = (data: UsernameSchema) => {
    // router.navigate(`/auth/login?username=${data.username}`);
    mutation.mutate(data.username);
    // router.navigate('/(tabs)');
  };

  return (
    <SafeAreaView className="flex-1 dark:bg-black">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className="flex-1 justify-between">
          <View style={{paddingHorizontal: SCREENPADDING}}>
            <Text className="text-black dark:text-white">
              To get started, enter your username
            </Text>
            <ControlledTextInput
              name="username"
              control={control}
              placeholder="@username"
              hasError={!!errors.username}
              erroMessage={errors.username?.message}
            />
          </View>
          <View
            className="flex-row items-center justify-between p-6"
            style={{paddingHorizontal: SCREENPADDING}}>
            <Text className="dark:text-gray-500">
              Don't have an account already?{' '}
            </Text>

            <Button
              title="Next"
              size="md"
              // disabled
              onPress={handleSubmit(onSubmit)}
              // onPress={() => router.navigate('/(tabs)')}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
