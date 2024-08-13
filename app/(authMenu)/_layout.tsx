import { Stack } from 'expo-router';
import React from 'react';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="passwordRecovery" options={{ headerShown: false }} />
      <Stack.Screen
        name="singUp"
        options={{ headerShown: false, animation: 'slide_from_bottom' }}
      />
    </Stack>
  );
}
