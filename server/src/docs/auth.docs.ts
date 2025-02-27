import { oapi } from '@/common/config/docs.config';
import { SignupDto, LoginDto } from '@/dtos/auth.dto';
import { dtoToJsonSchema } from '@/common/dto-to-jsonschema';

oapi.component('schemas', 'BaseResponse', {
  type: 'object',
  additionalProperties: false,
  required: ['isError', 'context', 'message'],
  properties: {
    isError: { type: 'boolean', example: false },
    context: { type: 'string', example: 'ok' },
    message: { type: 'string', example: 'Success' },
  },
});

oapi.component('schemas', 'Signup_dto', dtoToJsonSchema(SignupDto));
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
          required: ['token', 'user'],
          properties: {
            token: {
              type: 'string',
              format: 'jwt',
              pattern: '^[\\w-]+\\.[\\w-]+\\.[\\w-]+$',
              example:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2YwNDExNjYyMDYyNGI5Y2JkYTlmMiIsImlhdCI6MTczMjE4MzA1NywiZXhwIjoxNzM2NTAzMDU3fQ.tcoCg6FydyCxiABj5-i_0BZ2jFBy3LZthkV1dRAuqA0',
            },
            user: {
              $ref: '#/components/schemas/UserDto',
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

oapi.component('schemas', 'Login_dto', dtoToJsonSchema(LoginDto));
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
              $ref: '#/components/schemas/UserDto',
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
