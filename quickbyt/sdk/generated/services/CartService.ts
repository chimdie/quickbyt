/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddToCartDto } from '../models/AddToCartDto';
import type { AddToCartResponse } from '../models/AddToCartResponse';
import type { CartIdIDto } from '../models/CartIdIDto';
import type { GetUserCartDto } from '../models/GetUserCartDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CartService {
  /**
   * @returns GetUserCartDto Success
   * @throws ApiError
   */
  public static getV1Cart(): CancelablePromise<GetUserCartDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v1/cart/',
    });
  }
  /**
   * @param requestBody
   * @returns AddToCartResponse
   * @throws ApiError
   */
  public static postV1Cart(
    requestBody?: AddToCartDto,
  ): CancelablePromise<AddToCartResponse> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/v1/cart/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @param id
   * @param requestBody
   * @returns AddToCartResponse
   * @throws ApiError
   */
  public static deleteV1Cart(
    id: string,
    requestBody?: CartIdIDto,
  ): CancelablePromise<AddToCartResponse> {
    return __request(OpenAPI, {
      method: 'DELETE',
      url: '/v1/cart/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
