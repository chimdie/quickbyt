import { FromSchema } from 'json-schema-to-ts';
import { OpenAPIV3 } from 'openapi-types';
import { typeAssert } from '@/common/asserts';
import { Equals } from '@/types/utils';
import { oapi } from '@/common/config/docs.config';
import { Signup_dto, Login_dto } from '@/dtos/auth.dto';

oapi.component('schemas', 'BaseResponse', {
  type: 'object',
  additionalProperties: false,
  required: ['isError', 'context', 'message'],
  properties: {
    isError: { type: 'boolean', example: false },
    context: { type: 'string', example: 'ok' },
    message: { type: 'string', example: '' },
  },
});

export const SignupDocSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['username', 'role', 'password', 'confirmPassword'] as const,
  properties: {
    username: { type: 'string' },
    role: { type: 'string', enum: ['USER', 'ADMIN'] as const },
    password: { type: 'string' },
    confirmPassword: { type: 'string' },
  },
} satisfies OpenAPIV3.SchemaObject;
oapi.component('schemas', 'Signup_dto', SignupDocSchema);
typeAssert<Equals<FromSchema<typeof SignupDocSchema>, Signup_dto>>();

oapi.component('schemas', 'SignupResponse', {
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
          type: 'object',
          additionalProperties: false,
          required: ['token', 'resource'],
          properties: {
            token: {
              type: 'string',
              format: 'jwt',
              pattern: '^[\\w-]+\\.[\\w-]+\\.[\\w-]+$',
              example:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2YwNDExNjYyMDYyNGI5Y2JkYTlmMiIsImlhdCI6MTczMjE4MzA1NywiZXhwIjoxNzM2NTAzMDU3fQ.tcoCg6FydyCxiABj5-i_0BZ2jFBy3LZthkV1dRAuqA0',
            },
            resource: {
              type: 'object',
              additionalProperties: false,
              required: ['username', 'role', 'isVerified', 'address', '_id', 'createdAt', 'updatedAt', '__v'],
              properties: {
                username: { type: 'string', example: 'Wazza' },
                role: { type: 'string', enum: ['USER', 'ADMIN'], example: 'ADMIN' },
                isVerified: { type: 'boolean', example: false },
                address: {
                  type: 'object',
                  additionalProperties: false,
                  properties: {
                    street: { type: 'string' },
                    city: { type: 'string' },
                    state: { type: 'string' },
                  },
                },
                _id: { type: 'string', example: '673f04116620624b9cbda9f2' },
                createdAt: {
                  type: 'string',
                  format: 'date-time',
                  example: '2024-11-21T09:57:37.557Z',
                },
                updatedAt: {
                  type: 'string',
                  format: 'date-time',
                  example: '2024-11-21T09:57:37.557Z',
                },
                __v: { type: 'integer', example: 0 },
              },
            },
          },
        },
      },
    },
  ],
});

/**
 * @description signup route documentation
 */
export const signup_doc = oapi.path({
  tags: ['Authentication'],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/Signup_dto',
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Account created successfully',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/SignupResponse',
          },
        },
      },
    },
  },
});

export const LoginDocSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['username', 'password'] as const,
  properties: {
    username: { type: 'string' },
    password: { type: 'string' },
  },
} satisfies OpenAPIV3.SchemaObject;
oapi.component('schemas', 'Login_dto', LoginDocSchema);
typeAssert<Equals<FromSchema<typeof LoginDocSchema>, Login_dto>>();

oapi.component('schemas', 'LoginResponse', {
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
          type: 'object',
          additionalProperties: false,
          required: ['token', 'user'],
          properties: {
            token: {
              type: 'string',
              format: 'jwt',
              pattern: '^[\\w-]+\\.[\\w-]+\\.[\\w-]+$',
              example:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2YwNDExNjYyMDYyNGI5Y2JkYTlmMiIsInVzZXJuYW1lIjoiV2F6emEiLCJpYXQiOjE3MzIxOTkzOTAsImV4cCI6MTczNjUxOTM5MH0.Qk_AWAeKZGRYEEHAfgqkcD17x0jPBLB7ZMW9GMi-Xtc',
            },
            user: {
              type: 'object',
              additionalProperties: false,
              required: ['_id', 'username', 'role', 'isVerified', 'address', 'createdAt', 'updatedAt', '__v'],
              properties: {
                _id: { type: 'string', example: '673f04116620624b9cbda9f2' },
                username: { type: 'string', example: 'Wazza' },
                role: { type: 'string', enum: ['USER', 'ADMIN'], example: 'ADMIN' },
                isVerified: { type: 'boolean', example: false },
                address: {
                  type: 'object',
                  additionalProperties: false,
                  properties: {
                    street: { type: 'string' },
                    city: { type: 'string' },
                    state: { type: 'string' },
                  },
                },
                createdAt: {
                  type: 'string',
                  format: 'date-time',
                  example: '2024-11-21T09:57:37.557Z',
                },
                updatedAt: {
                  type: 'string',
                  format: 'date-time',
                  example: '2024-11-21T09:57:37.557Z',
                },
                __v: { type: 'integer', example: 0 },
              },
            },
          },
        },
      },
    },
  ],
});

/**
 * @description login route documentation
 */
export const login_doc = oapi.path({
  tags: ['Authentication'],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/Login_dto',
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Account created successfully',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/LoginResponse',
          },
        },
      },
    },
  },
});
