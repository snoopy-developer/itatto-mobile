import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Dimensions, View, useColorScheme } from 'react-native';

import Colors from '@/constants/Colors';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { getApiKey, logoutUser } from '@/modules/userActions';
import { fetchUserProfile } from '@/redux/reducers/userProfile';
const RootPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();
  const colorScheme = useColorScheme();

  useEffect(() => {
    getApiKey().then((apiKey: string | null) => {
      console.log('key', apiKey);
      if (apiKey) {
        global.apiKey = apiKey;

        // verify login credentials by getting the user
        dispatch(fetchUserProfile())
          .unwrap()
          .then((response: any) => {
            // router.replace('/app/(drawer)/main/home/memories');
          })
          .catch((error: string) => {
            logoutUser();
            // router.replace('/app/(drawer)/main/home/memories');
          });
      } else {
        router.replace('/(authMenu)');
      }
    });
  }, [dispatch, router]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: Colors[colorScheme ?? 'dark'].bodyBg,
      }}
    ></View>
  );
};

export default RootPage;
