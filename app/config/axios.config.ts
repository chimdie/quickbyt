import axios from 'axios';
import {secureStore} from '@/config/secureStore';
import {StoredKeys} from '@/constants/storedKeys';
import {serializeString} from '@/utils/globalFns';

export const getStoredAuthToken = () => {
  return secureStore.getItem(StoredKeys.token);
};

// export const getStoredUserId = async () => {
//   return await secureStore.getItem(StoredKeys.userId);
// };

const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

const Axios = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

Axios.interceptors.request.use(
  async config => {
    const token = await getStoredAuthToken();
    // const userId = await getStoredUserId();

    const serializedToken = serializeString(token as string);
    // const serializedUserId = serializeString(userId as string);

    if (serializedToken) {
      config.headers['Authorization'] = `Bearer ${serializedToken}`;
    }
    // if (serializedUserId) {
    //   config.headers['x-uid'] = serializedUserId;
    // }
    return config;
  },
  error => Promise.reject(error),
);

Axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized error, handle token refresh');
    } else {
      console.error('Request error:', error);
    }
    return Promise.reject(error);
  },
);

export default Axios;
