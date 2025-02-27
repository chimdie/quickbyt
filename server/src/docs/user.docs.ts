import { oapi } from '@/common/config/docs.config';
import { UserIdDto, UserDto, UsernameDto } from '@/dtos/user.dto';
import { dtoToJsonSchema } from '@/common/dto-to-jsonschema';

// get all users
oapi.component('schemas', 'UserDto', dtoToJsonSchema(UserDto));
oapi.component('schemas', 'GetAllUsersDto', {
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
            $ref: '#/components/schemas/UserDto',
          },
        },
      },
    },
  ],
});
export const getUsersDocs = oapi.path({
  tags: ['User'],
  responses: {
    200: {
      description: 'Success',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/GetAllUsersDto',
          },
        },
      },
    },
  },
});

// get user profile
oapi.component('schemas', 'UserProfile', {
  allOf: [
    {
      $ref: '#/components/schemas/BaseResponse',
    },
    {
      type: 'object',
      additionalProperties: false,
      required: ['payload'],
      properties: {
        message: { type: 'string', example: 'Success' },
        payload: {
          $ref: '#/components/schemas/UserDto',
        },
      },
    },
  ],
});
export const getUserProfileDoc = oapi.path({
  tags: ['User'],
  security: [{ BearerAuth: [] }],
  responses: {
    200: {
      description: 'Success',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/UserProfile',
          },
        },
      },
    },
  },
});

// get user by Id
oapi.component('schemas', 'UserIdDto', dtoToJsonSchema(UserIdDto));
oapi.component('schemas', 'GetUserByIdResponse', {
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
          $ref: '#/components/schemas/UserDto',
        },
      },
    },
  ],
});
export const getUserByIdDoc = oapi.path({
  tags: ['User'],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/UserIdDto',
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
            $ref: '#/components/schemas/GetUserByIdResponse',
          },
        },
      },
    },
  },
});

// get user by username
oapi.component('schemas', 'Username_dto', dtoToJsonSchema(UsernameDto));
oapi.component('schemas', 'GetUserByUsername', {
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
          $ref: '#/components/schemas/UserDto',
        },
      },
    },
  ],
});
export const getUsernameDocs = oapi.path({
  tags: ['User'],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/Username_dto',
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
            $ref: '#/components/schemas/GetUserByUsername',
          },
        },
      },
    },
  },
});
