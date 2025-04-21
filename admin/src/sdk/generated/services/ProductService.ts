/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateProductDto } from '../models/CreateProductDto';
import type { GetAllProductsDto } from '../models/GetAllProductsDto';
import type { NewProductDto } from '../models/NewProductDto';
import type { ProductDto } from '../models/ProductDto';
import type { ProductIdDto } from '../models/ProductIdDto';
import type { UpdateProductDto } from '../models/UpdateProductDto';
import type { UpdateProductResponse } from '../models/UpdateProductResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProductService {
  /**
   * @returns GetAllProductsDto Success
   * @throws ApiError
   */
  public static getV1Products(): CancelablePromise<GetAllProductsDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v1/products/',
    });
  }
  /**
   * @param requestBody
   * @returns NewProductDto
   * @throws ApiError
   */
  public static postV1Products(
    requestBody?: CreateProductDto,
  ): CancelablePromise<NewProductDto> {
    return __request(OpenAPI, {
      method: 'POST',
      url: '/v1/products/',
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @param id
   * @param requestBody
   * @returns ProductDto
   * @throws ApiError
   */
  public static getV1Products1(
    id: string,
    requestBody?: ProductIdDto,
  ): CancelablePromise<ProductDto> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/v1/products/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
  /**
   * @param id
   * @param requestBody
   * @returns UpdateProductResponse
   * @throws ApiError
   */
  public static putV1Products(
    id: string,
    requestBody?: UpdateProductDto,
  ): CancelablePromise<UpdateProductResponse> {
    return __request(OpenAPI, {
      method: 'PUT',
      url: '/v1/products/{id}',
      path: {
        'id': id,
      },
      body: requestBody,
      mediaType: 'application/json',
    });
  }
}
