import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {Link, router} from 'expo-router';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Eye, EyeOff, Lock, User} from 'lucide-react-native';
import {useMutation} from '@tanstack/react-query';
import {SafeAreaView} from '@/components/ui/SafeAreaView';
import {Colors} from '@/constants/Colors';
import {TextInputWithControl} from '@/components/TextInput';
import {LoginSchema} from '@/schema/auth.schema';
import {ApiSDK} from '@/sdk';
import {LoginDto} from '@/sdk/generated';
import {useAuthStore} from '@/store/useAuthStore';
import {apiErrorParser} from '@/utils/errorParser';
import {Button} from '@/components/Button';

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const {setUser} = useAuthStore.getState();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(LoginSchema),
    reValidateMode: 'onChange',
    mode: 'onChange',
  });

  const mutation = useMutation({
    mutationFn: (payload: LoginDto) =>
      ApiSDK.AuthenticationService.postV1AuthLogin(payload),
    onSuccess(data) {
      if (data.payload) {
        const {token, user} = data.payload;

        if (user.role !== 'USER') {
          return Alert.alert('Unauthorized Access');
        }

        ApiSDK.OpenAPI.TOKEN = token;
        setUser({token, user});
        router.navigate('/(tabs)');
      }
    },
    onError(error) {
      const parsedError = apiErrorParser(error);
      setApiError(parsedError.message);
    },
  });

  const onSubmit = (data: LoginSchema) => {
    mutation.mutate(data);
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.background,
      }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Text style={styles.title}>Enter your login credentials</Text>
          <View style={styles.fieldContainer}>
            <TextInputWithControl
              name="username"
              control={form.control}
              placeholder="Username"
              textContentType="username"
              hasError={!!form.formState.errors.username}
              prefixIcon={<User color={Colors.grey[300]} />}
            />

            <TextInputWithControl
              name="password"
              control={form.control}
              placeholder="Password"
              autoCapitalize="none"
              secureTextEntry={!showPassword}
              textContentType="password"
              hasError={!!form.formState.errors.password}
              erroMessage={
                form.formState.errors.password?.message ||
                (apiError as unknown as string)
              }
              prefixIcon={<Lock color={Colors.grey[300]} />}
              suffixIcon={
                <TouchableOpacity
                  hitSlop={20}
                  onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <EyeOff color={Colors.grey[300]} />
                  ) : (
                    <Eye color={Colors.grey[300]} />
                  )}
                </TouchableOpacity>
              }
            />
          </View>

          <View>
            <Link href="/auth/signup" asChild>
              <TouchableOpacity hitSlop={20}>
                <Text style={styles.termsText}>
                  Dont't have an account?{' '}
                  <Text style={styles.linkText}>Signup</Text>
                </Text>
              </TouchableOpacity>
            </Link>

            <View style={styles.bottomContainer}>
              <Button
                title="Login"
                variant={form.formState.isValid ? 'PRIMARY' : 'DISABLED'}
                isLoading={mutation.isPending}
                disabled={!form.formState.isValid || mutation.isPending}
                onPress={form.handleSubmit(onSubmit)}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  termsText: {
    color: Colors.termsColor,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 20,
  },
  linkText: {
    fontWeight: '600',
  },
  bottomContainer: {
    marginVertical: 20,
  },
  fieldContainer: {
    flex: 1,
    gap: 20,
  },
});
