/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponse } from './BaseResponse';
import type { UserDto } from './UserDto';
export type SignupResponse = (BaseResponse & {
  payload: {
    token: string;
    user: UserDto;
  };
});

