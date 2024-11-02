import {View, Text, SafeAreaView, Pressable} from 'react-native';
import React from 'react';
import {router} from 'expo-router';
import {Flashy} from 'iconsax-react-native';
import {SCREENPADDING} from '@/constants/sizes';
import Button from '@/components/Button';

export default function Onboarding() {
  return (
    <SafeAreaView className="flex-1 justify-between dark:bg-black">
      <View className="items-center">
        <Flashy size="32" />
      </View>
      <View className="gap-5" style={{marginHorizontal: SCREENPADDING}}>
        <Text className="dark:text-white text-3xl font-bold">
          Let's grab your order really quick...
        </Text>
        <Button
          title="Create account"
          onPress={() => router.navigate('/auth/signup')}
        />
      </View>
      <View
        className="flex-row items-center space-x-3"
        style={{marginHorizontal: SCREENPADDING}}>
        <Text className="dark:text-gray-500">Have an account already? </Text>
        <Pressable
          className=""
          onPress={() => router.navigate('/auth/login/verify')}>
          <Text className="text-blue-600">Login</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
