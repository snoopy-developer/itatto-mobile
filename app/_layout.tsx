import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import React from 'react';
import { store } from '@/redux/store';
import { Provider } from 'react-redux';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { lightTheme, darkTheme } from '@/themes/themes';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  ColorSchemeProvider,
  useColorScheme,
} from '@/modules/ColorSchemeContext';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(homeMenu)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    PublicSans: require('@assets/fonts/PublicSans-Regular.ttf'),
    PublicSansBold: require('../assets/fonts/PublicSans-Bold.ttf'),
    PublicSansHeavy: require('../assets/fonts/PublicSans-ExtraBold.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ColorSchemeProvider>
        <RootLayoutNav />
      </ColorSchemeProvider>
    </GestureHandlerRootView>
  );
}

function RootLayoutNav() {
  const { colorScheme } = useColorScheme();

  return (
    <SafeAreaProvider>
      <StyledThemeProvider
        theme={colorScheme === 'dark' ? darkTheme : lightTheme}
      >
        <Provider store={store}>
          <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(homeMenu)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
          </Stack>
        </Provider>
      </StyledThemeProvider>
    </SafeAreaProvider>
  );
}
