/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
  /**
   * @returns any We Live!
   * @throws ApiError
   */
  public static getV1Docs(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v1/docs',
    });
  }
}
