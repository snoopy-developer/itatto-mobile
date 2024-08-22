import React from 'react';

import { useLocalSearchParams } from 'expo-router';

import GeneralSettings from '@/components/dashboard/userSettings/GeneralSettings';

const UserSettingsModal: React.FC = () => {
  return <GeneralSettings />;
};

export default UserSettingsModal;
