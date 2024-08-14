import { StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { logoutUser } from '@/modules/userActions';
import { useRouter } from 'expo-router';
import { useTheme } from 'styled-components';

export default function TabOneScreen() {
  const { userProfile } = useSelector((state: RootState) => state.user);

  const theme = useTheme();
  const router = useRouter();
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.bodyBg }]}>
      <Text style={styles.title}>Wellcome to Messages Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
