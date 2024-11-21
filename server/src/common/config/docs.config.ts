import openapi from '@wesleytodd/openapi';

export const oapi = openapi(
  '/v1/docs/openapi',
  {
    openapi: '3.0.0',
    info: {
      title: 'Quickbyt server',
      description: 'Quickbyt server documentation',
      version: '1.0.0',
    },
    paths: {},
  },
  { htmlui: 'swagger-ui' }
);
