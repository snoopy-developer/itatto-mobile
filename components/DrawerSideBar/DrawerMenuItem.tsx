import React, { useEffect } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';
import { SvgProps } from 'react-native-svg';
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SansText } from '../StyledText';
import { screenDefaultHeight } from '@/constants/Params';
import { RFValue } from 'react-native-responsive-fontsize';

interface DrawerMenuItemProps {
  label: string;
  Icon: React.FC<SvgProps>;
  onPress: () => void;
  isActive: boolean;
}

const DrawerMenuItem: React.FC<DrawerMenuItemProps> = ({
  label,
  Icon,
  onPress,
  isActive,
}) => {
  const theme = useTheme();
  const activeState = useSharedValue(isActive ? 1 : 0);

  const styles = createStylesheet(theme);
  useEffect(() => {
    activeState.value = withTiming(isActive ? 1 : 0, {
      duration: 300,
      easing: Easing.out(Easing.ease),
    });
  }, [isActive]);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      activeState.value,
      [0, 1],
      ['transparent', theme.colors.success500],
    );
    return {
      backgroundColor,
    };
  });

  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View style={[styles.drawerItem, animatedStyle]}>
        <Icon
          height={RFValue(24, screenDefaultHeight)}
          width={RFValue(24, screenDefaultHeight)}
          color={isActive ? theme.colors.grayLight : theme.colors.textPrimary}
        />
        <SansText
          style={[
            styles.drawerItemText,
            {
              color: isActive
                ? theme.colors.grayLight
                : theme.colors.textPrimary,
            },
          ]}
        >
          {label}
        </SansText>
      </Animated.View>
    </TouchableOpacity>
  );
};

const createStylesheet = (theme: any) =>
  StyleSheet.create({
    drawerItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 10,
      marginHorizontal: 8,
    },
    drawerItemText: {
      marginLeft: 16,
      fontSize: 16,
    },
  });

export default DrawerMenuItem;
