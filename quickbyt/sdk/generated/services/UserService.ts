/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetAllUsersDto } from '../models/GetAllUsersDto';
import type { GetUserByIdResponse } from '../models/GetUserByIdResponse';
import type { GetUserByUsername } from '../models/GetUserByUsername';
import type { UserIdDto } from '../models/UserIdDto';
import type { Username_dto } from '../models/Username_dto';
import type { UserProfile } from '../models/UserProfile';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserService {
  /**
   * @returns GetAllUsersDto Success
   * @throws ApiError
   */
  public static getV1Users(): CancelablePromise<GetAllUsersDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v1/users/',
    });
  }
  /**
   * @param username
   * @param requestBody
   * @returns GetUserByUsername
   * @throws ApiError
   */
  public static getV1UsersUsername(
    username: string,
    requestBody?: Username_dto,
  ): CancelablePromise<GetUserByUsername> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v1/users/username/{username}',
      path: {
        'username': username,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @param username
   * @param requestBody
   * @returns GetUserByUsername
   * @throws ApiError
   */
  public static getV1UsersUsernameCheck(
    username: string,
    requestBody?: Username_dto,
  ): CancelablePromise<GetUserByUsername> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v1/users/username/check/{username}',
      path: {
        'username': username,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @returns UserProfile Success
   * @throws ApiError
   */
  public static getV1UsersMe(): CancelablePromise<UserProfile> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v1/users/me',
    });
  }
  /**
   * @param id
   * @param requestBody
   * @returns GetUserByIdResponse
   * @throws ApiError
   */
  public static getV1Users1(
    id: string,
    requestBody?: UserIdDto,
  ): CancelablePromise<GetUserByIdResponse> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v1/users/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
