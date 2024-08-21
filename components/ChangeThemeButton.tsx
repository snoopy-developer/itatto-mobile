import React from 'react';
import { useTheme } from 'styled-components/native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useColorScheme } from '@/modules/ColorSchemeContext';
import { View } from './Themed';
import { StyleSheet } from 'react-native';
import MoonStars from '../assets/images/svg/MoonStars.svg';

export interface ThemeProps {
  style?: any;
  size?: number;
}

const ChangeThemeButton: React.FC<ThemeProps> = ({ size = 24, style }) => {
  const theme = useTheme();
  const { toggle, colorScheme, active } = useColorScheme();

  const pan = Gesture.Pan()
    .runOnJS(true)
    .onBegin((e) => {
      if (!active) {
        toggle(e.absoluteX, e.absoluteY);
      }
    });

  return (
    <GestureDetector gesture={pan}>
      <View style={[styles.iconContainer, style]}>
        <MoonStars
          width={size}
          height={size}
          color={theme.colors.textPrimary}
        />
      </View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: 'transparent',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChangeThemeButton;
