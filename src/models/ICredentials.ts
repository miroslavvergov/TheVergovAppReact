import { IUser } from "./IUser";

export interface IUserRequest {
  email: string;
  password?: string;
}

export interface IRegisterRequest extends IUserRequest {
  firstName: string;
  lastName: string;
  // TODO if i have time left - phone?:
  bio?: string;
};

export type EmailAddress = Pick<IUserRequest, "email">;

export type UpdatePassword = Pick<IUserRequest, "password"> & { newPassword: string, confirmNewPassword: string };

export type UpdateNewPassword = Pick<IUser, "userId"> & UpdatePassword;
