import * as SecureStore from 'expo-secure-store';
import { useDispatch } from 'react-redux';
import { store } from '@/redux/store';

const secureStoreApiKey = async (apiKey: any) => {
  return await SecureStore.setItemAsync('apiKey', apiKey);
};

export const getApiKey = async () => {
  return await SecureStore.getItemAsync('apiKey');
};

export function handleUserLoginResponse(response: {
  data: { accessToken: any };
}) {
  if (response.data.accessToken) {
    let token = response.data.accessToken;
    delete response.data.accessToken;
    global.apiKey = token;
    secureStoreApiKey(token);
  }
}

export async function logoutUser() {
  global.apiKey = null;
  SecureStore.deleteItemAsync('apiKey').then(() => {
    store.dispatch({
      type: 'userProfile/success',
      payload: null,
    });
  });
}
