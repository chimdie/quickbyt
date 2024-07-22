import { ZodIssue } from 'zod';

export type Errors = {
  name: ErrorName;
  message: string;
  cause: string;
  code: number;
  stack?: string;
};

export type ErrorName =
  | 'SERVER_ERROR'
  | 'USER_ERROR'
  | 'VALIDATION_ERROR'
  | 'AUTHENTICATION_ERROR'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'DATABASE_ERROR'
  | 'NOT_IMPLEMENTED'
  | 'PERMISSION_ERROR'
  | 'RATE_LIMIT_EXCEEDED';

export const criticalErrors: ErrorName[] = ['SERVER_ERROR', 'DATABASE_ERROR', 'NOT_IMPLEMENTED'];

const errorMessages: { [key in ErrorName]: string } = {
  USER_ERROR: 'Bad request. Check that you are sending the right data.',
  VALIDATION_ERROR: 'Bad request. Check that you are sending the right data.',
  AUTHENTICATION_ERROR: 'Invalid authentication credentials',
  NOT_FOUND: 'The resources you request for was not found.',
  CONFLICT: 'We messed up on our end. We are working to fix this.',
  DATABASE_ERROR: 'We messed up on our end. We are working to fix this.',
  SERVER_ERROR: 'We messed up on our end. We are working to fix this.',
  NOT_IMPLEMENTED: 'We messed up on our end. We are working to fix this.',
  PERMISSION_ERROR: "You don't have the necessary permission to perform this action.",
  RATE_LIMIT_EXCEEDED: 'You have exceeded the maximum number of requests. Please wait before trying again.',
};

const errorCodes: { [key in ErrorName]: number } = {
  USER_ERROR: 400,
  VALIDATION_ERROR: 400,
  AUTHENTICATION_ERROR: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  DATABASE_ERROR: 500,
  SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  PERMISSION_ERROR: 403,
  RATE_LIMIT_EXCEEDED: 429,
};

export class ErrorBase extends Error {
  name: ErrorName;
  message: string;
  cause: any;
  code: number;

  constructor(error: Errors) {
    super(error.message);
    this.name = error.name;
    this.message = error.message;
    this.cause = error.cause;
    this.code = error.code;
    this.stack = error.stack ?? new Error().stack;
  }
}

export class Exception extends ErrorBase {
  constructor(name: ErrorName, message?: string, cause?: any) {
    super({
      name,
      message: message ?? errorMessages[name],
      cause: cause ?? message ?? errorMessages[name],
      code: errorCodes[name],
    });
  }
}

export function parseZodError(issues: ZodIssue[]) {
  const numberOfIssues = issues.length;
  let str = '';
  for (let i = 0; i < numberOfIssues; i++) {
    str = `${str} ${issues[i]['message']} at "${issues[i]['path'][0]}";`;
  }

  return str;
}
