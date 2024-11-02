import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import {router} from 'expo-router';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {SignupSchema} from '@/schema/auth';
import {ControlledTextInput} from '@/components/TextInput';
import {SCREENPADDING} from '@/constants/sizes';
import {Feather} from '@expo/vector-icons';
import {getColor} from '@/config/theme';

export default function CreateAccount() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPassword2, setShowPassword2] = useState<boolean>(false);
  const [checkUsername, setUsername] = useState(null);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<SignupSchema>({
    reValidateMode: 'onChange',
    resolver: zodResolver(SignupSchema),
  });

  return (
    <SafeAreaView className="flex-1 dark:bg-black">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className="flex-1 justify-between">
          <View style={{paddingHorizontal: SCREENPADDING}}>
            <Text className="text-black dark:text-white">
              To get started, enter your username
            </Text>
          </View>
          <View className="gap-4" style={{paddingHorizontal: SCREENPADDING}}>
            <ControlledTextInput
              name="username"
              control={control}
              placeholder="@username"
              hasError={!!errors.username}
              erroMessage={errors.username?.message}
              endContent={
                <Feather name="check-circle" size={18} color="black" />
              }
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
            <ControlledTextInput
              name="confirmPassword"
              control={control}
              placeholder="Confirm Password"
              hasError={!!errors.confirmPassword}
              erroMessage={errors.confirmPassword?.message}
              secureTextEntry={!showPassword2}
              endContent={
                <Feather
                  name={showPassword2 ? 'eye' : 'eye-off'}
                  size={18}
                  color={getColor('gray')}
                  onPress={() => setShowPassword2(!showPassword2)}
                />
              }
            />
          </View>
          <View
            className="flex-row items-center justify-end p-6 border-t- border-gray-200"
            style={{paddingHorizontal: SCREENPADDING}}>
            <Pressable className="" onPress={() => router.navigate('(tabs)')}>
              <Text className="text-blue-600">Next</Text>
            </Pressable>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
