import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IResponse } from "../models/IResponse";
import {
  baseUrl,
  isJsonContentType,
  processError,
  processResponse,
} from "../utils/requestutils";
import { QrCodeRequest, User } from "../models/IUser";
import { EmailAddress, IRegisterRequest, IUserRequest, UpdateNewPassword } from "../models/ICredentials";
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
      invalidatesTags: (result, error) => (error ? [] : ["User"])
    }),
    registerUser: builder.mutation<IResponse<void>, IRegisterRequest>({
      query: (registerRequest) => ({
        url: "/register",
        method: Http.POST,
        body: registerRequest,
      }),
      transformResponse: processResponse<void>,
      transformErrorResponse: processError,
      invalidatesTags: (result, error) => (error ? [] : ["User"])
    }),
    verifyAccount: builder.mutation<IResponse<void>, string>({
      query: (token) => ({
        // needs to be token in order to work if it is specified as key it will break
        url: `/verify/account?token=${token}`,
        method: Http.GET
      }),
      transformResponse: processResponse<void>,
      transformErrorResponse: processError
    }),
    verifyPassword: builder.mutation<IResponse<User>, string>({
      query: (token) => ({
        // needs to be token in order to work if it is specified as key it will break
        url: `/verify/password?token=${token}`,
        method: Http.GET
      }),
      transformResponse: processResponse<User>,
      transformErrorResponse: processError,
      invalidatesTags: (result, error) => (error ? [] : ["User"])
    }),
    verifyQrCode: builder.mutation<IResponse<User>, QrCodeRequest>({
      query: (qrCodeRequest) => ({
        url: "/verify/qrcode",
        method: Http.POST,
        body: qrCodeRequest,
      }),
      transformResponse: processResponse<User>,
      transformErrorResponse: processError,
      invalidatesTags: (result, error) => (error ? [] : ["User"])
    }),
    resetPassword: builder.mutation<IResponse<void>, EmailAddress>({
      query: (email) => ({
        url: "/reset-password",
        method: Http.POST,
        body: email,
      }),
      transformResponse: processResponse<void>,
      transformErrorResponse: processError,
      invalidatesTags: (result, error) => (error ? [] : ["User"])
    }),
    doResetPassword: builder.mutation<IResponse<void>, UpdateNewPassword>({
      query: (passwordrequest) => ({
        // needs to be token in order to work if it is specified as key it will break
        url: `/reset-password/reset`,
        method: Http.POST,
        body: passwordrequest
      }),
      transformResponse: processResponse<void>,
      transformErrorResponse: processError,
      invalidatesTags: (result, error) => (error ? [] : ["User"])
    }),
    updatePhoto: builder.mutation<IResponse<string>, FormData>({
      query: (form) => ({
        url: `/photo`,
        method: Http.PATCH,
        body: form
      }),
      transformResponse: processResponse<string>,
      transformErrorResponse: processError,
      invalidatesTags: (result, error) => (error ? [] : ["User"])
    }),
    updateUser: builder.mutation<IResponse<User>, IUserRequest>({
      query: (user) => ({
        url: `/update`,
        method: Http.PATCH,
        body: user
      }),
      transformResponse: processResponse<User>,
      transformErrorResponse: processError,
      invalidatesTags: (result, error) => (error ? [] : ["User"])
    }),
    updatePassword: builder.mutation<IResponse<void>, UpdatePassword>({
      query: (request) => ({
        url: `/update-password`,
        method: Http.PATCH,
        body: request
      }),
      transformResponse: processResponse<void>,
      transformErrorResponse: processError,
      invalidatesTags: (result, error) => (error ? [] : ["User"])
    })
  }),
});
