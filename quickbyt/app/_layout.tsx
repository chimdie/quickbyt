import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {StatusBar} from 'expo-status-bar';
import {useEffect} from 'react';
import 'react-native-reanimated';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import {useAuthStore} from '@/store/useAuthStore';

const queryClient = new QueryClient();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  // const [isAppReady, setIsAppReady] = useState<boolean>(false);
  const {token, hasHydrated} = useAuthStore();

  useEffect(() => {
    if (loaded && hasHydrated) {
      SplashScreen.hideAsync();
    }
  }, [loaded, hasHydrated]);

  if (!loaded || !hasHydrated) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <Stack
          screenOptions={{headerShown: false}}
          initialRouteName={token ? '(tabs)' : 'index'}>
          <Stack.Screen
            name="index"
            redirect={!!token}
            options={{
              animation: 'fade',
              animationDuration: 0,
              animationTypeForReplace: 'push',
            }}
          />
          <Stack.Screen
            name="(tabs)"
            options={{
              animation: 'fade',
              animationDuration: 0,
              animationTypeForReplace: 'push',
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
