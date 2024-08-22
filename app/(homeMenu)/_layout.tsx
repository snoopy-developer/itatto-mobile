import TopBar from '@/components/TopBar';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { useTheme } from 'styled-components';
import HomeDrawerSideBar from '@components/DrawerSideBar/HomeDrawerSideBar';
import { Easing } from 'react-native-reanimated';
import { View } from '@/components/Themed';

export default function HomeLayout() {
  const theme = useTheme();

  return (
    <Drawer
      drawerContent={(props) => <HomeDrawerSideBar {...props} />}
      screenOptions={{
        header: (props) => <TopBar navigation={props.navigation} />,
        drawerType: 'front',
        unmountOnBlur: true,
        headerTransparent: true,
        drawerStyle: {
          backgroundColor: theme.colors.paperBg,
          width: '65%',
        },
      }}
    >
      <Drawer.Screen name="homeTab" />
      <Drawer.Screen name="services" />
      <Drawer.Screen name="messages" />
      <Drawer.Screen name="calendar" />
      <Drawer.Screen name="staff" />
      <Drawer.Screen name="clients" />
      <Drawer.Screen name="marketing" />
    </Drawer>
  );
}
