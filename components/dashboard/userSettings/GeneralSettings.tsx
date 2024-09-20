import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useTheme } from 'styled-components/native';
import DropdownSelector from '@components/Buttons/DropdownSelector';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const GeneralSettings: React.FC = () => {
  const theme = useTheme();
  const styles = createStylesheet(theme);

  const [businessName, setBusinessName] = useState('iTattooTest');
  const [language, setLanguage] = useState('English');
  const [currency, setCurrency] = useState('Euro');
  const [timezone, setTimezone] = useState('GMT Standard Time (GMT)');
  const [cancellationPolicy, setCancellationPolicy] = useState('Two days');
  const [autoDelete, setAutoDelete] = useState('Previous year');

  const { userProfile } = useSelector((state: RootState) => state.user);

  const handleUpdate = () => {
    Alert.alert(
      'Settings Updated',
      'Your settings have been successfully updated.',
    );
    // Here you can add your logic to update the settings on the server or local storage
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <SafeAreaView>
          <Text style={styles.title}>General Settings</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Business name</Text>
            <TextInput
              style={styles.input}
              value={businessName}
              onChangeText={setBusinessName}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Language</Text>
            <DropdownSelector
              label="Language"
              options={['English', 'Spanish', 'French']}
              selectedOption={language}
              onSelect={setLanguage}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Currency</Text>
            <DropdownSelector
              label="Currency"
              options={['Euro', 'USD', 'GBP']}
              selectedOption={currency}
              onSelect={setCurrency}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Timezone</Text>
            <DropdownSelector
              label="Timezone"
              options={[
                'GMT Standard Time (GMT)',
                'Pacific Time (PT)',
                'Central Time (CT)',
              ]}
              selectedOption={timezone}
              onSelect={setTimezone}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Disallow appointment cancellation</Text>
            <DropdownSelector
              label="Cancellation Policy"
              options={['One day', 'Two days', 'Three days']}
              selectedOption={cancellationPolicy}
              onSelect={setCancellationPolicy}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Auto delete</Text>
            <DropdownSelector
              label="Auto delete"
              options={['Previous year', 'Previous month']}
              selectedOption={autoDelete}
              onSelect={setAutoDelete}
            />
          </View>
          <View style={styles.warningContainer}>
            <Text style={styles.warningText}>
              Please note that when deleting appointments, all related
              statistics data will be also deleted
            </Text>
          </View>
          <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
            <Text style={styles.updateButtonText}>Update</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

const createStylesheet = (theme: any) =>
  StyleSheet.create({
    container: {
      width: '100%',
      flex: 1,
      padding: 20,
      backgroundColor: theme.colors.paperBg,
      borderRadius: 10,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    scroll: {
      width: '100%',
      flex: 1,
      backgroundColor: 'theme.colors.paperBg',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: theme.colors.textPrimary,
    },
    inputContainer: {
      marginBottom: 16,
    },
    label: {
      fontSize: 16,
      color: theme.colors.textPrimary,
      marginBottom: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.inputBorder,
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      color: theme.colors.textPrimary,
      backgroundColor: theme.colors.paperBg,
    },
    warningContainer: {
      padding: 16,
      backgroundColor: theme.colors.warningBg,
      borderRadius: 8,
      marginBottom: 16,
    },
    warningText: {
      color: theme.colors.warningText,
      fontSize: 14,
    },
    updateButton: {
      backgroundColor: theme.colors.success500,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    updateButtonText: {
      color: theme.colors.grayLight,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default GeneralSettings;
