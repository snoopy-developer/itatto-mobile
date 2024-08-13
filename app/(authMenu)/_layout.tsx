import { Stack } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'styled-components';

export default function AuthLayout() {
  const theme = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.bodyBg }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="passwordRecovery"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="signUp"
          options={{ headerShown: false, animation: 'slide_from_bottom' }}
        />
      </Stack>
    </SafeAreaView>
  );
}
