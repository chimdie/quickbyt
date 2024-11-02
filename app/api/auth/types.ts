export type UserI = {
  _id: string;
  username: string;
  role: string;
  isVerified: boolean;
  address: {
    street: string;
    city: string;
    state: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export namespace LoginUser {
  export type Payload = {
    username: string;
    password: string;
  };

  export type Response = {
    isError: boolean;
    context: string;
    message: string;
    payload: {
      token: string;
      user: UserI;
    };
  };
}
