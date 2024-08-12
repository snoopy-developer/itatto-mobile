import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import InputField from '@/components/InputField';
import ToggleButton from '@/components/ToggleButton';
import { SansText } from '@/components/StyledText';
import { useTheme } from 'styled-components/native';
import { validateForm } from '@/helpers/authHelper';
import { handleUserLoginResponse } from '@/modules/userActions';
import { useRouter } from 'expo-router';

const SignInScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginAs, setLoginAs] = useState<string>('Staff');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const router = useRouter();

  const theme = useTheme();
  const styles = createStylesheet(theme);

  const handleSignIn = () => {
    const { emailError, passwordError } = validateForm(email, password);

    if (emailError || passwordError) {
      setEmailError(emailError);
      setPasswordError(passwordError);
      return;
    }

    global.api
      .raw(
        'POST',
        '/login',
        { email: email, password: password, login_as: loginAs.toLowerCase() },
        true,
      )
      .then((response: any) => {
        setEmailError(null);
        setPasswordError(null);

        console.log('Response:', response);

        handleUserLoginResponse(response);

        router.push('/');
      })
      .catch((error: any) => {
        console.log('error:', error);
        setEmailError('Invalid email or password');
        setPasswordError('Invalid email or password');
      });
  };

  return (
    <View style={styles.container}>
      <SansText style={styles.title}>Sign in to your account</SansText>

      <ToggleButton
        options={['Staff', 'Customer']}
        onToggle={(option) => setLoginAs(option)}
        initialValue={loginAs}
      />

      <InputField
        label="Your email address"
        type="email"
        placeholder="johndoe@example.com"
        value={email}
        onChangeText={setEmail}
        containerStyle={styles.inputContainer}
        errorMessage={emailError}
      />

      <InputField
        label="Password"
        type="password"
        placeholder="••••••••"
        rightIcon={
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <FontAwesome
              name={showPassword ? 'eye' : 'eye-slash'}
              size={20}
              color={theme.colors.textDisabled}
            />
          </TouchableOpacity>
        }
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        containerStyle={styles.inputContainer}
        errorMessage={passwordError}
      />

      <TouchableOpacity style={styles.forgotPassword}>
        <SansText style={styles.forgotPasswordText}>Forgot password?</SansText>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <SansText style={styles.signInButtonText}>Sign in</SansText>
      </TouchableOpacity>

      <View style={styles.signUpContainer}>
        <SansText style={styles.signUpText}>
          Don't have an account yet?
        </SansText>
        <TouchableOpacity>
          <SansText style={styles.signUpLink}>Sign up?</SansText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const createStylesheet = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: theme.colors.bodyBg,
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
      marginBottom: 15,
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

export default SignInScreen;
