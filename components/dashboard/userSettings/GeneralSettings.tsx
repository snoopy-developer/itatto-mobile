import React, { useEffect, useState } from 'react';
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

import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'expo-router';

const cancellationPolicyOptions = [
  { label: 'Allow anytime', value: 0 },
  { label: 'Two days', value: 2 },
  { label: 'Tree days', value: 3 },
  { label: 'Four days', value: 4 },
  { label: 'Five days', value: 5 },
  { label: 'Always', value: 99999 },
];

const autoDeletePeriodOptions = [
  { label: 'Newer', value: 99999 },
  { label: 'Previous year', value: 365 },
  { label: 'Previous month', value: 30 },
  { label: 'Previous week', value: 7 },
  { label: 'Previous day', value: 1 },
];

interface UpdateOrganisationPayload {
  autodelete_period_days: number;
  cancellation_buffer_days: number;
  currency_id: number;
  language_id: number;
  name: string;
  slug: string;
  timezone: string;
}
const GeneralSettings: React.FC = () => {
  const theme = useTheme();
  const styles = createStylesheet(theme);
  const router = useRouter();

  const [businessName, setBusinessName] = useState('');
  const [language, setLanguage] = useState('');
  const [currency, setCurrency] = useState('');
  const [timezone, setTimezone] = useState('');
  const [cancellationPolicy, setCancellationPolicy] = useState('');
  const [autoDelete, setAutoDelete] = useState('');

  const { userProfile } = useSelector((state: RootState) => state.user);
  const { settings } = useSelector((state: RootState) => state.settings);

  useEffect(() => {
    if (userProfile) {
      const org = userProfile.data.organisations.find(
        (org: any) => org.id === userProfile.data.default_organisation_id,
      );

      setBusinessName(org.name);

      setLanguage(
        settings.languages.find(
          (language: any) => language.id === org.language_id,
        ).name,
      );
      setCurrency(
        settings.currencies.find(
          (currency: any) => currency.id === org.currency_id,
        ).name,
      );
      setTimezone(org.timezone);
      setCancellationPolicy(
        cancellationPolicyOptions.find(
          (option: any) => option.value === org.cancellation_buffer_days,
        )?.label || 'Anytime',
      );
      setAutoDelete(
        autoDeletePeriodOptions.find(
          (option: any) => option.value === org.autodelete_period_days,
        )?.label || 'Newer',
      );
    }
  }, [userProfile]);
  const handleUpdate = () => {
    const payload = {
      autodelete_period_days:
        autoDeletePeriodOptions.find(
          (option: any) => option.label === autoDelete,
        )?.value || 99999,
      cancellation_buffer_days:
        cancellationPolicyOptions.find(
          (option: any) => option.label === cancellationPolicy,
        )?.value || 0,
      currency_id: settings.currencies.find(
        (option: any) => option.name === currency,
      ).id,
      language_id: settings.languages.find(
        (option: any) => option.name === language,
      ).id,
      name: businessName,
      slug: businessName.toLowerCase().replace(/ /g, '-'),
      timezone: timezone,
    };

    updateOrganisation(userProfile.data.default_organisation_id, payload);
  };

  const updateOrganisation = async (
    organisationId: number,
    payload: UpdateOrganisationPayload,
  ) => {
    const url = `/organisations/${organisationId}`;

    try {
      const response = await global.api.patch(url, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      Alert.alert(
        'Settings Updated',
        'Your settings have been successfully updated.',
      );

      return response.data;
    } catch (error) {
      Alert.alert(
        'Settings Update Failed',
        'Try again later or contact support.',
      );
      console.error('Error updating organisation:', error);
      throw error;
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.title}>General Settings</Text>
      </View>
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
          options={settings.languages.map((language: any) => language.name)}
          selectedOption={language}
          onSelect={setLanguage}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Currency</Text>
        <DropdownSelector
          label="Currency"
          options={settings.currencies.map((language: any) => language.name)}
          selectedOption={currency}
          onSelect={setCurrency}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Timezone</Text>
        <DropdownSelector
          label="Timezone"
          options={[
            'GMT-12:00',
            'GMT-11:00',
            'GMT-10:00',
            'GMT-09:00',
            'GMT-08:00',
            'GMT-07:00',
            'GMT-06:00',
            'GMT-05:00',
            'GMT-04:00',
            'GMT-03:00',
            'GMT-02:00',
            'GMT-01:00',
            'GMT+00:00',
            'GMT+01:00',
            'GMT+02:00',
            'GMT+03:00',
            'GMT+04:00',
            'GMT+05:00',
            'GMT+06:00',
            'GMT+07:00',
            'GMT+08:00',
            'GMT+09:00',
            'GMT+10:00',
            'GMT+11:00',
            'GMT+12:00',
            'GMT+13:00',
            'GMT+14:00',
          ]}
          selectedOption={timezone}
          onSelect={setTimezone}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Disallow appointment cancellation</Text>
        <DropdownSelector
          label="Cancellation Policy"
          options={cancellationPolicyOptions.map((option: any) => option.label)}
          selectedOption={cancellationPolicy}
          onSelect={setCancellationPolicy}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Auto delete</Text>
        <DropdownSelector
          label="Auto delete"
          options={autoDeletePeriodOptions.map((option: any) => option.label)}
          selectedOption={autoDelete}
          onSelect={setAutoDelete}
        />
      </View>
      <View style={styles.warningContainer}>
        <Text style={styles.warningText}>
          Please note that when deleting appointments, all related statistics
          data will be also deleted
        </Text>
      </View>
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.updateButtonText}>Update</Text>
      </TouchableOpacity>
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
      backgroundColor: theme.colors.warning100,
      borderRadius: 8,
      marginBottom: 16,
    },
    warningText: {
      color: theme.colors.warning500,
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
