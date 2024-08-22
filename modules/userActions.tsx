import * as SecureStore from 'expo-secure-store';
import { useDispatch } from 'react-redux';
import { AppDispatch, store } from '@/redux/store';
import { useRouter } from 'expo-router';
import { fetchUserProfile } from '@/redux/reducers/userProfile';

const secureStoreApiKey = async (apiKey: any) => {
  return await SecureStore.setItemAsync('apiKey', apiKey);
};

export const getApiKey = async () => {
  return await SecureStore.getItemAsync('apiKey');
};

export const handleUserLoginResponse = async (response: {
  data: { accessToken: any };
}) => {
  if (response.data.accessToken) {
    let token = response.data.accessToken;
    delete response.data.accessToken;
    global.apiKey = token;
    await secureStoreApiKey(token);
  }
};

export const handleUserProfileFetch = async (
  dispatch: AppDispatch,
  router: ReturnType<typeof useRouter>,
) => {
  try {
    const response = await dispatch(fetchUserProfile()).unwrap();
    router.replace('/(homeMenu)/homeTab');
  } catch (error: any) {
    logoutUser();
    router.replace('/(authMenu)');
  }
};

export async function logoutUser() {
  global.apiKey = null;
  SecureStore.deleteItemAsync('apiKey').then(() => {
    store.dispatch({
      type: 'userProfile/success',
      payload: null,
    });
  });
}
