import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import { useCustomTheme } from '@/modules/theme-context';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const ChangeThemeButton: React.FC = () => {
  const theme = useTheme();
  const { toggleTheme } = useCustomTheme();

  const pan = Gesture.Pan()
    .runOnJS(true)
    .onBegin((e) => {
      toggleTheme(e.absoluteX, e.absoluteY);
    });

  const handleThemeChange = () => {
    toggleTheme();
  };

  return (
    // style={styles.iconContainer} onPress={handleThemeChange}
    <GestureDetector gesture={pan}>
      <FontAwesome name="moon-o" size={24} color={theme.colors.textPrimary} />
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChangeThemeButton;
