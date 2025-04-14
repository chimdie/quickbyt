import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native';
import {SafeAreaView} from '@/components/ui/SafeAreaView';
import {Colors} from '@/constants/Colors';
import {router} from 'expo-router';
import {TextInput} from '@/components/TextInput';

export default function Signup() {
  const windowHeight = useWindowDimensions().height;
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.background,
        minHeight: Math.round(windowHeight),
      }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Text style={styles.title}>Enter your email address</Text>
          <View style={{flex: 1}}>
            <TextInput
              placeholder="Username"
              value={username ?? ''}
              onChangeText={setUsername}
            />

            <TextInput
              placeholder="Password"
              autoCapitalize="none"
              value={password ?? ''}
              onChangeText={setPassword}
            />
            <TextInput
              placeholder="Confirm Password"
              autoCapitalize="none"
              value={password ?? ''}
              onChangeText={setPassword}
            />
          </View>

          <View>
            <Text style={styles.termsText}>
              By registering, you agree to our{' '}
              <Text style={styles.linkText}>Terms of Service</Text> and{' '}
              <Text style={styles.linkText}>Privacy Policy</Text>
            </Text>

            <View style={styles.bottomContainer}>
              <TouchableOpacity
                onPress={() => router.navigate('/(tabs)')}
                style={[
                  styles.button,
                  username ? styles.buttonActive : styles.buttonDisabled,
                ]}
                // disabled={!username && !password}
              >
                <Text style={styles.buttonText}>Continue</Text>
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
  termsText: {
    color: Colors.termsColor,
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
    backgroundColor: Colors.disabled,
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
