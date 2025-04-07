import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  // useWindowDimensions,
} from 'react-native';
import {SafeAreaView} from '@/components/ui/SafeAreaView';
import {Colors} from '@/constants/Colors';
import {Link, router} from 'expo-router';

export default function LoginScreen() {
  // const windowHeight = useWindowDimensions().height;
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.background,
        // minHeight: Math.round(windowHeight),
      }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Text style={styles.title}>Enter your login credentials</Text>
          <View style={{flex: 1}}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#888"
              value={username ?? ''}
              onChangeText={setUsername}
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#888"
              autoCapitalize="none"
              value={password ?? ''}
              onChangeText={setPassword}
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
              <TouchableOpacity
                onPress={() => router.navigate('/(tabs)')}
                style={[
                  styles.button,
                  username ? styles.buttonActive : styles.buttonDisabled,
                ]}
                // disabled={username?.length === 0 && password?.length === 0}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
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
  backButton: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 0.2,
  },
  termsText: {
    color: '#aaa',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 20,
  },
  linkText: {
    fontWeight: '600',
  },
  button: {
    marginTop: 20,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: Colors.primary.main,
  },
  buttonDisabled: {
    backgroundColor: '#444',
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  bottomContainer: {
    marginBottom: 20,
  },
});
