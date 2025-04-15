/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginDto } from '../models/LoginDto';
import type { LoginResponse } from '../models/LoginResponse';
import type { SignupDto } from '../models/SignupDto';
import type { SignupResponse } from '../models/SignupResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthenticationService {
  /**
   * @param requestBody
   * @returns LoginResponse Account created successfully
   * @throws ApiError
   */
  public static postV1AuthLogin(
    requestBody?: LoginDto,
  ): CancelablePromise<LoginResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/v1/auth/login',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @param requestBody
   * @returns SignupResponse Account created successfully
   * @throws ApiError
   */
  public static postV1AuthSignup(
    requestBody?: SignupDto,
  ): CancelablePromise<SignupResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/v1/auth/signup',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
