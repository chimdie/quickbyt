import React from 'react';
import {Header} from '@rneui/themed';
import {router, Stack} from 'expo-router';
import BackButton from '@/components/BackButton';
import {Flashy} from 'iconsax-react-native';

export default function AuthLayout() {
  return (
    <>
      <Header
        backgroundColor="transparent"
        containerStyle={{
          borderColor: 'transparent',
          marginTop: -10,
        }}
        leftComponent={<BackButton onPress={() => router.back()} />}
        centerComponent={<Flashy size="32" />}
      />
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="signup" />
        <Stack.Screen name="login" />
      </Stack>
    </>
  );
}
