/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UserDto = {
  username: string;
  role: ('USER' | 'ADMIN');
  isVerified: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  address: {
    street: string;
    city: string;
    state: string;
  };
};

