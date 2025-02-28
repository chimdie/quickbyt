import { oapi } from '@/common/config/docs.config';
import { CreateProductDto, ProductDto, ProductIdDto, UpdateProductDto } from '@/dtos/product.dto';
import { dtoToJsonSchema } from '@/common/dto-to-jsonschema';

// get all products
oapi.component('schemas', 'ProductDto', dtoToJsonSchema(ProductDto));
oapi.component('schemas', 'GetAllProductsDto', {
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
            $ref: '#/components/schemas/ProductDto',
          },
        },
      },
    },
  ],
});
export const getProductsDocs = oapi.path({
  tags: ['Product'],
  responses: {
    200: {
      description: 'Success',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/GetAllProductsDto',
          },
        },
      },
    },
  },
});

// create a product
oapi.component('schemas', 'CreateProductDto', dtoToJsonSchema(CreateProductDto));
oapi.component('schemas', 'NewProductDto', {
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
          $ref: '#/components/schemas/ProductDto',
        },
      },
    },
  ],
});
export const productDocs = oapi.path({
  tags: ['Product'],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/CreateProductDto',
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
            $ref: '#/components/schemas/NewProductDto',
          },
        },
      },
    },
  },
});

// get a product by id
oapi.component('schemas', 'ProductIdDto', dtoToJsonSchema(ProductIdDto));
oapi.component('schemas', 'GetProductByIdDto', {
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
          $ref: '#/components/schemas/ProductDto',
        },
      },
    },
  ],
});
export const getProductByIdDoc = oapi.path({
  tags: ['Product'],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/ProductIdDto',
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
            $ref: '#/components/schemas/ProductDto',
          },
        },
      },
    },
  },
});

// get user by Id
oapi.component('schemas', 'UpdateProductDto', dtoToJsonSchema(UpdateProductDto));
oapi.component('schemas', 'UpdateProductResponse', {
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
          $ref: '#/components/schemas/ProductDto',
        },
      },
    },
  ],
});
export const updateProductDoc = oapi.path({
  tags: ['Product'],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/UpdateProductDto',
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
            $ref: '#/components/schemas/UpdateProductResponse',
          },
        },
      },
    },
  },
});
