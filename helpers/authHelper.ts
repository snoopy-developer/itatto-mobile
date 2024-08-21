import { StyleSheet } from 'react-native';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};

export const validateForm = (email: string, password: string) => {
  const errors = {
    emailError: null as string | null,
    passwordError: null as string | null,
  };

  if (!validateEmail(email)) {
    errors.emailError = 'Please enter a valid email address';
  }

  if (!validatePassword(password)) {
    errors.passwordError = 'Password must be at least 8 characters';
  }

  return errors;
};

export const createSignInStylesheet = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: theme.colors.bodyBg,
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: 30,
    },
    logo: {
      // justifyContent: 'flex-start',
      alignItems: 'center',
      aspectRatio: 2,
      width: '30%',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: theme.colors.textPrimary,
    },
    toggleContainer: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    toggleButton: {
      flex: 1,
      paddingVertical: 10,
      alignItems: 'center',
      backgroundColor: theme.colors.paperBg,
      borderColor: theme.colors.inputBorder,
      borderWidth: 1,
    },
    activeButton: {
      backgroundColor: theme.colors.success500,
      borderColor: 'transparent',
    },
    toggleButtonText: {
      fontSize: 16,
      color: theme.colors.textSecondary,
    },
    activeButtonText: {
      color: theme.colors.grayLight,
    },
    inputContainer: {
      marginBottom: 0,
    },
    forgotPassword: {
      alignItems: 'flex-end',
      marginBottom: 20,
    },
    forgotPasswordText: {
      color: theme.colors.textDisabled,
    },
    signInButton: {
      backgroundColor: theme.colors.success500,
      padding: 15,
      alignItems: 'center',
      borderRadius: 4,
      marginBottom: 20,
    },
    signInButtonText: {
      color: theme.colors.grayLight,
      fontSize: 16,
    },
    signUpContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    signUpText: {
      color: theme.colors.textDisabled,
    },
    signUpLink: {
      color: theme.colors.success500,
      fontWeight: 'bold',
      marginLeft: 5,
    },
  });
