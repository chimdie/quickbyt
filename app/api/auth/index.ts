import Axios from '@/config/axios.config';
import {VersionKey} from '@/constants/apiVersion';
import {LoginUser, UserI} from './types';

export const login = async (
  payload: LoginUser.Payload,
): Promise<LoginUser.Response> => {
  const {data} = await Axios.post(`/${VersionKey.v1}/auth/login`, payload);
  return data;
};

export const verifyUsername = async (username: string): Promise<UserI> => {
  const {data} = await Axios.get(`/${VersionKey.v1}/username/${username}`);
  return data;
};
