import TopBar from '@/components/TopBar';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';

export default function HomeLayout() {
  const theme = useTheme();

  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: theme.colors.bodyBg }}
    >
      <Drawer
        screenOptions={{
          header: (props) => <TopBar navigation={props.navigation} />,
          drawerType: 'front',
          headerTransparent: true,
        }}
      >
        <Drawer.Screen name="index" />
      </Drawer>
    </GestureHandlerRootView>
  );
}
