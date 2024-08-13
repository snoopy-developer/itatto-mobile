import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import InputField from '@/components/InputField';
import { SansText } from '@/components/StyledText';
import { useTheme } from 'styled-components/native';
import { validateEmail } from '@/helpers/authHelper';
import { RFValue } from 'react-native-responsive-fontsize';
import { screenDefaultHeight } from '@/constants/Params';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { handleUserLoginResponse } from '@/modules/userActions';

const RegisterScreen: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);
  const [businessName, setBusinessName] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [repeatPasswordError, setRepeatPasswordError] = useState<string | null>(
    null,
  );

  const theme = useTheme();
  const router = useRouter();
  const styles = createStylesheet(theme);

  const handleRegister = () => {
    let isValid = true;

    // Валідація полів
    if (!validateEmail(email)) {
      setEmailError('The email must be a valid email address.');
      isValid = false;
    } else {
      setEmailError(null);
    }

    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters.');
      isValid = false;
    } else {
      setPasswordError(null);
    }

    if (password !== repeatPassword) {
      setRepeatPasswordError('Passwords do not match.');
      isValid = false;
    } else {
      setRepeatPasswordError(null);
    }

    if (isValid) {
      global.api
        .raw(
          'POST',
          '/register',
          {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            password_confirmation: repeatPassword,
            organisation_name: businessName,
          },
          true,
        )
        .then((response: any) => {
          setEmailError(null);
          setPasswordError(null);
          setRepeatPasswordError(null);

          Alert.alert(
            'Registration',
            'Your account has been created successfully!',
          );
          handleUserLoginResponse(response).finally(() => {
            router.push('/');
          });
        })
        .catch((error: any) => {
          console.log('error:', error);

          setEmailError(
            error.response?.data?.message ||
              'Registration failed. Please try again.',
          );
        });
    }
  };

  return (
    <View style={styles.container}>
      <SansText style={styles.title}>Create account</SansText>

      <InputField
        label="First name"
        value={firstName}
        onChangeText={setFirstName}
        containerStyle={styles.inputContainer}
        placeholder="John"
      />

      <InputField
        label="Last name"
        value={lastName}
        onChangeText={setLastName}
        containerStyle={styles.inputContainer}
        placeholder="Doe"
      />

      <InputField
        label="Email"
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
        value={password}
        onChangeText={setPassword}
        containerStyle={styles.inputContainer}
        errorMessage={passwordError}
        rightIcon={
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <FontAwesome
              name={showPassword ? 'eye' : 'eye-slash'}
              size={RFValue(20, screenDefaultHeight)}
              color={theme.colors.textDisabled}
            />
          </TouchableOpacity>
        }
        secureTextEntry={!showPassword}
      />

      <InputField
        label="Repeat password"
        type="password"
        placeholder="••••••••"
        value={repeatPassword}
        onChangeText={setRepeatPassword}
        containerStyle={styles.inputContainer}
        errorMessage={repeatPasswordError}
        rightIcon={
          <TouchableOpacity
            onPress={() => setShowRepeatPassword(!showRepeatPassword)}
          >
            <FontAwesome
              name={showRepeatPassword ? 'eye' : 'eye-slash'}
              size={RFValue(20, screenDefaultHeight)}
              color={theme.colors.textDisabled}
            />
          </TouchableOpacity>
        }
        secureTextEntry={!showRepeatPassword}
      />

      <InputField
        label="Your business name"
        value={businessName}
        onChangeText={setBusinessName}
        containerStyle={styles.inputContainer}
        placeholder='"John Doe Company Inc."'
      />

      <TouchableOpacity
        style={styles.createAccountButton}
        onPress={handleRegister}
      >
        <SansText style={styles.createAccountButtonText}>
          Create account
        </SansText>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <SansText style={styles.loginText}>Already have an account?</SansText>
        <TouchableOpacity onPress={() => router.back()}>
          <SansText style={styles.loginLink}>Login here</SansText>
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
    inputContainer: {
      marginBottom: 0,
    },
    createAccountButton: {
      backgroundColor: theme.colors.success500,
      padding: 15,
      alignItems: 'center',
      borderRadius: 4,
      marginBottom: 20,
    },
    createAccountButtonText: {
      color: theme.colors.grayLight,
      fontSize: 16,
    },
    loginContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    loginText: {
      color: theme.colors.textDisabled,
    },
    loginLink: {
      color: theme.colors.success500,
      fontWeight: 'bold',
      marginLeft: 5,
    },
  });

export default RegisterScreen;
