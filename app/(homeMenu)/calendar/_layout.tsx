import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { useTheme } from 'styled-components';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CalendarLeftBar from '@/components/calendar/LeftBar';

export default function HomeLayout() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top + 80,
        backgroundColor: theme.colors.bodyBg,
      }}
    >
      <Drawer
        drawerContent={(props) => <CalendarLeftBar></CalendarLeftBar>}
        screenOptions={{
          headerShown: false,
          drawerType: 'front',
          drawerStyle: {
            backgroundColor: theme.colors.paperBg,
            width: '80%',
          },
        }}
      >
        <Drawer.Screen name="calendarStash" />
      </Drawer>
    </View>
  );
}
