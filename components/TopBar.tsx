import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { screenDefaultPadding } from '@/constants/Params';

import MenuIcon from '@assets/images/svg/Menu.svg';
import ChangeThemeButton from '@components/ChangeThemeButton';

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

        {/* <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => console.log('Open Notifications')}
        >
          <View>
            <FontAwesome
              name="bell-o"
              size={24}
              color={theme.colors.textPrimary}
            />
            <View style={styles.notificationDot} />
          </View>
        </TouchableOpacity>

        <View style={styles.profileContainer}>
          <Image
            source={{ uri: 'https://your-image-url.com' }}
            style={styles.profilePicture}
          />
        </View> */}
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
    },
    iconContainer: {
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    rightIconsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
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
      backgroundColor: theme.colors.error500,
      borderRadius: 5,
    },
  });

export default TopBar;
