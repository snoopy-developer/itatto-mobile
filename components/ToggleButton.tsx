import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  LayoutChangeEvent,
} from 'react-native';
import { SansText } from '@/components/StyledText';
import { useTheme } from 'styled-components/native';

interface ToggleButtonProps {
  options: string[];
  onToggle: (selectedOption: string) => void;
  initialValue?: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  options,
  onToggle,
  initialValue,
}) => {
  const theme = useTheme();
  const [selectedOption, setSelectedOption] = useState<string>(
    initialValue || options[0],
  );
  const [toggleAnim] = useState(new Animated.Value(0));
  const [buttonWidth, setButtonWidth] = useState<number>(0);

  const handleToggle = (option: string) => {
    const index = options.indexOf(option);
    setSelectedOption(option);
    onToggle(option);
    Animated.timing(toggleAnim, {
      toValue: index,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setButtonWidth(width / options.length);
  };

  const translateX = toggleAnim.interpolate({
    inputRange: options.map((_, index) => index),
    outputRange: options.map((_, index) => index * buttonWidth),
  });

  const styles = createStylesheet(theme);

  return (
    <View style={styles.container} onLayout={handleLayout}>
      <View style={styles.background}>
        <Animated.View
          style={[
            styles.slider,
            {
              width: buttonWidth,
              transform: [{ translateX }],
            },
          ]}
        />
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionButton}
            onPress={() => handleToggle(option)}
          >
            <SansText
              style={[
                styles.optionText,
                selectedOption === option && styles.selectedOptionText,
              ]}
            >
              {option}
            </SansText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const createStylesheet = (theme: any) =>
  StyleSheet.create({
    container: {
      marginBottom: 20,
    },
    background: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: theme.colors.inputBorder,
      borderRadius: 25,
      overflow: 'hidden',
    },
    slider: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      backgroundColor: theme.colors.success500,
      borderRadius: 25,
    },
    optionButton: {
      flex: 1,
      paddingVertical: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    optionText: {
      fontSize: 16,
      color: theme.colors.textSecondary,
    },
    selectedOptionText: {
      color: theme.colors.grayLight,
    },
  });

export default ToggleButton;
