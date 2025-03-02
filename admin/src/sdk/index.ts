/* eslint-disable @typescript-eslint/no-unused-vars */
import * as API from "./generated";
import { jwtDecode } from "jwt-decode";
import { ApiRequestOptions } from "./generated/core/ApiRequestOptions";
import { StoredKeys } from "@/utils/keys";
// import { AuthRoutes } from "@/types/routes";

API.OpenAPI.BASE = import.meta.env.VITE_BASE_URL;
export const ApiSDK = API;

ApiSDK.OpenAPI.TOKEN = async (_: ApiRequestOptions) => {
  return getTokenFromStore(StoredKeys.token);
};

export function getTokenFromStore(key: string) {
  const rawToken = localStorage.getItem(key) ?? "null";
  const parsedToken = JSON.parse(rawToken) ?? null;

  if (parsedToken === null) {
    return parsedToken;
  }

  const decoded = jwtDecode(rawToken);
  const expireAt = (decoded.exp || 0) * 1000;

  if (expireAt < Date.now()) {
    localStorage.setItem(key, JSON.stringify(null));
    localStorage.setItem(StoredKeys.user, JSON.stringify(null));
    window.location.replace('/(auth)/sign-in');
    return null;
  }

  return parsedToken;
}