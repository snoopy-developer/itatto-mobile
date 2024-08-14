import TopBar from '@/components/TopBar';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { useTheme } from 'styled-components';
import HomeDrawerSideBar from '@components/DrawerSideBar/HomeDrawerSideBar';

export default function HomeLayout() {
  const theme = useTheme();

  return (
    <Drawer
      drawerContent={(props) => <HomeDrawerSideBar {...props} />}
      screenOptions={{
        header: (props) => <TopBar navigation={props.navigation} />,
        drawerType: 'front',
        headerTransparent: true,
        drawerStyle: {
          backgroundColor: theme.colors.paperBg,
          width: '65%',
        },



        
      }}
    >
      <Drawer.Screen name="index" />
      <Drawer.Screen name="services" />
      <Drawer.Screen name="messages" />
      <Drawer.Screen name="calendar" />
      <Drawer.Screen name="staff" />
      <Drawer.Screen name="clients" />
      <Drawer.Screen name="marketing" />
    </Drawer>
  );
}
