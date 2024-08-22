import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { screenDefaultPadding } from '@/constants/Params';
import MenuIcon from '@assets/images/svg/Menu.svg';
import ChangeThemeButton from '@components/ChangeThemeButton';
import NotificationBell from '@components/Buttons/NotificationIconButton';
import UserProfileIcon from '@components/userProfile/UserProfileIcon';

const TopBar: React.FC<{ navigation?: any }> = ({ navigation }) => {
  const theme = useTheme();
  const styles = createStylesheet(theme);
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.headerContainer, { marginTop: insets.top }]}>
      <TouchableOpacity
        style={[styles.iconContainer, { paddingRight: 40 }]}
        onPress={() => navigation?.openDrawer()}
      >
        <MenuIcon height={24} width={24} color={theme.colors.textPrimary} />
      </TouchableOpacity>

      <View style={styles.rightIconsContainer}>
        <ChangeThemeButton />

        <NotificationBell />

        <UserProfileIcon
          onPress={() => navigation?.navigate('userSettingsModal')}
        />
      </View>
    </View>
  );
};

const createStylesheet = (theme: any) =>
  StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 8,
      paddingHorizontal: 16,
      backgroundColor: theme.colors.paperBg,
      borderRadius: 10,
      marginHorizontal: screenDefaultPadding,
      shadowColor: theme.colors.grayShadowSmall,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 1,
      shadowRadius: 3.84,
      elevation: 5,
    },
    iconContainer: {
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    rightIconsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    profileContainer: {
      position: 'relative',
      width: 44,
      height: 44,
    },
    profilePicture: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderWidth: 2,
      aspectRatio: 1,
      borderColor: theme.colors.success500,
    },
    notificationDot: {
      position: 'absolute',
      top: 0,
      right: 0,
      width: 10,
      height: 10,
      borderWidth: 1,
      borderColor: theme.colors.bodyBg,
      backgroundColor: theme.colors.error500,
      borderRadius: 5,
    },
  });

export default TopBar;
