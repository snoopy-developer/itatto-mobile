import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Dimensions, View, useColorScheme } from 'react-native';

import Colors from '@/constants/Colors';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import {
  getApiKey,
  handleUserProfileFetch,
  logoutUser,
} from '@/modules/userActions';
import { fetchServices } from '@/redux/reducers/services';
import { fetchSettings } from '@/redux/reducers/settings';
import { fetchLocations } from '@/redux/reducers/locations';

const RootPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();
  const colorScheme = useColorScheme();

  useEffect(() => {
    getApiKey().then((apiKey: string | null) => {
      console.log('apiKey:', apiKey);
      if (apiKey) {
        global.apiKey = apiKey;
        // verify login credentials by getting the user
        dispatch(fetchServices());
        dispatch(fetchSettings());
        dispatch(fetchLocations());
        handleUserProfileFetch(dispatch, router);
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
