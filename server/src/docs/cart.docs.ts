import { oapi } from '@/common/config/docs.config';
import { AddToCartDto, CartIdIDto, CartDto } from '@/dtos/cart.dto';
import { dtoToJsonSchema } from '@/common/dto-to-jsonschema';

// get all cart
oapi.component('schemas', 'CartDto', dtoToJsonSchema(CartDto));
oapi.component('schemas', 'GetUserCartDto', {
  allOf: [
    {
      $ref: '#/components/schemas/BaseResponse',
    },
    {
      type: 'object',
      additionalProperties: false,
      required: ['payload'],
      properties: {
        payload: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/CartDto',
          },
        },
      },
    },
  ],
});
export const getCartsDocs = oapi.path({
  tags: ['Cart'],
  responses: {
    200: {
      description: 'Success',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/GetUserCartDto',
          },
        },
      },
    },
  },
});

// add item to cart
oapi.component('schemas', 'AddToCartDto', dtoToJsonSchema(AddToCartDto));
oapi.component('schemas', 'AddToCartResponse', {
  allOf: [
    {
      $ref: '#/components/schemas/BaseResponse',
    },
    {
      type: 'object',
      additionalProperties: false,
      required: ['payload'],
      properties: {
        payload: {
          $ref: '#/components/schemas/CartDto',
        },
      },
    },
  ],
});
export const addToCartDocs = oapi.path({
  tags: ['Cart'],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/AddToCartDto',
        },
      },
    },
  },
  responses: {
    200: {
      description: '',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/AddToCartResponse',
          },
        },
      },
    },
  },
});

// remove item from cart
oapi.component('schemas', 'CartIdIDto', dtoToJsonSchema(CartIdIDto));
oapi.component('schemas', 'AddToCartResponse', {
  allOf: [
    {
      $ref: '#/components/schemas/BaseResponse',
    },
    {
      type: 'object',
      additionalProperties: false,
      required: ['payload'],
      properties: {
        payload: {
          $ref: '#/components/schemas/CartDto',
        },
      },
    },
  ],
});
export const removeItemFromCartDocs = oapi.path({
  tags: ['Cart'],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/CartIdIDto',
        },
      },
    },
  },
  responses: {
    200: {
      description: '',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/AddToCartResponse',
          },
        },
      },
    },
  },
});
