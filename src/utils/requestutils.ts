import { Key } from "../enum/cache.key";
import { IResponse } from "../models/IResponse";
import { toastError, toastSuccess } from "../services/ToastService";

export const baseUrl = 'http://localhost:8085/user';

export const isJsonContentType = (headers: Headers) =>
  ['application/vnd.api+json', 'application/json', 'application/vnd.hal+json', 'application/pdf', 'multipart/form-data']
    .includes(headers.get('content-type')?.trimEnd()!);

export const processResponse = <T>(response: IResponse<T>, meta: any, arg: unknown): IResponse<T> => {
  const { request } = meta;
  if (request.url.includes('logout')) { localStorage.removeItem(Key.LOGGEDIN); }
  if (!request.url.includes('profile')) {
    toastSuccess(response.message);
  }
  console.log({ response });
  return response;
};

export const processError = (error: { status: number; data: IResponse<void> }, meta: unknown, arg: unknown): { status: number; data: IResponse<void> } => {
  if (error.data.code === 401 && error.data.status === 'UNAUTHORIZED' && error.data.message === 'You are not logged in') {
    localStorage.setItem(Key.LOGGEDIN, 'false');
  }
  toastError(error.data.message);
  console.log({ error });
  return error;
};