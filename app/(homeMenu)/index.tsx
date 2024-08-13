import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function TabOneScreen() {
  const { userProfile } = useSelector((state: RootState) => state.user);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Wellcome Back {userProfile?.data?.full_name}
      </Text>
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
