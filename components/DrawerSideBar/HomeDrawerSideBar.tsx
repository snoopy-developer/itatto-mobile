import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { useTheme } from 'styled-components';
import { useRouter } from 'expo-router';
import DrawerHeader from '@components/DrawerSideBar/DrawerHeader';
import DrawerMenuItem from '@components/DrawerSideBar/DrawerMenuItem';
import HomeIcon from '@assets/images/svg/SmartHome.svg';
import ServicesIcon from '@assets/images/svg/Mist.svg';
import MessagesIcon from '@assets/images/svg/MessageCircle2.svg';
import CalendarIcon from '@assets/images/svg/Calendar.svg';
import StaffIcon from '@assets/images/svg/Friends.svg';
import ClientsIcon from '@assets/images/svg/User.svg';
import MarketingIcon from '@assets/images/svg/Target.svg';
import { SansText } from '@components/StyledText';

const HomeDrawerSideBar: React.FC<DrawerContentComponentProps> = (props) => {
  const theme = useTheme();
  const router = useRouter();
  const styles = createStylesheet(theme);

  const [activeItem, setActiveItem] = useState<string>('Dashboards');

  const handlePress = (label: string, route: string) => {
    setActiveItem(label);
    props.navigation.closeDrawer();
    props.navigation.navigate(route);
  };
  return (
    <DrawerContentScrollView {...props}>
      <DrawerHeader navigation={props.navigation} />
      <View style={styles.container}>
        <DrawerMenuItem
          label="Dashboards"
          Icon={HomeIcon}
          onPress={() => handlePress('Dashboards', 'index')}
          isActive={activeItem === 'Dashboards'}
        />
        <SansText style={styles.sectionTitle}>APP & SERVIZI</SansText>
        <DrawerMenuItem
          label="Servizi"
          Icon={ServicesIcon}
          onPress={() => handlePress('Servizi', 'services')}
          isActive={activeItem === 'Servizi'}
        />
        <DrawerMenuItem
          label="Messaggi"
          Icon={MessagesIcon}
          onPress={() => handlePress('Messaggi', 'messages')}
          isActive={activeItem === 'Messaggi'}
        />
        <DrawerMenuItem
          label="Calendario"
          Icon={CalendarIcon}
          onPress={() => handlePress('Calendario', 'calendar')}
          isActive={activeItem === 'Calendario'}
        />
        <DrawerMenuItem
          label="Staff"
          Icon={StaffIcon}
          onPress={() => handlePress('Staff', 'staff')}
          isActive={activeItem === 'Staff'}
        />
        <DrawerMenuItem
          label="Clienti"
          Icon={ClientsIcon}
          onPress={() => handlePress('Clienti', 'clients')}
          isActive={activeItem === 'Clienti'}
        />
        <DrawerMenuItem
          label="Marketing"
          Icon={MarketingIcon}
          onPress={() => handlePress('Marketing', 'marketing')}
          isActive={activeItem === 'Marketing'}
        />
      </View>
    </DrawerContentScrollView>
  );
};

const createStylesheet = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent',
    },
    sectionTitle: {
      marginLeft: 16,
      marginTop: 20,
      marginBottom: 10,
      color: theme.colors.textSecondary,
    },
  });

export default HomeDrawerSideBar;
