import { screenDefaultHeight } from '@/constants/Params';
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  Text,
  Animated,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components/native';

interface InputFieldProps extends TextInputProps {
  label?: string;
  type?: 'text' | 'password' | 'email';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  errorMessage?: string | null;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = 'text',
  leftIcon,
  rightIcon,
  containerStyle,
  inputStyle,
  secureTextEntry,
  errorMessage = null,
  ...props
}) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const borderColorAnim = useRef(new Animated.Value(0)).current;
  const errorOpacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(borderColorAnim, {
      toValue: isFocused ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isFocused, borderColorAnim]);

  useEffect(() => {
    Animated.timing(errorOpacityAnim, {
      toValue: errorMessage ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [errorMessage, errorOpacityAnim]);

  const borderColor = borderColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [theme.colors.inputBorder, theme.colors.actionActive],
  });

  const styles = createStylesheet(theme);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Animated.View
        style={[
          styles.inputContainer,
          {
            borderColor:
              errorMessage === null ? borderColor : theme.colors.error500,
          },
        ]}
      >
        {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
        <TextInput
          style={[styles.input, inputStyle]}
          secureTextEntry={secureTextEntry}
          keyboardType={type === 'email' ? 'email-address' : 'default'}
          autoCapitalize="none"
          placeholderTextColor={theme.colors.textDisabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>}
      </Animated.View>
      <Animated.Text
        style={[
          styles.errorText,
          {
            opacity: errorOpacityAnim,
            transform: [
              {
                translateY: errorOpacityAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-5, 0],
                }),
              },
            ],
          },
        ]}
      >
        {errorMessage}
      </Animated.Text>
    </View>
  );
};

const createStylesheet = (theme: any) =>
  StyleSheet.create({
    container: {
      marginBottom: 15,
    },
    label: {
      fontSize: 16,
      color: theme.colors.textPrimary,
      marginBottom: 5,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
      backgroundColor: theme.colors.paperBg,
    },
    input: {
      flex: 1,
      color: theme.colors.textPrimary,
      paddingVertical: 10,
      fontSize: RFValue(16, screenDefaultHeight),
      fontFamily: 'PublicSans',
    },
    iconContainer: {
      marginHorizontal: 5,
    },
    errorText: {
      marginTop: 5,
      color: theme.colors.error500,
      fontSize: 12,
    },
  });

export default InputField;
