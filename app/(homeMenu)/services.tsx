import { StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { logoutUser } from '@/modules/userActions';
import { useRouter } from 'expo-router';
import { useTheme } from 'styled-components';
import FadeInView from '@/components/FadeInView';

export default function TabOneScreen() {
  const { userProfile } = useSelector((state: RootState) => state.user);

  const theme = useTheme();
  const router = useRouter();
  const styles = createStylesheet(theme);
  return (
    <FadeInView>
      <View style={[styles.container, { backgroundColor: 'transparent' }]}>
        <Text style={styles.title}>Wellcome to Services Screen</Text>
      </View>
    </FadeInView>
  );
}

const createStylesheet = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      color: theme.colors.textPrimary,
      fontSize: 20,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
  });
