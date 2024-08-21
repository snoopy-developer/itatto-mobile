import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Dimensions, View, useColorScheme } from 'react-native';

import Colors from '@/constants/Colors';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { getApiKey, handleUserProfileFetch } from '@/modules/userActions';
import { fetchServices } from '@/redux/reducers/services';
import { fetchSettings } from '@/redux/reducers/settings';

const RootPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();
  const colorScheme = useColorScheme();

  useEffect(() => {
    getApiKey().then((apiKey: string | null) => {
      if (apiKey) {
        global.apiKey = apiKey;
        // verify login credentials by getting the user
        handleUserProfileFetch(dispatch, router);
        dispatch(fetchServices());
        dispatch(fetchSettings());
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
