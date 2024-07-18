export interface IUserRequest {
  email: string;
  password?: string;
}

export interface IRegisterRequest extends IUserRequest {
  firstName: string;
  lastName: string;
  // TODO if i have time left - phone?:
  bio?: string;
}
