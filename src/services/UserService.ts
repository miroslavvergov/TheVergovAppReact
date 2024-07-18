import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IResponse } from "../models/IResponse";
import {
  baseUrl,
  isJsonContentType,
  processError,
  processResponse,
} from "../utils/requestutils";
import { QrCodeRequest, User } from "../models/IUser";
import { IRegisterRequest, IUserRequest } from "../models/ICredentials";
import { Http } from "../enum/http.method";

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: "include",
    isJsonContentType,
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    fetchUser: builder.query<IResponse<User>, IUserRequest>({
      query: () => ({
        url: "/profile",
        method: Http.GET,
      }),
      keepUnusedDataFor: 120,
      transformResponse: processResponse<User>,
      transformErrorResponse: processError,
      providesTags: (result, error) => ["User"],
    }),
    loginUser: builder.mutation<IResponse<User>, void>({
      query: (credentials) => ({
        url: "/login",
        method: Http.POST,
        body: credentials,
      }),
      transformResponse: processResponse<User>,
      transformErrorResponse: processError,
    }),
    registerUser: builder.mutation<IResponse<void>, IRegisterRequest>({
      query: (registerRequest) => ({
        url: "/register",
        method: Http.POST,
        body: registerRequest,
      }),
      transformErrorResponse: processError,
    }),
    verifyAccount: builder.mutation<IResponse<void>, string>({
      query: (token) => ({
        // needs to be token in order to work if it is specified as key it will break
        url: `/verify/account?token=${token}`,
        method: Http.GET
      }),
      transformErrorResponse: processError,
    }),
    verifyQrCode: builder.mutation<IResponse<User>, QrCodeRequest>({
      query: (qrCodeRequest) => ({
        url: "/verify/qrcode",
        method: Http.POST,
        body: qrCodeRequest,
      }),
      transformResponse: processResponse<User>,
      transformErrorResponse: processError,
      invalidatesTags: (result, error) => (error ? [] : ["User"]),
    }),
  }),
});
