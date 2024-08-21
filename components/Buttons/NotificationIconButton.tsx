import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import Bell from '@assets/images/svg/Bell.svg';

interface NotificationIconButtonProps {
  size?: number;
  style?: any;
}
const NotificationBell: React.FC<NotificationIconButtonProps> = ({
  size = 24,
  style,
}) => {
  const theme = useTheme();
  const styles = createStylesheet(theme);
  const [hasNotifications, setHasNotifications] = useState(false);
  const navigation = useNavigation();

  const openModal = () => {
    // TODO: Open modal with notifications
  };

  return (
    <TouchableOpacity style={[styles.iconContainer, style]} onPress={openModal}>
      <View style={styles.bellContainer}>
        <Bell height={size} width={size} color={theme.colors.textPrimary} />
        {hasNotifications && <View style={styles.notificationDot} />}
      </View>
    </TouchableOpacity>
  );
};

const createStylesheet = (theme: any) =>
  StyleSheet.create({
    iconContainer: {
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    bellContainer: {
      position: 'relative',
      backgroundColor: 'transparent',
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

export default NotificationBell;
