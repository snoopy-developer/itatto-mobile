import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useTheme } from 'styled-components';
import CloseIcon from '@assets/images/svg/XIcon.svg';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
interface DrawerHeaderProps {
  navigation: DrawerNavigationHelpers;
}

const DrawerHeader: React.FC<DrawerHeaderProps> = ({ navigation }) => {
  const theme = useTheme();
  const styles = createStylesheet(theme);

  return (
    <View style={styles.headerContainer}>
      <Image
        source={require('@assets/images/Logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <TouchableOpacity onPress={() => navigation?.closeDrawer()}>
        <CloseIcon width={24} height={24} color={theme.colors.textPrimary} />
      </TouchableOpacity>
    </View>
  );
};

const createStylesheet = (theme: any) =>
  StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 22,
      backgroundColor: 'transparent',
    },
    logo: {
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      aspectRatio: 2,
      width: '60%',
    },
  });

export default DrawerHeader;
