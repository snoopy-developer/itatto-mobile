import axios, { Method, AxiosRequestConfig } from 'axios';
import { router } from 'expo-router';
import { logoutUser } from '@/modules/userActions';

declare global {
  var apiUrl: string;
  var apiKey: string | null;
  var api: any;
}
interface ApiRequestConfig {
  method: Method;
  endpoint: string;
  data?: any;
  noAuthentication?: boolean;
  extraHeaders?: Record<string, string>;
  loginOnUnauthenticated?: boolean;
}

global.apiUrl = 'https://api.itattoo.com/api/v1';
global.apiKey = null;

const apiRequest = async ({
  method,
  endpoint,
  data = null,
  noAuthentication = false,
  extraHeaders = {},
}: ApiRequestConfig): Promise<any> => {
  let axiosConfig: AxiosRequestConfig = {
    method,
    url: global.apiUrl + endpoint,
    headers: {
      ...extraHeaders,
    },
  };

  if (data) {
    axiosConfig.data = data;
  }

  if (!noAuthentication && global.apiKey) {
    axiosConfig.headers = {
      ...axiosConfig.headers,
      Authorization: `Bearer ${global.apiKey}`,
    };
  }
  try {
    const response = await axios(axiosConfig);
    return response;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      console.log(error.response?.status);

      if (error.response?.status === 401) {
        // await logoutUser();
        router.replace('/');
      } else {
        console.log(error.response?.data);
      }
    } else {
      console.error('An unexpected error occurred:', error);
    }

    throw error;
  }
};

global.api = {
  get: (endpoint: string) => {
    return apiRequest({ method: 'GET', endpoint });
  },
  post: (
    endpoint: string,
    payload: any,
    extraHeaders: Record<string, string> = {},
  ) => {
    return apiRequest({
      method: 'POST',
      endpoint,
      data: payload,
      extraHeaders,
    });
  },
  put: (
    endpoint: string,
    payload: any,
    extraHeaders: Record<string, string> = {},
  ) => {
    return apiRequest({ method: 'PUT', endpoint, data: payload, extraHeaders });
  },
  patch: (
    endpoint: string,
    payload: any,
    extraHeaders: Record<string, string> = {},
  ) => {
    return apiRequest({
      method: 'PATCH',
      endpoint,
      data: payload,
      extraHeaders,
    });
  },
  delete: (endpoint: string, payload: any) => {
    return apiRequest({ method: 'DELETE', endpoint, data: payload });
  },
  raw: (
    method: Method,
    endpoint: string,
    data: any = {},
    noAuthentication: boolean = false,
    extraHeaders: Record<string, string> = {},
  ) => {
    return apiRequest({
      method,
      endpoint,
      data,
      noAuthentication,
      extraHeaders,
    });
  },
};
