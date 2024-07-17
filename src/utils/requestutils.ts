import { IResponse } from "../models/Response";

export const baseUrl = "http:/localhost:8085/user";

export const processResponse = <T>(
  response: IResponse<T>,
  meta: any,
  arg: unknown
): IResponse<T> => {
  const { request } = meta;

  if (request.url.includes("logout")) {
    localStorage.removeItem("key");
  }
  if (request.url.includes("profile")) {
    // TODO show toast notification
  }
  console.log({ response });
  return response;
};

export const processError = (
  error: { status: number; data: IResponse<void> },
  meta: unknown,
  arg: unknown
): { status: number; data: IResponse<void> } => {
  if (
    error.data.code === 401 &&
    error.data.status === "UNAUTHORIZED" &&
    error.data.message === "You are not logged in"
  ) {
    localStorage.setItem("", "");
  }
  // TODO show toast notification
  console.log({ error });
  return error;
};
