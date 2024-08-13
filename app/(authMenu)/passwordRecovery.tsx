import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import InputField from '@/components/InputField';
import ToggleButton from '@/components/ToggleButton';
import { SansText } from '@/components/StyledText';
import { useTheme } from 'styled-components/native';

import { validateEmail } from '@/helpers/authHelper';

const PasswordRecoveryScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [recoveryAs, setRecoveryAs] = useState<string>('Staff');
  const router = useRouter();

  const theme = useTheme();
  const styles = createStylesheet(theme);

  const handlePasswordRecovery = () => {
    if (!validateEmail(email)) {
      setEmailError('The email must be a valid email address.');
      return;
    }

    global.api
      .raw(
        'POST',
        '/forgot-password',
        { email: email, for: recoveryAs.toLowerCase() },
        true,
      )
      .then((response: any) => {
        setEmailError(null);

        Alert.alert(
          'Password Recovery',
          'A password reset link has been sent to your email.',
        );
        router.back();
      })
      .catch((error: any) => {
        console.log('error:', error);

        setEmailError(error.response?.data?.message || 'No such user exists.');
      });
  };

  return (
    <View style={styles.container}>
      <SansText style={styles.title}>Forgot your password?</SansText>

      <ToggleButton
        options={['Staff', 'Customer']}
        onToggle={(option) => setRecoveryAs(option)}
        initialValue={recoveryAs}
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

      <TouchableOpacity
        style={styles.resetButton}
        onPress={handlePasswordRecovery}
      >
        <SansText style={styles.resetButtonText}>Send me a reset link</SansText>
      </TouchableOpacity>

      <View style={styles.signInContainer}>
        <SansText style={styles.signInText}>
          Do you remember your password?
        </SansText>
        <TouchableOpacity onPress={() => router.back()}>
          <SansText style={styles.signInLink}>Sign in</SansText>
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
      marginBottom: 15,
    },
    resetButton: {
      backgroundColor: theme.colors.success500,
      padding: 15,
      alignItems: 'center',
      borderRadius: 4,
      marginBottom: 20,
    },
    resetButtonText: {
      color: theme.colors.grayLight,
      fontSize: 16,
    },
    signInContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    signInText: {
      color: theme.colors.textDisabled,
    },
    signInLink: {
      color: theme.colors.success500,
      fontWeight: 'bold',
      marginLeft: 5,
    },
  });

export default PasswordRecoveryScreen;
