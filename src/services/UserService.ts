import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IResponse } from "../models/Response";
import {
  baseUrl,
  isJsonContentType,
  processError,
  processResponse,
} from "../utils/requestutils";

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: "include",
    isJsonContentType,
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    fetchUser: builder.query<IResponse<User>, void>({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
      keepUnusedDataFor: 120,
      transformResponse: processResponse<User>,
      transformErrorResponse: processError,
      providesTags: (result, error) => ["User"],
    }),
  }),
});
