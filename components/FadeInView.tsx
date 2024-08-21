import React from 'react';
import { Animated, View, ViewStyle } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';

interface FadeInViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const FadeInView: React.FC<FadeInViewProps> = ({ children, style }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  const theme = useTheme();

  useFocusEffect(
    React.useCallback(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      return () => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }).start();
      };
    }, [fadeAnim]),
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.bodyBg }}>
      <Animated.View // Special animatable View
        style={
          [{ opacity: fadeAnim, flex: 1 }, style] // Bind opacity to animated value
        }
      >
        {children}
      </Animated.View>
    </View>
  );
};

export default FadeInView;
